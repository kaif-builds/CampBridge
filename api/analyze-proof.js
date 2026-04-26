export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, taskDescription } = req.body;

    if (!imageBase64 || !taskDescription) {
      return res.status(400).json({ error: 'Missing imageBase64 or taskDescription' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('GROQ_API_KEY is not set in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                },
              },
              {
                type: 'text',
                text: `You are a task verification AI for a campus ambassador platform. An ambassador was supposed to complete this task: "${taskDescription}".

Analyze the uploaded screenshot/image carefully. Based on what you see in the image and the task description, generate exactly 3 short, specific follow-up questions to verify the work is genuine and was actually completed by this person.

The questions should help determine:
1. Whether the proof is authentic (not stolen/faked)
2. Whether the task was actually completed as described
3. Specific details only the person who did the task would know

Respond ONLY with a valid JSON array of exactly 3 question strings, nothing else. Example format:
["Question 1?", "Question 2?", "Question 3?"]`,
              },
            ],
          },
        ],
        temperature: 0.4,
        max_tokens: 400,
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
    const content = data.choices?.[0]?.message?.content || '[]';

    // Parse the JSON array from the response
    let questions;
    try {
      questions = JSON.parse(content);
      if (!Array.isArray(questions)) {
        throw new Error('Response is not an array');
      }
    } catch {
      // If parsing fails, try to extract an array from the text
      const match = content.match(/\[[\s\S]*\]/);
      if (match) {
        questions = JSON.parse(match[0]);
      } else {
        questions = [
          'Can you describe what you did to complete this task?',
          'When and where did you complete this task?',
          'Is there any additional context you can share about your submission?',
        ];
      }
    }

    // Ensure exactly 3 questions
    questions = questions.slice(0, 3);
    while (questions.length < 3) {
      questions.push('Can you provide more details about your submission?');
    }

    return res.status(200).json({ questions });
  } catch (err) {
    console.error('analyze-proof error:', err);
    return res.status(500).json({ error: 'Internal server error while analyzing proof' });
  }
}
