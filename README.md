# 🎓 CampBridge

### *Bridging Brands and Campuses — One Task at a Time.*

> Turn your campus ambassador program from a WhatsApp group into a structured, AI-powered growth engine.

---
<img width="1455" height="777" alt="Screenshot 2026-04-26 at 5 20 28 PM" src="https://github.com/user-attachments/assets/871b6d8f-b85e-4c6b-b442-3f5064ca8445" />

---

---

## 🌐 Live Demo
🔗 **[https://campbridge.vercel.app/](#)**

---

## 🎬 Demo Video

> 📹 **[Click here to watch the full demo walkthrough](#)**
> *(Replace this link with your screen recording URL)*

---

## 🏆 Built for AICore Connect Hackathon — UnsaidTalks 2026

CampBridge is a full-stack campus ambassador management platform that solves a real problem — brands spending thousands on ambassador programs with zero visibility, no verification, and no way to measure ROI. We built the infrastructure that makes community-led marketing **structured, scalable, and provable.**

---

## ✨ What is CampBridge?

Most campus ambassador programs today run on spreadsheets, WhatsApp groups, and blind trust. Ambassadors do the work but get no recognition. Brands pay for campaigns they can't verify. Managers drown in manual review.

**CampBridge fixes all of this.**

It's a dual-sided platform where:
- 🏢 **Brands** post tasks, review AI-verified submissions, and track real ROI
- 🎓 **Students** complete missions, earn points, climb leaderboards, and win real rewards

---

## 🖥️ Screenshots


### Ambassador Dashboard
<img width="1455" height="708" alt="Screenshot 2026-04-26 at 5 21 26 PM" src="https://github.com/user-attachments/assets/38ff93fa-5d24-419e-bc71-4c7b6670a2ad" />


### Task Submission + AI Verification
<img width="1462" height="781" alt="Screenshot 2026-04-26 at 5 22 25 PM" src="https://github.com/user-attachments/assets/d63b9bf1-24fc-42d6-a446-f8fcc2a1057f" />

### Leaderboard
<!-- SCREENSHOT: Global and brand leaderboard -->
![Leaderboard]()

### Rewards System
<!-- SCREENSHOT: Rewards page with badges and progress -->
![Rewards]()

### Manager Dashboard
<!-- SCREENSHOT: Manager dashboard overview -->
![Manager Dashboard]()

### Submission Review Panel
<!-- SCREENSHOT: AI pre-verified submissions queue -->
![Submission Review]()

### For Partners Page
<!-- SCREENSHOT: Partners page with pricing -->
![For Partners]()

---

## 🚀 Key Features

### For Ambassadors
- 🎯 **Task Feed** — Browse and accept tasks from your current brand with deadlines and point values
- 📸 **Proof Submission** — Upload screenshots or videos as proof of task completion
- 🤖 **AI Verification** — Google Gemini scans your proof and asks follow-up questions to confirm authenticity
- 🏅 **Points & Levels** — Earn points for every approved task, level up your profile
- 📊 **Dual Leaderboards** — Compete within your brand AND on the global CampBridge ranking
- 🎁 **Rewards System** — Stay in the global top 10 for 3 consecutive weeks to unlock real physical goodies
- 🏷️ **Badges** — Earn achievement badges for milestones like First Steps, Streak Master, Star Performer
- 🔍 **Browse Brands** — Discover and apply to represent new brands directly on the platform

### For Brand Managers
- ➕ **Task Creation** — Create tasks with title, description, points, deadline, difficulty and proof type
- 📋 **Submissions Dashboard** — Review all ambassador submissions in one place
- 🤖 **AI Pre-Verification** — Gemini AI scans each submission and provides a suggested score + detailed feedback before the manager even opens it
- ✅ **One-Click Approval** — Accept or reject submissions with instant point allocation
- 👥 **Ambassador Directory** — Track every ambassador's performance, points, and activity
- 📈 **Analytics Overview** — Total ambassadors, active tasks, pending reviews, points awarded at a glance

### For Partner Brands
- 📝 **Simple Onboarding** — Apply via the For Partners page, get onboarded within 48 hours
- 💼 **Flexible Plans** — Starter (free), Growth (₹4,999/mo), Enterprise (custom)
- 🎓 **Campus Network** — Access motivated students across 50+ colleges in India

---

## 🤖 AI Verification Flow

This is the heart of CampBridge — what makes it different from every other ambassador tool.

```
Student uploads proof (screenshot / video)
        ↓
Gemini Vision scans the proof
Checks: Is it real? Does it match task requirements?
        ↓
AI generates 2–3 contextual follow-up questions
e.g. "How many people did you hand flyers to?"
        ↓
Student answers the questions
        ↓
Gemini scores the response (0–100%)
+ provides specific feedback points
        ↓
≥ 75%  →  Auto-submitted for manager approval
≤ 40%  →  Flagged / Rejected
Between →  Manager reviews manually
```

No fake submissions. No guesswork. Every task verified.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| AI Verification | Google Gemini API (`@google/genai`) |
| Routing | Internal SPA state (App.tsx) |
| Auth (prototype) | Mock login — Firebase Auth ready |
| Hosting | Vercel |

---

## 📁 Project Structure

```
campbridge/
├── src/
│   ├── App.tsx                  # Main routing and view state
│   ├── components/
│   │   ├── LandingPage.tsx
│   │   ├── AmbassadorDashboard.tsx
│   │   ├── ManagerDashboard.tsx
│   │   ├── TaskDetail.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── RewardsPage.tsx
│   │   ├── BrowseBrands.tsx
│   │   ├── SubmissionReview.tsx
│   │   ├── AmbassadorDirectory.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── index.tsx
├── about.html                   # Static about page
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- A free Google AI Studio API key → [aistudio.google.com](https://aistudio.google.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/campbridge.git

# Navigate into the project
cd campbridge

# Install dependencies
npm install

# Add your Gemini API key
# Create a .env file in the root:
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env

# Start the development server
npm run dev
```

### Access the app
```
http://localhost:5173
```

---

## 🔐 Demo Credentials

> This is a prototype — no real authentication required. Simply click through the login screen.

| Role | How to access |
|---|---|
| Ambassador | Click "I am an Ambassador" on landing page |
| Manager | Click "I am a Manager" on landing page |

---

## 🗺️ User Flow

```
Landing Page
    ├── I am an Ambassador
    │       ↓
    │   Login → Ambassador Dashboard
    │       ├── View & Start Tasks
    │       ├── Upload Proof → AI Verification → Score
    │       ├── Global + Brand Leaderboard
    │       ├── Browse Brands → Apply
    │       └── Rewards + Badges
    │
    └── I am a Manager
            ↓
        Login → Manager Dashboard
            ├── Create Tasks
            ├── Review AI-verified Submissions
            ├── Approve / Reject
            └── Ambassador Performance Directory
```

---

## 🎁 Reward System Logic

```
Week 1 in Global Top 10  →  "Top 10" badge unlocked
Week 2 in Global Top 10  →  Progress bar fills to 2/3
Week 3 in Global Top 10  →  🎉 Reward Eligible!
                             Ambassador can claim physical goodies
                             shipped by CampBridge

Top 3 in any single week →  Instant "Star Performer" badge
```



## 📄 License

MIT License — feel free to build on top of this.

---

## 🙏 Acknowledgements

- [Google AI Studio](https://aistudio.google.com) — Gemini API for AI verification
- [UnsaidTalks](https://unsaidtalks.com) — AICore Connect Hackathon organizers
- [Vercel](https://vercel.com) — Free hosting

---

<div align="center">

**Built with ❤️ for AICore Connect Hackathon 2026**

*CampBridge — Real tasks. AI-verified proof. Fair leaderboards. Genuine rewards.*

</div>
