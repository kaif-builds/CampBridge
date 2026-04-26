export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { questions, answers, taskDescription, imageBase64 } = req.body;

    if (!questions || !answers || !taskDescription) {
      return res.status(400).json({ error: 'Missing required fields: questions, answers, taskDescription' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('GROQ_API_KEY is not set in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Build the Q&A context
    const qaContext = questions
      .map((q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || '(no answer provided)'}`)
      .join('\n\n');

    // Build messages — include image if available for visual cross-referencing
    const contentParts = [];

    if (imageBase64) {
      contentParts.push({
        type: 'image_url',
        image_url: {
          url: `data:image/jpeg;base64,${imageBase64}`,
        },
      });
    }

    contentParts.push({
      type: 'text',
      text: `You are a task verification AI for a campus ambassador platform. You need to score a submission based on the proof image, task description, and the ambassador's answers to follow-up questions.

Task Description: "${taskDescription}"

Follow-up Questions and Answers:
${qaContext}

Based on:
1. Whether the proof image (if provided) matches the task requirements
2. Whether the ambassador's answers are specific, consistent, and believable
3. Whether the overall submission appears genuine and the task was actually completed

Provide a verification score from 0 to 100 and brief feedback.

Respond ONLY with valid JSON in this exact format:
{"score": <number 0-100>, "feedback": "<1-2 sentence explanation>", "approved": <true if score >= 60, false otherwise>}`,
    });

    // Use vision model if image is provided, otherwise text model
    const model = imageBase64
      ? 'meta-llama/llama-4-scout-17b-16e-instruct'
      : 'llama3-70b-8192';

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'user',
            content: contentParts,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Groq API error:', errData);
      return res.status(502).json({
        error: errData?.error?.message || `Groq API returned status ${response.status}`,
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '{}';

    let result;
    try {
      result = JSON.parse(content);
    } catch {
      // If parsing fails, try to extract JSON from text
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        result = JSON.parse(match[0]);
      } else {
        result = { score: 50, feedback: 'Unable to fully verify submission.', approved: false };
      }
    }

    // Ensure all required fields
    const score = typeof result.score === 'number' ? Math.min(100, Math.max(0, result.score)) : 50;
    const feedback = result.feedback || 'Verification complete.';
    const approved = result.approved !== undefined ? result.approved : score >= 60;

    return res.status(200).json({ score, feedback, approved });
  } catch (err) {
    console.error('score-submission error:', err);
    return res.status(500).json({ error: 'Internal server error while scoring submission' });
  }
}
