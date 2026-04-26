import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronDown, UploadCloud, CheckCircle, XCircle, User, LayoutDashboard, ShieldCheck, Trophy, Gift, Lock, Medal, Star, Award, History, Clock } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
// Groq API for AI verification

import { ManagerLayout } from './components/ManagerLayout';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const Bird = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,40 Q30,25 50,35 Q70,25 90,40 Q75,45 60,40 Q50,55 40,40 Q25,45 10,40 Z" fill="#2E231F"/>
  </svg>
);

const Clouds = () => (
  <div className="absolute left-0 right-0 top-[200px] md:top-[150px] z-0 pointer-events-none overflow-hidden h-[1200px]" aria-hidden="true">
    <svg className="w-[200%] md:w-[120%] h-full min-w-[1200px] absolute" style={{ left: '50%', transform: 'translate(-50%, 0)' }} viewBox="0 0 1440 1000" preserveAspectRatio="none">
      <defs>
        <filter id="yellow-outline" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="-4" stdDeviation="0" floodColor="#F9ECA5" floodOpacity="1" />
          <feDropShadow dx="-2" dy="-8" stdDeviation="6" floodColor="#F9ECA5" floodOpacity="0.4" />
        </filter>
        <filter id="yellow-outline-back" x="-20%" y="-20%" width="140%" height="140%">
           <feDropShadow dx="0" dy="-2" stdDeviation="0" floodColor="#F9ECA5" floodOpacity="0.8" />
        </filter>
      </defs>
      <g filter="url(#yellow-outline-back)" fill="#D47FA9" opacity="0.8">
        <g transform="translate(100, 360) scale(0.6)">
           <circle cx="200" cy="150" r="80" />
           <circle cx="300" cy="120" r="100" />
           <circle cx="400" cy="140" r="70" />
           <rect x="200" y="150" width="200" height="80" />
        </g>
        <g transform="translate(900, 340) scale(0.5)">
           <circle cx="100" cy="150" r="60" />
           <circle cx="180" cy="110" r="80" />
           <circle cx="260" cy="130" r="70" />
           <rect x="100" y="150" width="160" height="80" />
        </g>
      </g>
      <g filter="url(#yellow-outline)" fill="#DF79B5">
        <g transform="translate(-150, 450) scale(1.5)">
          <circle cx="100" cy="150" r="100" />
          <circle cx="250" cy="80" r="140" />
          <circle cx="400" cy="120" r="110" />
          <rect x="100" y="150" width="300" height="200" />
        </g>
        <g transform="translate(350, 400) scale(1.8)">
          <circle cx="100" cy="150" r="90" />
          <circle cx="200" cy="60" r="150" />
          <circle cx="350" cy="110" r="120" />
          <circle cx="450" cy="160" r="80" />
          <rect x="100" y="150" width="350" height="200" />
        </g>
        <g transform="translate(950, 420) scale(1.6)">
          <circle cx="100" cy="150" r="110" />
          <circle cx="250" cy="80" r="130" />
          <circle cx="400" cy="120" r="100" />
          <rect x="100" y="150" width="300" height="200" />
        </g>
      </g>
       <g filter="url(#yellow-outline-back)" fill="#DC73B1">
         <g transform="translate(200, 650) scale(1.3)">
            <circle cx="150" cy="150" r="90" />
            <circle cx="280" cy="120" r="120" />
            <circle cx="400" cy="160" r="80" />
            <rect x="150" y="150" width="250" height="150" />
         </g>
         <g transform="translate(700, 680) scale(1.4)">
            <circle cx="100" cy="150" r="80" />
            <circle cx="220" cy="100" r="110" />
            <circle cx="340" cy="130" r="90" />
            <rect x="100" y="150" width="240" height="150" />
         </g>
      </g>
    </svg>
  </div>
);

const DashboardLayout = ({ children, activeTab, setCurrentView, displayName, initials }: any) => {
  return (
    <div className="relative z-10 flex min-h-screen font-sans">
      <div className="w-64 bg-white/70 backdrop-blur-md border-r border-white/40 p-6 flex-col hidden md:flex fixed h-full left-0 top-0 z-50">
         <button onClick={() => setCurrentView('landing')} className="font-sans font-semibold text-2xl text-[#1D2B5D] mb-12 tracking-tight text-left hover:opacity-80 transition-opacity">CampBridge</button>
         <nav className="flex flex-col gap-2">
            <button onClick={() => setCurrentView('dashboard')} className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'dashboard' ? 'bg-white text-[#1D2B5D] shadow-sm' : 'text-[#1D2B5D]/60 hover:text-[#1D2B5D] hover:bg-white/50'}`}>Dashboard</button>
            <button onClick={() => setCurrentView('browse-brands')} className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'browse-brands' ? 'bg-white text-[#1D2B5D] shadow-sm' : 'text-[#1D2B5D]/60 hover:text-[#1D2B5D] hover:bg-white/50'}`}>Browse Brands</button>
            <button onClick={() => setCurrentView('leaderboard')} className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'leaderboard' ? 'bg-white text-[#1D2B5D] shadow-sm' : 'text-[#1D2B5D]/60 hover:text-[#1D2B5D] hover:bg-white/50'}`}>Leaderboard</button>
            <button onClick={() => setCurrentView('rewards')} className={`flex items-center gap-2 text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'rewards' ? 'bg-white text-[#1D2B5D] shadow-sm' : 'text-[#1D2B5D]/60 hover:text-[#1D2B5D] hover:bg-white/50'}`}><Gift className="w-4 h-4" /> Rewards</button>
         </nav>
      </div>
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen pb-20 md:pb-0 w-full min-w-0">
         <header className="h-20 px-4 md:px-8 flex items-center justify-between gap-6 bg-white/20 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
            <div className="flex items-center gap-4">
               <button onClick={() => setCurrentView('landing')} className="md:hidden font-sans font-semibold text-xl text-[#1D2B5D] tracking-tight hover:opacity-80 transition-opacity">CampBridge</button>
               <button onClick={() => setCurrentView('landing')} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-white/60 hover:bg-white shadow-sm border border-white/60 rounded-xl text-xs md:text-sm font-bold text-[#1D2B5D] transition-all">
                  ← Home
               </button>
            </div>
            <div className="flex items-center gap-3">
               <div className="text-right">
                 <div className="font-bold text-[#1D2B5D] text-sm hidden sm:block">{displayName}</div>
                 <div className="text-xs font-bold text-[#1D2B5D]/70">Level 4 • 340 pts</div>
               </div>
               <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center font-serif font-bold text-[#1A2B60]">{initials}</div>
            </div>
         </header>
         <main className="flex-1 p-4 md:p-8">
            {children}
         </main>
      </div>
      
      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/40 p-2 flex justify-around items-center z-50 px-4">
         <button onClick={() => setCurrentView('dashboard')} className={`flex flex-col items-center p-2 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'text-[#1D2B5D] bg-[#1D2B5D]/5' : 'text-[#1D2B5D]/60'}`}>
            <LayoutDashboard className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold">Home</span>
         </button>
         <button onClick={() => setCurrentView('browse-brands')} className={`flex flex-col items-center p-2 rounded-xl transition-colors ${activeTab === 'browse-brands' ? 'text-[#1D2B5D] bg-[#1D2B5D]/5' : 'text-[#1D2B5D]/60'}`}>
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            <span className="text-[10px] font-bold">Brands</span>
         </button>
         <button onClick={() => setCurrentView('leaderboard')} className={`flex flex-col items-center p-2 rounded-xl transition-colors ${activeTab === 'leaderboard' ? 'text-[#1D2B5D] bg-[#1D2B5D]/5' : 'text-[#1D2B5D]/60'}`}>
            <Trophy className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold">Rank</span>
         </button>
         <button onClick={() => setCurrentView('rewards')} className={`flex flex-col items-center p-2 rounded-xl transition-colors ${activeTab === 'rewards' ? 'text-[#1D2B5D] bg-[#1D2B5D]/5' : 'text-[#1D2B5D]/60'}`}>
            <Gift className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold">Rewards</span>
         </button>
      </div>
    </div>
  );
};

export default function App() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const x1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -350]);
  const x2 = useTransform(scrollY, [0, 1000], [0, 250]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
  const x3 = useTransform(scrollY, [0, 1000], [0, 100]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -250]);
  const x4 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y5 = useTransform(scrollY, [0, 1000], [0, -400]);
  const x5 = useTransform(scrollY, [0, 1000], [0, 300]);

  const [currentView, setCurrentView] = useState('landing');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [aiState, setAiState] = useState('idle');
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [aiFeedback, setAiFeedback] = useState<any>(null);
  const [appliedBrands, setAppliedBrands] = useState<number[]>([]);
  const [applyingToBrand, setApplyingToBrand] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toasts, setToasts] = useState<{id: string, text: string}[]>([]);
  const [userName, setUserName] = useState('');
  const [leaderboardTab, setLeaderboardTab] = useState<'national' | 'brand'>('national');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Reward System State
  const [rewardStreak, setRewardStreak] = useState(2); // Mock: 2 weeks currently in top 10
  const isRewardEligible = rewardStreak >= 3;
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [rewardsClaimed, setRewardsClaimed] = useState(false);
  const [claimForm, setClaimForm] = useState({ name: '', phone: '', address: '', pin: '' });

  const triggerToast = (text: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const [partnerFormSubmitted, setPartnerFormSubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    brandName: '', industry: '', website: '', contactName: '',
    designation: '', workEmail: '', phone: '', colleges: '',
    taskDetails: '', source: ''
  });

  // Manager State
  const [managerCompanyName, setManagerCompanyName] = useState('');
  const managerInitials = managerCompanyName ? managerCompanyName.substring(0, 2).toUpperCase() : "RB";

  const [managerTasks, setManagerTasks] = useState([
    { id: 101, title: "Post Instagram Story", pts: 50, submissions: 12, status: "Active" },
    { id: 102, title: "Distribute 50 Flyers", pts: 80, submissions: 5, status: "Active" },
    { id: 103, title: "Run College Stall", pts: 200, submissions: 2, status: "Closed" },
    { id: 104, title: "Refer 3 Friends", pts: 100, submissions: 24, status: "Active" },
    { id: 105, title: "Attend Brand Workshop", pts: 150, submissions: 8, status: "Active" },
  ]);

  const [managerSubmissions, setManagerSubmissions] = useState([
     { id: 201, name: "Aarav Sharma", col: "IIT Bombay", task: "Post Instagram Story", time: "2 hours ago", score: 87, status: "Pending" },
     { id: 202, name: "Riya Patel", col: "BITS Pilani", task: "Distribute 50 Flyers", time: "5 hours ago", score: 92, status: "Pending" },
     { id: 203, name: "Karan Singh", col: "DU - SRCC", task: "Run College Stall", time: "1 day ago", score: 65, status: "Pending" },
     { id: 204, name: "Ananya Desai", col: "IIM Ahmedabad", task: "Refer 3 Friends", time: "2 days ago", score: 98, status: "Pending" },
  ]);

  const [managerAmbassadors, setManagerAmbassadors] = useState([
     { id: 301, name: "Aarav Sharma", col: "IIT Bombay", pts: "12,450", done: 14, date: "12 Jan 2025", status: "Active" },
     { id: 302, name: "Riya Patel", col: "BITS Pilani", pts: "11,200", done: 12, date: "15 Jan 2025", status: "Active" },
     { id: 303, name: "Karan Singh", col: "DU - SRCC", pts: "9,850", done: 10, date: "20 Jan 2025", status: "Inactive" },
     { id: 304, name: "Ananya Desai", col: "IIM Ahmedabad", pts: "8,900", done: 9, date: "22 Jan 2025", status: "Active" },
     { id: 305, name: "Vikram Reddy", col: "NIT Trichy", pts: "8,600", done: 9, date: "01 Feb 2025", status: "Active" },
     { id: 306, name: "Priya Gupta", col: "St. Xavier's Mumbai", pts: "8,450", done: 8, date: "05 Feb 2025", status: "Active" },
     { id: 307, name: "Rahul Verma", col: "IIT Delhi", pts: "8,200", done: 7, date: "10 Feb 2025", status: "Inactive" },
     { id: 308, name: "Neha Menon", col: "Christ University", pts: "7,900", done: 7, date: "14 Feb 2025", status: "Active" },
  ]);

  const [ambaSearch, setAmbaSearch] = useState('');
  const [newTask, setNewTask] = useState({ title: '', desc: '', pts: 50, date: '', proof: 'Both', diff: 'Medium' });

  const displayName = userName.trim() || 'Aditya Sharma';
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAIReview = async () => {
    if (!proofImage) return;
    setAiState('analyzing');
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-4-scout-17b-16e-instruct',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image_url',
                  image_url: {
                    url: proofImage,
                  },
                },
                {
                  type: 'text',
                  text: `You are a task verification AI. Verify if this image fulfills the task: "${selectedTask.title}". The instructions were: Please post a creative story featuring our product on your campus. Tell me if you think it's valid. Also come up with a score (0 to 100). If you have any suspicions, create some follow up questions.

Respond ONLY with valid JSON in this exact format:
{"score": <number 0-100>, "approved": <true or false>, "questions": [<array of follow-up question strings, or empty array if all looks good>]}`,
                },
              ],
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3,
          max_tokens: 512,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error?.message || `Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const resData = JSON.parse(data.choices[0].message.content || '{}');
      setAiFeedback(resData);
      
      if (resData.questions && resData.questions.length > 0) {
         setAiState('questions');
      } else {
         setAiState('done');
      }
    } catch (err) {
      console.error(err);
      setAiState('idle'); // revert on error
    }
  };

  const renderLanding = () => (
    <>
      <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/20 backdrop-blur-md border border-white/30 rounded-[2.5rem] px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
          <div className="font-sans font-semibold text-2xl text-white ml-2 tracking-tight">CampBridge</div>
          
          <div className="hidden lg:flex items-center gap-7 text-[#FDFDFD] text-[11px] font-bold tracking-widest uppercase">
            <span onClick={() => setCurrentView('partners')} className="flex items-center gap-1.5 cursor-pointer hover:text-white/80 transition-colors">For Partners</span>
            <a href="/about.html" className="flex items-center gap-1.5 cursor-pointer hover:text-white/80 transition-colors">About <ChevronDown className="w-3.5 h-3.5 opacity-80" /></a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('choose-role')} className="px-6 py-2.5 text-sm font-bold text-[#304B72] bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-shadow">Get Started</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-[22vh] pb-[400px] md:pb-[600px] text-center px-4">
        <h1 className="font-serif text-[2.2rem] sm:text-[2.8rem] md:text-[4rem] text-white leading-[1.05] tracking-tight drop-shadow-md mb-6 font-medium">
          Manage. Engage. Grow.
        </h1>
        <p className="font-sans text-base md:text-[17px] font-medium text-white/95 mb-10 max-w-lg mx-auto tracking-wide drop-shadow-sm">
          A unified platform to manage, track, and grow campus ambassador programs effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto z-20 relative">
          <button onClick={() => setCurrentView('manager-login')} className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white text-[#29426D] px-8 py-4 rounded-full font-bold text-[16px] shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.7)] transition-all transform hover:-translate-y-1">
            I am a Manager <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
          <button onClick={() => setCurrentView('login')} className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#1D2B5D] text-white px-8 py-4 rounded-full font-bold text-[16px] shadow-[0_0_25px_rgba(29,43,93,0.4)] hover:shadow-[0_0_35px_rgba(29,43,93,0.6)] transition-all transform hover:-translate-y-1 border border-white/10">
            I am an Ambassador <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        <motion.svg style={{ y: y1, x: x1 }} className="absolute top-[10%] right-[10%] md:right-[20%] w-16 h-16 -rotate-12 opacity-90 drop-shadow-md" viewBox="0 0 100 100"><Bird className="w-full h-full"/></motion.svg>
        <motion.svg style={{ y: y2, x: x2 }} className="absolute top-[25%] right-[5%] md:right-[12%] w-24 h-24 -rotate-6 opacity-95 drop-shadow-md" viewBox="0 0 100 100"><Bird className="w-full h-full"/></motion.svg>
        <motion.svg style={{ y: y3, x: x3 }} className="absolute top-[32%] right-[15%] md:right-[25%] w-20 h-20 -rotate-12 opacity-85 drop-shadow-md" viewBox="0 0 100 100"><Bird className="w-full h-full"/></motion.svg>
        <motion.svg style={{ y: y4, x: x4 }} className="absolute top-[45%] left-[20%] md:left-[35%] w-20 h-20 rotate-12 opacity-95 drop-shadow-md" viewBox="0 0 100 100"><Bird className="w-full h-full"/></motion.svg>
        <motion.svg style={{ y: y5, x: x5 }} className="absolute top-[38%] left-[10%] md:left-[28%] w-16 h-16 rotate-6 opacity-80 drop-shadow-md" viewBox="0 0 100 100"><Bird className="w-full h-full"/></motion.svg>

        <div className="absolute bottom-[200px] md:bottom-[350px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 opacity-90 drop-shadow-md animate-bounce">
          <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-white" />
        </div>
      </main>

      <section className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto -mt-[150px] md:-mt-[250px] mb-32">
        <div className="text-center mb-14 drop-shadow-md">
          <h2 className="font-serif text-[2.5rem] md:text-[2.8rem] text-white tracking-widest mb-2 font-normal">Everything you need to grow</h2>
          <p className="text-white/95 text-sm md:text-[15px] font-medium tracking-wide">
            CampBridge provides a complete toolkit for your ambassador program.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Top Row: 2 large cards */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            
            {/* Ambassador Portal Card */}
            <div className="bg-[#213576] rounded-[1.5rem] p-7 md:p-9 flex flex-col shadow-2xl border border-white/10 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 min-h-[380px]">
              <div className="relative z-10 sm:max-w-[55%]">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 shadow-sm border border-white/5">
                   <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-[1.6rem] text-white mb-5 font-medium leading-tight">Ambassador Portal</h3>
                <ul className="text-white/80 text-[13px] leading-relaxed space-y-3">
                   <li className="flex items-center gap-3">
                      <div className="bg-[#F9ECA5]/20 p-1 rounded text-[#F9ECA5]"><CheckCircle className="w-3 h-3" /></div>
                      Join with invite code
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#F9ECA5]/20 p-1 rounded text-[#F9ECA5]"><CheckCircle className="w-3 h-3" /></div>
                      Complete tasks, earn rewards
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#F9ECA5]/20 p-1 rounded text-[#F9ECA5]"><CheckCircle className="w-3 h-3" /></div>
                      Upload proof (image/video)
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#F9ECA5]/20 p-1 rounded text-[#F9ECA5]"><CheckCircle className="w-3 h-3" /></div>
                      Track points, badges & rank
                   </li>
                </ul>
              </div>

              {/* Graphic Mockup inside card */}
              <div className="absolute right-[-40px] sm:right-[-10px] bottom-[-70px] w-[200px] sm:w-[220px] h-[350px] sm:h-[380px] bg-[#162454] border-[6px] border-[#111A3A] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-[-8deg] px-4 pt-6 group-hover:rotate-[-5deg] group-hover:-translate-y-2 transition-all duration-500 z-0">
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#111A3A] rounded-b-xl"></div>
                 <div className="mt-4 mb-2 opacity-80 text-xs text-white">Total Points</div>
                 <div className="text-2xl font-serif text-white font-bold mb-6 flex items-center gap-2">12,540 <span className="bg-[#D47FA9] text-white text-[10px] px-2 py-0.5 rounded-full">+120</span></div>
                 
                 <div className="bg-[#1D2B5D] rounded-xl p-3 mb-4 border border-white/5 relative overflow-hidden">
                    <div className="text-[10px] text-white/50 mb-1">Current Rank</div>
                    <div className="text-sm text-white font-bold">Master</div>
                    <Trophy className="absolute right-2 top-2 w-6 h-6 text-[#F9ECA5] opacity-80" />
                 </div>
                 
                 <div className="bg-[#1D2B5D] rounded-xl p-3 border border-white/5">
                    <div className="text-[10px] text-white/50 mb-1">Your Progress</div>
                    <div className="flex items-center justify-between text-[10px] text-white mb-2">
                       <div className="h-2 flex-grow bg-white/10 rounded-full mr-3"><div className="w-[75%] h-full bg-[#D47FA9] rounded-full"></div></div>
                       <span>75%</span>
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Manager Portal Card */}
            <div className="bg-[#FAF8F5] rounded-[1.5rem] p-7 md:p-9 flex flex-col shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 min-h-[380px]">
              <div className="relative z-10 sm:max-w-[55%]">
                <div className="w-12 h-12 rounded-xl bg-[#D47FA9]/10 flex items-center justify-center mb-6 shadow-sm border border-[#D47FA9]/5">
                   <LayoutDashboard className="w-6 h-6 text-[#D47FA9]" />
                </div>
                <h3 className="font-serif text-[1.6rem] text-[#1D2B5D] mb-5 font-medium leading-tight">Manager Portal</h3>
                <ul className="text-[#1D2B5D]/80 text-[13px] leading-relaxed space-y-3">
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      Create & assign tasks
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      Manage ambassadors
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      AI-assisted review queue
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      Real-time analytics
                   </li>
                </ul>
              </div>

              {/* Graphic Mockup inside card */}
              <div className="absolute right-[-60px] sm:right-[-20px] bottom-[-20px] w-[280px] sm:w-[320px] h-[240px] bg-white rounded-xl shadow-[0_15px_40px_rgba(29,43,93,0.15)] border border-[#1D2B5D]/5 transform rotate-[5deg] flex flex-col overflow-hidden group-hover:rotate-[3deg] group-hover:-translate-y-2 transition-all duration-500 z-0">
                 <div className="bg-gray-50 h-6 border-b border-gray-100 flex items-center px-3 gap-1.5 shrink-0">
                   <div className="w-2 h-2 rounded-full bg-red-400"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                   <div className="w-2 h-2 rounded-full bg-green-400"></div>
                 </div>
                 <div className="p-3 sm:p-4 flex-1 flex flex-col">
                   <div className="flex gap-2 mb-3 shrink-0">
                     <div className="flex-1 bg-gray-50 rounded-lg p-2 border border-gray-100">
                       <div className="text-[9px] text-gray-400">Ambassadors</div>
                       <div className="text-sm font-bold text-[#1D2B5D]">248</div>
                     </div>
                     <div className="flex-1 bg-gray-50 rounded-lg p-2 border border-gray-100">
                       <div className="text-[9px] text-gray-400">Tasks</div>
                       <div className="text-sm font-bold text-[#1D2B5D]">162</div>
                     </div>
                     <div className="flex-1 bg-gray-50 rounded-lg p-2 border border-gray-100 hidden sm:block">
                       <div className="text-[9px] text-gray-400">Submissions</div>
                       <div className="text-sm font-bold text-[#1D2B5D]">432</div>
                     </div>
                   </div>
                   <div className="flex-1 bg-gradient-to-t from-[#D47FA9]/5 to-transparent rounded-lg border border-[#D47FA9]/10 relative pt-2">
                      <div className="text-[9px] text-gray-400 pl-2">Engagement <span className="bg-[#1D2B5D] text-white px-1.5 py-0.5 rounded float-right mr-2 mt-[-2px] text-[8px]">+28%</span></div>
                      <svg className="absolute bottom-0 w-full h-[70%] text-[#D47FA9] drop-shadow-sm" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0,35 Q10,20 20,30 T40,15 T60,25 T70,15 T80,10 T100,20 L100,40 L0,40 Z" fill="currentColor" fillOpacity="0.2"/>
                        <path d="M0,35 Q10,20 20,30 T40,15 T60,25 T70,15 T80,10 T100,20" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="80" cy="10" r="3" fill="#D47FA9" className="drop-shadow-md" />
                      </svg>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 smaller cards */}
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            
            {/* Gamification Card */}
            <div className="bg-[#FAF8F5] rounded-[1.5rem] p-7 flex flex-col shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 min-h-[300px]">
              <div className="relative z-10">
                <h3 className="font-serif text-[1.4rem] text-[#1D2B5D] mb-4 font-medium leading-tight">Gamification</h3>
                <ul className="text-[#1D2B5D]/80 text-[13px] leading-relaxed space-y-3">
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      Earn points per task
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      Streak rewards
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      Unlock badges
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      Long-term incentives
                   </li>
                </ul>
              </div>
              <Trophy className="absolute right-[-10px] bottom-[-20px] w-40 h-40 text-[#D47FA9]/5 transform rotate-[-15deg] group-hover:scale-110 group-hover:rotate-[-5deg] group-hover:text-[#D47FA9]/10 transition-all duration-500 z-0" />
            </div>

            {/* AI Verification Card */}
            <div className="bg-[#213576] rounded-[1.5rem] p-7 flex flex-col shadow-xl border border-white/10 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 min-h-[300px]">
              <div className="relative z-10">
                <h3 className="font-serif text-[1.4rem] text-white mb-4 font-medium leading-tight">AI Verification</h3>
                <ul className="text-white/80 text-[13px] leading-relaxed space-y-3">
                   <li className="flex items-center gap-3">
                      <div className="bg-[#F9ECA5]/20 p-1 rounded text-[#F9ECA5]"><CheckCircle className="w-3 h-3" /></div>
                      Auto-check proof authenticity
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#F9ECA5]/20 p-1 rounded text-[#F9ECA5]"><CheckCircle className="w-3 h-3" /></div>
                      Smart follow-up questions
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#F9ECA5]/20 p-1 rounded text-[#F9ECA5]"><CheckCircle className="w-3 h-3" /></div>
                      Auto approve / flag / review
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#F9ECA5]/20 p-1 rounded text-[#F9ECA5]"><CheckCircle className="w-3 h-3" /></div>
                      Ensures fairness & quality
                   </li>
                </ul>
              </div>
              <ShieldCheck className="absolute right-[-20px] bottom-[-30px] w-48 h-48 text-white/5 transform rotate-[15deg] group-hover:scale-110 group-hover:text-white/10 transition-all duration-500 z-0" />
            </div>

            {/* Leaderboards Card */}
            <div className="bg-[#FAF8F5] rounded-[1.5rem] p-7 flex flex-col shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 min-h-[300px]">
              <div className="relative z-10">
                <h3 className="font-serif text-[1.4rem] text-[#1D2B5D] mb-4 font-medium leading-tight">Leaderboards</h3>
                <ul className="text-[#1D2B5D]/80 text-[13px] leading-relaxed space-y-3">
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      Company rankings
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      Global rankings
                   </li>
                   <li className="flex items-center gap-3">
                      <div className="bg-[#D47FA9]/20 p-1 rounded text-[#D47FA9]"><CheckCircle className="w-3 h-3" /></div>
                      Reward top performers
                   </li>
                </ul>
              </div>
              
              <div className="absolute right-4 bottom-[-10px] w-32 h-32 flex items-end justify-center gap-1.5 opacity-10 group-hover:opacity-30 transition-all duration-500 z-0 group-hover:scale-110">
                 <div className="w-8 h-12 bg-[#D47FA9] rounded-t-lg"></div>
                 <div className="w-10 h-20 bg-[#D47FA9] rounded-t-lg relative">
                    <svg className="w-6 h-6 text-white absolute -top-8 left-1/2 -translate-x-1/2 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                 </div>
                 <div className="w-8 h-8 bg-[#D47FA9] rounded-t-lg"></div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );

  const renderPartners = () => (
    <>
      <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/20 backdrop-blur-md border border-white/30 rounded-[2.5rem] px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
          <div onClick={() => setCurrentView('landing')} className="font-sans font-semibold text-2xl text-white ml-2 tracking-tight cursor-pointer">CampBridge</div>
          
          <div className="hidden lg:flex items-center gap-7 text-[#FDFDFD] text-[11px] font-bold tracking-widest uppercase">
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-white/80 transition-colors">For Partners <ChevronDown className="w-3.5 h-3.5 opacity-80" /></span>
            <a href="/about.html" className="flex items-center gap-1.5 cursor-pointer hover:text-white/80 transition-colors">About <ChevronDown className="w-3.5 h-3.5 opacity-80" /></a>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('choose-role')} className="px-6 py-2.5 text-sm font-bold text-[#304B72] bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-shadow">Get Started</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-[22vh] pb-24 text-center px-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold text-white uppercase tracking-widest inline-block mb-6 shadow-sm">
           For Brand Partners
        </div>
        <h1 className="font-serif text-[2.2rem] sm:text-[2.8rem] md:text-[4rem] text-white leading-[1.05] tracking-tight drop-shadow-md mb-6 font-medium max-w-4xl mx-auto">
          Reach Every Campus. Authentically.
        </h1>
        <p className="font-sans text-base md:text-[17px] font-medium text-white/95 mb-10 max-w-2xl mx-auto tracking-wide drop-shadow-sm">
          Partner with CampBridge to build a network of motivated student ambassadors who genuinely love your brand — and prove it.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto z-20 relative">
          <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#1D2B5D] text-white px-8 py-4 rounded-full font-bold text-[16px] shadow-[0_0_25px_rgba(29,43,93,0.4)] hover:shadow-[0_0_35px_rgba(29,43,93,0.6)] transition-all transform hover:-translate-y-1">
            Apply as a Partner <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
        
        <motion.svg style={{ y: y1, x: x1 }} className="absolute top-[10%] right-[10%] md:right-[20%] w-16 h-16 -rotate-12 opacity-90 drop-shadow-md" viewBox="0 0 100 100"><Bird className="w-full h-full"/></motion.svg>
        <motion.svg style={{ y: y2, x: x2 }} className="absolute top-[25%] right-[5%] md:right-[12%] w-24 h-24 -rotate-6 opacity-95 drop-shadow-md" viewBox="0 0 100 100"><Bird className="w-full h-full"/></motion.svg>
        <motion.svg style={{ y: y4, x: x4 }} className="absolute top-[45%] left-[20%] md:left-[35%] w-20 h-20 rotate-12 opacity-95 drop-shadow-md" viewBox="0 0 100 100"><Bird className="w-full h-full"/></motion.svg>
      </main>

      {/* Logos Strip */}
      <section className="relative z-10 px-4 mb-24 max-w-6xl mx-auto">
        <div className="text-center mb-8">
           <p className="text-white/80 font-bold uppercase tracking-wider text-sm">Trusted by brands across India</p>
        </div>
        <div className="w-full flex justify-center items-center opacity-90">
           <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              {['RedBull', 'Nike', 'Spotify', 'Zomato', 'boAt', 'Nykaa'].map(logo => (
                 <div key={logo} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 sm:px-10 sm:py-5 flex items-center justify-center shadow-inner">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-white tracking-widest">{logo}</span>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
           {[
             { num: "500+", label: "Active Ambassadors" },
             { num: "50+", label: "College Campuses" },
             { num: "10k+", label: "Tasks Completed" },
             { num: "95%", label: "Verified Completion" },
           ].map((stat, i) => (
             <div key={i} className="bg-white/80 backdrop-blur-md rounded-[1.5rem] p-6 text-center border border-white/40 shadow-xl hover:-translate-y-1 transition-transform">
                <div className="font-serif text-4xl md:text-5xl text-[#1D2B5D] mb-2">{stat.num}</div>
                <div className="font-mono text-[11px] font-bold text-[#D47FA9] uppercase tracking-wider">{stat.label}</div>
             </div>
           ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-[2.5rem] md:text-[2.8rem] text-white tracking-widest mb-4 font-normal drop-shadow-md">What You Get</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
           {[
             { title: "Verified Execution", desc: "Every task is verified by our AI engine — no fake submissions, no guesswork.", icon: "🔍" },
             { title: "Real-Time Dashboard", desc: "Track ambassador activity, submissions, and ROI from one clean dashboard.", icon: "📊" },
             { title: "Motivated Ambassadors", desc: "Our gamification system keeps ambassadors engaged and competing to perform better for your brand.", icon: "🏆" },
             { title: "Campus Reach", desc: "Access students across 50+ colleges in India — your brand's word spread organically.", icon: "🎓" },
           ].map((feat, i) => (
             <div key={i} className="bg-[#FAF8F5] rounded-[1.5rem] p-8 shadow-xl border-t-[6px] border-t-[#D47FA9] relative overflow-hidden group hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{feat.icon}</div>
                <h3 className="font-serif text-2xl text-[#1D2B5D] mb-3">{feat.title}</h3>
                <p className="text-[#1D2B5D]/70 font-medium leading-relaxed">{feat.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto mb-32">
        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/20 shadow-xl text-center">
          <h2 className="font-serif text-[2.5rem] md:text-[2.8rem] text-white tracking-widest mb-16 font-normal drop-shadow-md">How It Works for Partners</h2>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
            <div className="hidden md:block absolute top-[28px] left-12 right-12 h-0.5 border-t-2 border-dashed border-white/40 -z-10"></div>
            
            {[
               "Apply & get verified",
               "Set up your brand profile and tasks",
               "Ambassadors complete and submit proof",
               "Review, approve and watch your campus presence grow"
            ].map((step, i) => (
               <div key={i} className="flex flex-row md:flex-col items-center md:items-start text-left md:text-center w-full md:w-1/4 gap-5 md:gap-0">
                  <div className="w-14 h-14 shrink-0 bg-[#1D2B5D] rounded-full flex items-center justify-center font-serif font-bold text-xl text-white shadow-lg border-4 border-white/80 md:mx-auto md:mb-6 relative z-10 transition-transform hover:scale-110">
                     {i + 1}
                  </div>
                  <p className="font-medium text-white md:px-4 text-[15px]">{step}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="font-serif text-[2.5rem] md:text-[2.8rem] text-white tracking-widest mb-4 font-normal drop-shadow-md">Pricing Options</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 items-center">
           <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/40">
             <h3 className="font-serif text-2xl text-[#1D2B5D] mb-2">Starter</h3>
             <div className="text-3xl font-bold text-[#1D2B5D] mb-6">Free</div>
             <ul className="text-[#1D2B5D]/80 text-sm space-y-4 mb-8 font-medium">
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-green-500" /> Up to 10 ambassadors</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-green-500" /> 5 active tasks</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-green-500" /> Basic dashboard</li>
             </ul>
             <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 rounded-full border-2 border-[#1D2B5D] text-[#1D2B5D] font-bold hover:bg-[#1D2B5D]/5 transition-colors">Get Started</button>
           </div>
           
           <div className="bg-[#FAF8F5] rounded-[2rem] p-8 shadow-2xl border-2 border-[#DF79B5] md:scale-105 relative z-10">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#DF79B5] text-white text-[10px] uppercase font-bold tracking-wider px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">Most Popular</div>
             <h3 className="font-serif text-2xl text-[#1D2B5D] mb-2 mt-2">Growth</h3>
             <div className="text-3xl font-bold text-[#1D2B5D] flex items-end gap-1 mb-6">₹4,999<span className="text-sm text-[#1D2B5D]/50 font-normal mb-1">/month</span></div>
             <ul className="text-[#1D2B5D]/80 text-sm space-y-4 mb-8 font-medium">
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#DF79B5]" /> Up to 100 ambassadors</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#DF79B5]" /> Unlimited tasks</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#DF79B5]" /> AI verification included</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#DF79B5]" /> Priority support</li>
             </ul>
             <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 rounded-full bg-[#1D2B5D] text-white font-bold shadow-lg hover:bg-[#1A2B60] transition-colors">Choose Growth</button>
           </div>
           
           <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/40">
             <h3 className="font-serif text-2xl text-[#1D2B5D] mb-2">Enterprise</h3>
             <div className="text-3xl font-bold text-[#1D2B5D] mb-6">Custom</div>
             <ul className="text-[#1D2B5D]/80 text-sm space-y-4 mb-8 font-medium">
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#1D2B5D]/60" /> Unlimited ambassadors</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#1D2B5D]/60" /> Dedicated account manager</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#1D2B5D]/60" /> Custom integrations</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-[#1D2B5D]/60" /> White-label option</li>
             </ul>
             <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-3 rounded-full border-2 border-[#1D2B5D] text-[#1D2B5D] font-bold hover:bg-[#1D2B5D]/5 transition-colors">Contact Us</button>
           </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="apply" className="relative z-10 px-4 md:px-8 max-w-3xl mx-auto mb-32 scroll-mt-32">
        <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
           <div className="text-center mb-10">
             <h2 className="font-serif text-3xl md:text-4xl text-[#1D2B5D] mb-3">Apply to Become a Partner</h2>
             <p className="text-[#1D2B5D]/60 font-medium">Fill in your details and our team will get back within 48 hours</p>
           </div>
           
           {partnerFormSubmitted ? (
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                   <span className="text-5xl !leading-none mt-1">🎉</span>
                </div>
                <h3 className="font-serif text-3xl text-[#1D2B5D] mb-3">Application Received!</h3>
                <p className="text-[#1D2B5D]/70 font-medium max-w-sm mx-auto leading-relaxed">Thank you for your interest. Our partnership team will reach out to you within 48 hours to get you set up.</p>
                <button onClick={() => setPartnerFormSubmitted(false)} className="mt-8 text-sm font-bold text-[#D47FA9] hover:text-[#1D2B5D] transition-colors">Submit another response</button>
             </motion.div>
           ) : (
             <form onSubmit={(e) => { e.preventDefault(); setPartnerFormSubmitted(true); triggerToast('Partner application submitted successfully!'); }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-xs font-bold text-[#1D2B5D]/70 uppercase tracking-wider mb-2">Brand/Company Name</label>
                      <input required value={partnerForm.brandName} onChange={e => setPartnerForm({...partnerForm, brandName: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] outline-none transition-shadow" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-[#1D2B5D]/70 uppercase tracking-wider mb-2">Industry</label>
                      <select required value={partnerForm.industry} onChange={e => setPartnerForm({...partnerForm, industry: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] outline-none transition-shadow">
                         <option value="">Select Industry</option>
                         <option value="FMCG">FMCG</option>
                         <option value="Tech">Tech</option>
                         <option value="Fashion">Fashion</option>
                         <option value="Food & Beverage">Food & Beverage</option>
                         <option value="Finance">Finance</option>
                         <option value="Other">Other</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-[#1D2B5D]/70 uppercase tracking-wider mb-2">Contact Person Name</label>
                      <input required value={partnerForm.contactName} onChange={e => setPartnerForm({...partnerForm, contactName: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] outline-none transition-shadow" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-[#1D2B5D]/70 uppercase tracking-wider mb-2">Designation</label>
                      <input required value={partnerForm.designation} onChange={e => setPartnerForm({...partnerForm, designation: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] outline-none transition-shadow" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-[#1D2B5D]/70 uppercase tracking-wider mb-2">Work Email</label>
                      <input required type="email" value={partnerForm.workEmail} onChange={e => setPartnerForm({...partnerForm, workEmail: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] outline-none transition-shadow" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-[#1D2B5D]/70 uppercase tracking-wider mb-2">Phone Number</label>
                      <input required type="tel" value={partnerForm.phone} onChange={e => setPartnerForm({...partnerForm, phone: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] outline-none transition-shadow" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-[#1D2B5D]/70 uppercase tracking-wider mb-2">Website URL</label>
                      <input type="url" value={partnerForm.website} onChange={e => setPartnerForm({...partnerForm, website: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] outline-none transition-shadow" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-[#1D2B5D]/70 uppercase tracking-wider mb-2">Targeted Campuses</label>
                      <select required value={partnerForm.colleges} onChange={e => setPartnerForm({...partnerForm, colleges: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] outline-none transition-shadow">
                         <option value="">Select Target Volume</option>
                         <option value="1-10">1–10 Colleges</option>
                         <option value="10-25">10–25 Colleges</option>
                         <option value="25-50">25–50 Colleges</option>
                         <option value="50+">50+ Colleges</option>
                      </select>
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-[#1D2B5D]/70 uppercase tracking-wider mb-2">What do you want ambassadors to do?</label>
                   <textarea required rows={3} value={partnerForm.taskDetails} onChange={e => setPartnerForm({...partnerForm, taskDetails: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] resize-none outline-none transition-shadow" placeholder="e.g. Social media sharing, app downloads, campus events..." />
                </div>

                <div>
                   <label className="block text-xs font-bold text-[#1D2B5D]/70 uppercase tracking-wider mb-2">How did you hear about us?</label>
                   <select required value={partnerForm.source} onChange={e => setPartnerForm({...partnerForm, source: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] outline-none transition-shadow">
                      <option value="">Select Source</option>
                      <option value="Instagram">Instagram</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Word of mouth">Word of mouth</option>
                      <option value="Google">Google</option>
                      <option value="Other">Other</option>
                   </select>
                </div>

                <div className="pt-4">
                   <button type="submit" className="w-full py-4 bg-[#1D2B5D] text-white rounded-full font-bold text-[16px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-[#1A2B60] transition-all">Submit Application</button>
                </div>
             </form>
           )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto mb-32">
         <div className="grid md:grid-cols-3 gap-6">
            {[
               { quote: "CampBridge completely transformed our campus marketing. We reached 40 colleges in just 2 weeks with minimal effort.", author: "Priya M.", role: "Marketing Head", brand: "boAt" },
               { quote: "The AI verification is a game changer. We don't waste time manually checking proof anymore. Quality submissions only.", author: "Rohan S.", role: "Growth Manager", brand: "Zomato" },
               { quote: "We used to struggle with unmotivated ambassadors. The gamification and leaderboard keeps students hyper-active.", author: "Anjali K.", role: "Brand Manager", brand: "Spotify" },
            ].map((t, i) => (
               <div key={i} className="bg-white/80 backdrop-blur-xl border border-white/40 p-8 rounded-[2rem] shadow-lg relative flex flex-col justify-between hover:-translate-y-1 transition-transform">
                  <div>
                     <div className="flex gap-1 mb-5 text-[#DF79B5]">
                        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                     </div>
                     <p className="italic text-[#1D2B5D]/80 mb-6 leading-relaxed text-[15px]">"{t.quote}"</p>
                  </div>
                  <div>
                     <div className="font-bold text-[#1D2B5D] text-base">{t.author}</div>
                     <div className="text-[11px] font-bold text-[#D47FA9] uppercase tracking-wider">{t.role}, {t.brand}</div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Final Banner & Footer */}
      <section className="relative z-10 px-4 md:px-8 max-w-5xl mx-auto mb-16">
         <div className="bg-[#1D2B5D] border border-white/20 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#D47FA9]/20 to-transparent"></div>
            <div className="relative z-10">
               <h2 className="font-serif text-[2.2rem] md:text-[3rem] text-white mb-4 leading-tight">Your Brand Deserves to<br/>Be on Every Campus</h2>
               <p className="text-white/80 font-medium text-[16px] max-w-xl mx-auto mb-10 leading-relaxed">Join 50+ brands already running successful ambassador programs on CampBridge.</p>
               <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-[#1D2B5D] px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">Apply as a Partner</button>
            </div>
         </div>
      </section>

      <footer className="relative z-10 border-t border-white/20 pt-8 pb-12 text-center text-white/50 text-sm font-medium">
         © {new Date().getFullYear()} CampBridge. All rights reserved.
      </footer>
    </>
  );

  const renderChooseRole = () => (
    <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6 pb-24">
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-6 sm:p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl text-center">
         <button onClick={() => setCurrentView('landing')} className="flex items-center gap-2 mb-10 text-[#1D2B5D] font-bold text-sm hover:opacity-80 transition-opacity">← Back to Home</button>
         <Bird className="w-16 h-16 mx-auto mb-6 drop-shadow-sm opacity-95"/>
         <h2 className="font-serif text-3xl text-[#1D2B5D] mb-3">Welcome to CampBridge</h2>
         <p className="font-sans text-sm text-[#1D2B5D]/70 font-medium mb-10 px-4">Identify your role to proceed to the correct portal.</p>
         <div className="flex flex-col gap-4">
            <button onClick={() => setCurrentView('login')} className="w-full flex justify-center items-center gap-3 bg-white text-[#1D2B5D] px-8 py-4 rounded-xl font-bold text-[16px] shadow-sm border border-[#1D2B5D]/10 hover:shadow-md transition-all group">
              <User className="w-5 h-5 text-[#DF79B5] group-hover:scale-110 transition-transform" /> I am an Ambassador
            </button>
            <button onClick={() => setCurrentView('manager-login')} className="w-full flex justify-center items-center gap-3 bg-[#1D2B5D] text-white px-8 py-4 rounded-xl font-bold text-[16px] shadow-lg hover:shadow-xl transition-all group">
              <LayoutDashboard className="w-5 h-5 text-[#F9ECA5] group-hover:scale-110 transition-transform" /> I am a Manager
            </button>
         </div>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6 pb-24">
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-6 sm:p-8 rounded-[2rem] w-full max-w-md shadow-2xl">
         <button onClick={() => setCurrentView('landing')} className="flex items-center gap-2 mb-6 text-[#1D2B5D] font-bold text-sm hover:opacity-80 transition-opacity">← Back to Home</button>
         <div className="flex gap-2 p-1 bg-[#1D2B5D]/5 rounded-full mb-8">
            <button className="flex-1 bg-white shadow-sm rounded-full py-2 text-sm font-bold text-[#1D2B5D]">Sign Up</button>
            <button className="flex-1 rounded-full py-2 text-sm font-bold text-[#1D2B5D]/60 hover:text-[#1D2B5D] transition-colors">Login</button>
         </div>
         <div className="space-y-4 mb-8">
            <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Full Name" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] placeholder:text-[#1D2B5D]/40" />
            <input placeholder="College/University" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] placeholder:text-[#1D2B5D]/40" />
            <input placeholder="Email address" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] placeholder:text-[#1D2B5D]/40" />
            <input type="password" placeholder="Password" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] placeholder:text-[#1D2B5D]/40" />
         </div>
         <button onClick={() => setCurrentView('dashboard')} className="w-full bg-[#1D2B5D] text-white rounded-full py-3.5 font-bold shadow-[0_0_20px_rgba(29,43,93,0.3)] hover:shadow-[0_0_25px_rgba(29,43,93,0.5)] transition-all">Enter CampBridge</button>
      </div>
    </div>
  );

  const renderManagerLogin = () => (
    <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6 pb-24">
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-6 sm:p-8 rounded-[2rem] w-full max-w-md shadow-2xl">
         <button onClick={() => setCurrentView('landing')} className="flex items-center gap-2 mb-6 text-[#1D2B5D] font-bold text-sm hover:opacity-80 transition-opacity">← Back to Home</button>
         <div className="flex gap-2 p-1 bg-[#1D2B5D]/5 rounded-full mb-8">
            <button className="flex-1 rounded-full py-2 text-sm font-bold text-[#1D2B5D]/60 hover:text-[#1D2B5D] transition-colors">Login</button>
            <button className="flex-1 bg-white shadow-sm rounded-full py-2 text-sm font-bold text-[#1D2B5D]">Sign Up</button>
         </div>
         <div className="space-y-4 mb-8">
            <select value={managerCompanyName} onChange={(e) => setManagerCompanyName(e.target.value)} className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]">
               <option value="" disabled>Select a Brand</option>
               <option value="RedBull India">RedBull India</option>
               <option value="boAt">boAt</option>
               <option value="Spotify">Spotify</option>
               <option value="Nike">Nike</option>
               <option value="Zomato">Zomato</option>
               <option value="Nykaa">Nykaa</option>
               <option value="Figma">Figma</option>
               <option value="Duolingo">Duolingo</option>
               <option value="Notion">Notion</option>
               <option value="Apple">Apple</option>
            </select>
            <input placeholder="Email address" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] placeholder:text-[#1D2B5D]/40" />
            <input type="password" placeholder="Password" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] placeholder:text-[#1D2B5D]/40" />
         </div>
         <button onClick={() => setCurrentView('manager-dashboard')} className="w-full bg-[#1D2B5D] text-white rounded-full py-3.5 font-bold shadow-[0_0_20px_rgba(29,43,93,0.3)] hover:shadow-[0_0_25px_rgba(29,43,93,0.5)] transition-all">Enter as Manager</button>
      </div>
    </div>
  );

  const renderManagerDashboard = () => (
    <ManagerLayout activeTab="dashboard" setCurrentView={setCurrentView} companyName={managerCompanyName} initials={managerInitials}>
       {/* Set of 4 stats mapping */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Ambassadors', value: '142' },
            { label: 'Active Tasks', value: '8' },
            { label: 'Pending Reviews', value: '23' },
            { label: 'Points Awarded', value: '18,400' },
          ].map((s, idx) => (
             <div key={idx} className="bg-white/80 backdrop-blur-md border border-white/40 p-6 rounded-[1.5rem] shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-[#1D2B5D]/60 text-sm font-bold tracking-wider uppercase mb-2">{s.label}</div>
                <div className="font-serif text-4xl text-[#1D2B5D]">{s.value}</div>
             </div>
          ))}
       </div>

       {/* Reward Eligible Panel */}
       <div className="bg-white/90 backdrop-blur-md border border-white/40 rounded-[1.5rem] shadow-lg overflow-hidden mb-10 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#DF79B5] to-[#F9ECA5]"></div>
          <div className="flex-1">
             <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-[#DF79B5]" />
                <h3 className="font-serif text-xl text-[#1D2B5D]">Reward Eligible Ambassadors</h3>
             </div>
             <p className="text-sm font-medium text-[#1D2B5D]/60 mb-4">The following ambassadors have maintained Top 10 status for 3+ weeks. CampBridge will automatically dispatch their physical rewards.</p>
             <div className="flex flex-col gap-3">
                {[
                   { name: "Aarav Sharma", col: "IIT Bombay", weeks: 4 },
                   { name: "Neha Menon", col: "Christ University", weeks: 3 },
                ].map((amb, i) => (
                   <div key={i} className="flex items-center justify-between border border-[#1D2B5D]/10 rounded-xl p-3 bg-white/50">
                      <div>
                         <div className="font-bold text-[#1D2B5D] text-[15px]">{amb.name}</div>
                         <div className="text-xs font-medium text-[#1D2B5D]/60">{amb.col} • <span className="text-[#DF79B5]">{amb.weeks} Weeks in Top 10</span></div>
                      </div>
                      <button onClick={() => setCurrentView('manager-ambassadors')} className="text-xs font-bold text-[#1D2B5D] border-2 border-[#1D2B5D]/20 px-4 py-1.5 rounded-full hover:bg-[#1D2B5D]/5 transition-colors">
                         View Profile
                      </button>
                   </div>
                ))}
             </div>
          </div>
       </div>

       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="font-serif text-3xl text-white drop-shadow-sm">Active Tasks</h2>
          <button onClick={() => setCurrentView('manager-create-task')} className="bg-[#1D2B5D] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#1A2B60] transition-colors shadow-lg">
             + Create New Task
          </button>
       </div>

       <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-[1.5rem] shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                   <tr className="border-b border-white/40 bg-white/30">
                      <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Task Name</th>
                      <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Points</th>
                      <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Submissions</th>
                      <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Status</th>
                      <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase text-right">Action</th>
                   </tr>
                </thead>
                <tbody>
                   {managerTasks.map(t => (
                      <tr key={t.id} className="border-b border-white/20 hover:bg-white/40 transition-colors">
                         <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]">{t.title}</td>
                         <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]/70">{t.pts}</td>
                         <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]/70">{t.submissions}</td>
                         <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-md text-[11px] uppercase tracking-wider font-bold border ${t.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                               {t.status}
                            </span>
                         </td>
                         <td className="py-4 px-6 text-right">
                            <button onClick={() => setCurrentView('manager-submissions')} className="border-2 border-[#1D2B5D]/20 text-[#1D2B5D] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#1D2B5D]/5 transition-colors">
                               View
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </ManagerLayout>
  );

  const renderManagerCreateTask = () => (
    <ManagerLayout activeTab="tasks" setCurrentView={setCurrentView} companyName={managerCompanyName} initials={managerInitials}>
       <button onClick={() => setCurrentView('manager-dashboard')} className="flex items-center gap-2 mb-6 text-white font-bold text-sm drop-shadow-sm hover:opacity-80 transition-opacity">← Back to Dashboard</button>
       <div className="bg-white/90 backdrop-blur-xl border border-white/40 p-5 sm:p-8 rounded-[2rem] shadow-2xl max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl text-[#1D2B5D] mb-8">Create New Task</h1>
          
          <div className="space-y-6">
             <div>
                <label className="block text-sm font-bold text-[#1D2B5D] mb-2">Task Title</label>
                <input value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="w-full bg-white/50 border border-[#1D2B5D]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]" placeholder="e.g. Post Instagram Story" />
             </div>
             <div>
                <label className="block text-sm font-bold text-[#1D2B5D] mb-2">Description</label>
                <textarea rows={4} value={newTask.desc} onChange={e => setNewTask({...newTask, desc: e.target.value})} className="w-full bg-white/50 border border-[#1D2B5D]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]" placeholder="Clear instructions for ambassadors..." />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-bold text-[#1D2B5D] mb-2">Points Reward</label>
                   <input type="number" value={newTask.pts} onChange={e => setNewTask({...newTask, pts: parseInt(e.target.value)})} className="w-full bg-white/50 border border-[#1D2B5D]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-[#1D2B5D] mb-2">Deadline</label>
                   <input type="date" value={newTask.date} onChange={e => setNewTask({...newTask, date: e.target.value})} className="w-full bg-white/50 border border-[#1D2B5D]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]" />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-bold text-[#1D2B5D] mb-2">Difficulty</label>
                   <select value={newTask.diff} onChange={e => setNewTask({...newTask, diff: e.target.value})} className="w-full bg-white/50 border border-[#1D2B5D]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]">
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-[#1D2B5D] mb-2">Proof Required</label>
                   <select value={newTask.proof} onChange={e => setNewTask({...newTask, proof: e.target.value})} className="w-full bg-white/50 border border-[#1D2B5D]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]">
                      <option>Screenshot</option>
                      <option>Video</option>
                      <option>Both</option>
                   </select>
                </div>
             </div>

             <div className="flex gap-4 pt-6 border-t border-gray-100">
                <button onClick={() => setCurrentView('manager-dashboard')} className="flex-1 border-2 border-[#1D2B5D]/20 text-[#1D2B5D] rounded-full py-3.5 font-bold hover:bg-[#1D2B5D]/5 transition-colors">Cancel</button>
                <button onClick={() => {
                   setManagerTasks([{ id: Date.now(), title: newTask.title || 'Untitled Task', pts: newTask.pts, submissions: 0, status: 'Active' }, ...managerTasks]);
                   setNewTask({ title: '', desc: '', pts: 50, date: '', proof: 'Both', diff: 'Medium' });
                   setCurrentView('manager-dashboard');
                }} className="flex-1 bg-[#1D2B5D] text-white rounded-full py-3.5 font-bold shadow-[0_0_20px_rgba(29,43,93,0.3)] hover:shadow-[0_0_25px_rgba(29,43,93,0.5)] transition-all">Publish Task</button>
             </div>
          </div>
       </div>
    </ManagerLayout>
  );

  const renderManagerSubmissions = () => (
    <ManagerLayout activeTab="submissions" setCurrentView={setCurrentView} companyName={managerCompanyName} initials={managerInitials}>
       <h2 className="font-serif text-3xl text-white mb-6 drop-shadow-sm">Review Submissions</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {managerSubmissions.map(s => (
             <div key={s.id} className={`bg-white/90 backdrop-blur-md border p-5 rounded-[1.5rem] shadow-lg flex flex-col h-full transition-colors ${s.status === 'Approved' ? 'bg-green-50 border-green-200' : s.status === 'Rejected' ? 'bg-red-50 border-red-200' : 'border-white/40'}`}>
                <div className="flex justify-between items-start mb-3">
                   <div>
                      <div className="font-bold text-[#1D2B5D] text-lg">{s.name}</div>
                      <div className="text-xs font-medium text-[#1D2B5D]/60">{s.col}</div>
                   </div>
                   <div className="bg-[#1D2B5D]/5 text-[#1D2B5D] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">{s.time}</div>
                </div>
                
                <div className="mb-4">
                   <div className="text-xs font-bold text-[#1D2B5D]/60 uppercase tracking-wider mb-1">Task</div>
                   <div className="text-sm font-medium text-[#1D2B5D]">{s.task}</div>
                </div>

                <div className="w-full h-32 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400 text-sm font-bold uppercase tracking-widest border border-gray-300">
                   Proof Image
                </div>

                <div className="mt-auto">
                   <div className="flex items-center gap-2 mb-4">
                      <span className="bg-[#D47FA9]/10 text-[#D47FA9] text-xs font-bold px-2 py-1 rounded-md border border-[#D47FA9]/20">AI Score: {s.score}%</span>
                   </div>
                   
                   {s.status === 'Pending' ? (
                      <div className="flex gap-2">
                         <button onClick={() => {
                            setManagerSubmissions(managerSubmissions.map(sub => sub.id === s.id ? { ...sub, status: 'Approved' } : sub));
                         }} className="flex-1 bg-green-500/10 text-green-700 hover:bg-green-500/20 border border-green-500/20 rounded-full py-2 font-bold text-sm transition-colors">Approve</button>
                         <button onClick={() => {
                            setManagerSubmissions(managerSubmissions.map(sub => sub.id === s.id ? { ...sub, status: 'Rejected' } : sub));
                         }} className="flex-1 bg-red-500/10 text-red-700 hover:bg-red-500/20 border border-red-500/20 rounded-full py-2 font-bold text-sm transition-colors">Reject</button>
                      </div>
                   ) : (
                      <div className={`text-center font-bold text-sm py-2 rounded-full border ${s.status === 'Approved' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                         {s.status}
                      </div>
                   )}
                </div>
             </div>
          ))}
       </div>
    </ManagerLayout>
  );

  const renderManagerAmbassadors = () => {
    const filteredAmbassadors = managerAmbassadors.filter(a => a.name.toLowerCase().includes(ambaSearch.toLowerCase()));
    
    return (
      <ManagerLayout activeTab="ambassadors" setCurrentView={setCurrentView} companyName={managerCompanyName} initials={managerInitials}>
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="font-serif text-3xl text-white drop-shadow-sm">Ambassadors Directory</h2>
            <input 
               value={ambaSearch}
               onChange={(e) => setAmbaSearch(e.target.value)}
               placeholder="Search by name..." 
               className="w-full sm:w-64 bg-white/80 border border-white/60 rounded-full px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] placeholder:text-[#1D2B5D]/40" 
            />
         </div>

         <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-[1.5rem] shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                     <tr className="border-b border-white/40 bg-white/30">
                        <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Name</th>
                        <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">College</th>
                        <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Points</th>
                        <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Tasks Done</th>
                        <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Joined</th>
                        <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredAmbassadors.map(a => (
                        <tr key={a.id} className="border-b border-white/20 hover:bg-white/40 transition-colors">
                           <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]">{a.name}</td>
                           <td className="py-4 px-6 text-sm font-medium text-[#1D2B5D]/70">{a.col}</td>
                           <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]">{a.pts}</td>
                           <td className="py-4 px-6 text-sm font-bold text-[#D47FA9]">{a.done}</td>
                           <td className="py-4 px-6 text-sm font-medium text-[#1D2B5D]/70">{a.date}</td>
                           <td className="py-4 px-6 text-right">
                              <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold border ${a.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                 {a.status}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </ManagerLayout>
    );
  };

  const renderManagerTasks = () => (
    <ManagerLayout activeTab="tasks" setCurrentView={setCurrentView} companyName={managerCompanyName} initials={managerInitials}>
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="font-serif text-3xl text-white drop-shadow-sm">All Tasks</h2>
          <button onClick={() => setCurrentView('manager-create-task')} className="bg-[#1D2B5D] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#1A2B60] transition-colors shadow-lg">
             + Create New Task
          </button>
       </div>

       <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-[1.5rem] shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                   <tr className="border-b border-white/40 bg-white/30">
                      <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Task Name</th>
                      <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Points</th>
                      <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Submissions</th>
                      <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Status</th>
                      <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase text-right">Action</th>
                   </tr>
                </thead>
                <tbody>
                   {managerTasks.map(t => (
                      <tr key={t.id} className="border-b border-white/20 hover:bg-white/40 transition-colors">
                         <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]">{t.title}</td>
                         <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]/70">{t.pts}</td>
                         <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]/70">{t.submissions}</td>
                         <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-md text-[11px] uppercase tracking-wider font-bold border ${t.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                               {t.status}
                            </span>
                         </td>
                         <td className="py-4 px-6 text-right">
                            <button onClick={() => setCurrentView('manager-submissions')} className="border-2 border-[#1D2B5D]/20 text-[#1D2B5D] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#1D2B5D]/5 transition-colors">
                               View
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </ManagerLayout>
  );

  const renderDashboard = () => (
    <DashboardLayout activeTab="dashboard" setCurrentView={setCurrentView} displayName={displayName} initials={initials}>

      {/* My Brand Banner */}
      <div className="bg-[#1D2B5D] rounded-[1.5rem] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 shadow-xl relative overflow-hidden">
         <div className="relative z-10 flex items-center gap-5">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center font-bold text-2xl text-[#1D2B5D] shadow-md">RB</div>
            <div>
               <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-serif text-2xl text-white">RedBull India</h2>
                  <span className="bg-green-500/20 text-green-300 text-xs px-2.5 py-1 rounded-full font-bold border border-green-500/30">Active Member</span>
               </div>
               <p className="text-white/70 text-sm">Vitalizes Body and Mind.</p>
            </div>
         </div>
         <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div className="bg-white/80 backdrop-blur-md border border-white/40 p-6 rounded-[1.5rem] shadow-lg">
            <div className="text-[#1D2B5D]/60 text-sm font-bold tracking-wider uppercase mb-2">Points Earned</div>
            <div className="font-serif text-4xl text-[#1D2B5D]">340</div>
         </div>
         <div className="bg-white/80 backdrop-blur-md border border-white/40 p-6 rounded-[1.5rem] shadow-lg">
            <div className="text-[#1D2B5D]/60 text-sm font-bold tracking-wider uppercase mb-2">Tasks Completed</div>
            <div className="font-serif text-4xl text-[#1D2B5D]">7</div>
         </div>
         <div className="bg-white/80 backdrop-blur-md border border-white/40 p-6 rounded-[1.5rem] shadow-lg">
            <div className="text-[#1D2B5D]/60 text-sm font-bold tracking-wider uppercase mb-2">Current Rank</div>
            <div className="font-serif text-4xl text-[#1D2B5D]">#14</div>
         </div>
      </div>
      
      <h2 className="font-serif text-2xl text-white mb-6 drop-shadow-sm">My Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
         {[
           { id: 1, co: "RedBull India", pts: 50, diff: "Easy", date: "Due: 30 Apr 2026", title: "Post Campus Story", desc: "Share a story with a RedBull can on campus.", status: 'Not Started', expired: false },
           { id: 2, co: "RedBull India", pts: 120, diff: "Medium", date: "Due: 02 May 2026", title: "Study Session Recap", desc: "Post a reel of your late night study session.", status: 'Not Started', expired: false },
           { id: 3, co: "RedBull India", pts: 200, diff: "Hard", date: "Due: 15 May 2026", title: "Host Event Stalls", desc: "Set up a sampling bin at the main quad.", status: 'Not Started', expired: false },
           { id: 4, co: "RedBull India", pts: 80, diff: "Medium", date: "Due: 10 Apr 2026", title: "Midterm Giveaway", desc: "Distribute 50 cans during midterms week.", status: 'Not Started', expired: true },
         ].map(t => (
            <div key={t.id} className="bg-white/90 backdrop-blur-md border border-white/40 p-5 rounded-[1.5rem] shadow-lg flex flex-col h-full hover:-translate-y-1 transition-transform relative">
               <div className="flex justify-between items-start mb-3">
                  <div className="text-[11px] font-bold text-[#D47FA9] uppercase tracking-wider">{t.co}</div>
                  <div className="bg-[#1D2B5D]/5 text-[#1D2B5D] px-2 py-1 rounded-md text-[10px] font-bold uppercase">{t.diff}</div>
               </div>
               <h3 className="font-serif text-lg text-[#1D2B5D] mb-1.5 leading-tight line-clamp-1">{t.title}</h3>
               <p className="text-[#1D2B5D]/60 text-xs mb-4 line-clamp-2 min-h-[32px]">{t.desc}</p>
               
               <div className="text-[11px] text-[#1D2B5D]/80 font-bold mb-4 bg-gray-100/80 inline-block px-2 py-1 rounded-md w-fit">
                 {t.date}
               </div>

               <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="font-bold text-[#1D2B5D]">{t.pts} pts</span>
                  {t.expired ? (
                    <span className="bg-gray-100 text-gray-500 text-xs px-4 py-2 rounded-full font-bold">Expired</span>
                  ) : (
                    <button onClick={() => { setSelectedTask(t); setAiState('idle'); setCurrentView('task-detail'); }} className="bg-[#1D2B5D] text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-[#1A2B60] shadow-sm transition-colors">Start Task</button>
                  )}
               </div>
            </div>
         ))}
      </div>

      <h2 className="font-serif text-2xl text-white mb-6 drop-shadow-sm">Recent Submissions</h2>
      <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-[1.5rem] shadow-lg overflow-hidden">
         <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
               <tr className="border-b border-white/40 bg-white/30">
                  <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Task</th>
                  <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Submitted On</th>
                  <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">AI Score</th>
                  <th className="py-4 px-6 text-xs font-bold tracking-wider text-[#1D2B5D]/60 uppercase">Status</th>
               </tr>
            </thead>
            <tbody>
               <tr className="border-b border-white/20 hover:bg-white/40 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]">Library Wings Challenge</td>
                  <td className="py-4 px-6 text-sm text-[#1D2B5D]/70">24 Apr 2026</td>
                  <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]">94%</td>
                  <td className="py-4 px-6"><span className="bg-green-100 text-green-700 border border-green-200 px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider font-bold">Approved</span></td>
               </tr>
               <tr className="hover:bg-white/40 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]">Freshers Week Setup</td>
                  <td className="py-4 px-6 text-sm text-[#1D2B5D]/70">22 Apr 2026</td>
                  <td className="py-4 px-6 text-sm font-bold text-[#1D2B5D]/40">--</td>
                  <td className="py-4 px-6"><span className="bg-yellow-100 text-yellow-700 border border-yellow-200 px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider font-bold">In Review</span></td>
               </tr>
            </tbody>
         </table>
      </div>
    </DashboardLayout>
  );

  const renderTaskDetail = () => (
    <DashboardLayout activeTab="dashboard" setCurrentView={setCurrentView} displayName={displayName} initials={initials}>
      <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2 mb-6 text-white font-bold text-sm drop-shadow-sm hover:opacity-80 transition-opacity">← Back to Dashboard</button>
      <div className="bg-white/90 backdrop-blur-xl border border-white/40 p-5 sm:p-8 rounded-[2rem] shadow-2xl max-w-2xl mx-auto">
         <div className="flex justify-between items-start mb-6">
            <div>
               <div className="text-sm font-bold text-[#D47FA9] mb-1">{selectedTask?.co || 'Task'}</div>
               <h1 className="font-serif text-3xl text-[#1D2B5D] leading-tight">{selectedTask?.title || 'Task Details'}</h1>
            </div>
            <div className="bg-[#F9ECA5] text-[#1D2B5D] px-4 py-2 rounded-full font-bold text-sm shadow-sm flex flex-col items-end">
               <span>{selectedTask?.pts || 50} Points</span>
            </div>
         </div>
         
         <div className="flex items-center gap-4 mb-6 pt-4 border-t border-gray-100">
            <div className="text-xs font-bold text-[#1D2B5D]/60 uppercase tracking-wider">Deadline:</div>
            <div className="text-sm font-bold text-[#1D2B5D] bg-gray-100 px-3 py-1 rounded-md">{selectedTask?.date || 'Due: 30 Apr 2026'}</div>
         </div>

         <p className="text-[#1D2B5D]/80 mb-8 leading-relaxed text-[15px]">
            {selectedTask?.desc || 'Please complete the requirements as specified. Ensure your proof clearly demonstrates completion.'} Make sure the content is visible and adheres to brand guidelines.
         </p>

         {aiState === 'idle' && (
           <>
             <div 
               className="border-2 border-dashed border-[#1D2B5D]/20 rounded-2xl p-10 text-center mb-6 bg-[#1D2B5D]/5 cursor-pointer hover:bg-[#1D2B5D]/10 transition-colors relative overflow-hidden"
               onClick={() => fileInputRef.current?.click()}
             >
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                />
                {proofImage ? (
                  <img src={proofImage} alt="Proof" className="absolute inset-0 w-full h-full object-cover p-2 rounded-2xl" />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-white text-[#1D2B5D] flex items-center justify-center font-bold text-xl mx-auto mb-3"><UploadCloud className="w-6 h-6 stroke-[2.5]" /></div>
                    <div className="font-bold text-[#1D2B5D]">Drop screenshot or video here — or click to browse</div>
                    <div className="text-xs text-[#1D2B5D]/60 mt-2">Max 50MB</div>
                  </>
                )}
             </div>
             
             {proofImage && <button onClick={() => setProofImage(null)} className="text-xs font-bold text-red-500 mb-6 block text-center w-full">Remove Media</button>}
             
             <textarea placeholder="Describe what you did..." className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5] min-h-[100px] mb-6 text-[#1D2B5D] placeholder:text-[#1D2B5D]/40" />
             
             <button 
                onClick={handleAIReview} 
                disabled={!proofImage}
                className={`w-full text-white rounded-full py-4 font-bold shadow-lg transition-all ${proofImage ? 'bg-[#1D2B5D] hover:shadow-xl hover:-translate-y-0.5' : 'bg-[#1D2B5D]/50 cursor-not-allowed'}`}
             >
                Submit for AI Review
             </button>
           </>
         )}

         {aiState === 'analyzing' && (
           <div className="py-16 text-center">
              <div className="w-12 h-12 border-4 border-[#1D2B5D]/20 border-t-[#D47FA9] rounded-full animate-spin mx-auto mb-6"></div>
              <div className="font-serif text-xl text-[#1D2B5D] typewriter-text inline-block transform-none min-w-[320px] text-left">Scanning proof... Analyzing content... Generating questions...</div>
           </div>
         )}

         {aiState === 'questions' && aiFeedback && (
           <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100 mb-6">
              <h3 className="font-serif text-xl text-[#1D2B5D] mb-6 flex items-center gap-2">
                 <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">🤖</span>
                 AI Verification Follow-up
              </h3>
              <div className="space-y-6 mb-8">
                 {aiFeedback.questions.map((q: string, idx: number) => (
                   <div key={idx}>
                      <label className="block text-sm font-bold text-[#1D2B5D] mb-3">{q}</label>
                      <input autoFocus={idx === 0} placeholder="Your answer..." className="w-full bg-white border border-[#1D2B5D]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-[#1D2B5D]" />
                   </div>
                 ))}
              </div>
              <button onClick={() => {
                setAiState('analyzing-2');
                setTimeout(() => setAiState('done'), 2000);
              }} className="bg-[#29426D] text-white px-8 py-3 rounded-full font-bold text-[15px] shadow-sm hover:shadow-md transition-all">Submit Answers</button>
           </div>
         )}

         {aiState === 'analyzing-2' && (
           <div className="py-16 text-center">
              <div className="w-12 h-12 border-4 border-[#1D2B5D]/20 border-t-[#29426D] rounded-full animate-spin mx-auto mb-6"></div>
              <div className="font-serif text-xl text-[#1D2B5D] typewriter-text inline-block transform-none">Finalizing review...</div>
           </div>
         )}

         {aiState === 'done' && aiFeedback && (
           <div className="text-center py-10">
              {aiFeedback.approved ? (
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                   <XCircle className="w-12 h-12 text-red-600" />
                </div>
              )}
              
              <h3 className="font-serif text-[28px] text-[#1D2B5D] mb-2 font-medium">AI Score: {aiFeedback.score}%</h3>
              
              {aiFeedback.approved ? (
                <>
                  <p className="text-[#1D2B5D]/70 mb-6 text-[15px]">Submitted for review.</p>
                  <div className="font-bold text-lg text-yellow-600 mb-10 bg-yellow-50 inline-block px-6 py-2 rounded-xl border border-yellow-200">
                     +{selectedTask?.pts || 50} Points Pending Verification
                  </div>
                </>
              ) : (
                <p className="text-[#1D2B5D]/70 mb-10 text-[15px]">The submission didn't meet the requirements for this task.</p>
              )}
              
              <div>
                 <button onClick={() => { setAiState('idle'); setProofImage(null); setCurrentView('dashboard'); }} className="bg-[#1D2B5D] text-white rounded-full px-10 py-3.5 font-bold hover:bg-[#1A2B60] transition-colors shadow-lg hover:-translate-y-0.5">Back to Tasks</button>
              </div>
           </div>
         )}
      </div>
    </DashboardLayout>
  );

  const renderBrowseBrands = () => (
    <DashboardLayout activeTab="browse-brands" setCurrentView={setCurrentView} displayName={displayName} initials={initials}>
      <h1 className="font-serif text-3xl text-white mb-2 drop-shadow-sm">Browse Brands</h1>
      <p className="text-white/80 mb-8 max-w-xl">Apply to become an ambassador for top brands. You can only actively represent one brand at a time, but you can apply to many.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {[
           { id: 10, name: "Nike", desc: "Just Do It. Bring Nike to your campus via run clubs and training events.", tasks: 12 },
           { id: 11, name: "Spotify", desc: "Music for everyone. Host listening parties and share Premium deals.", tasks: 8 },
           { id: 12, name: "Zomato", desc: "Never have a bad meal. Get students to order late-night bites.", tasks: 15 },
           { id: 13, name: "boAt", desc: "Plug into Nirvana. Promote audio gear across university fests.", tasks: 5 },
         ].map(b => (
            <div key={b.id} className="bg-white/90 backdrop-blur-md border border-white/40 p-6 rounded-[1.5rem] shadow-lg flex flex-col h-full hover:shadow-xl transition-shadow">
               <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center font-bold text-xl text-[#1D2B5D] mb-4 border border-gray-200">{b.name[0]}</div>
               <h3 className="font-serif text-xl text-[#1D2B5D] mb-2">{b.name}</h3>
               <p className="text-[#1D2B5D]/70 text-sm mb-6 flex-grow">{b.desc}</p>
               <div className="flex items-center justify-between mb-5">
                  <div className="text-xs font-bold text-[#D47FA9] bg-[#D47FA9]/10 px-2.5 py-1 rounded-md">{b.tasks} Active Tasks</div>
               </div>
               {appliedBrands.includes(b.id) ? (
                 <button disabled className="w-full bg-[#1D2B5D]/10 text-[#1D2B5D] py-3 rounded-full font-bold text-sm cursor-not-allowed">Application Pending</button>
               ) : (
                 <button onClick={() => setApplyingToBrand(b)} className="w-full bg-[#1D2B5D] text-white py-3 rounded-full font-bold text-sm hover:bg-[#1A2B60] transition-colors shadow-md hover:shadow-lg">Apply Now</button>
               )}
            </div>
         ))}
      </div>

      {applyingToBrand && (
         <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-[100] flex justify-end">
            <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right relative overflow-y-auto">
               <button onClick={() => setApplyingToBrand(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800"><XCircle className="w-6 h-6" /></button>
               <div className="p-5 sm:p-8 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="font-serif text-2xl text-[#1D2B5D] mb-1">Apply to {applyingToBrand.name}</h2>
                  <p className="text-sm text-gray-500">Submit your details to review.</p>
               </div>
               <div className="p-5 sm:p-8 flex-1 flex flex-col gap-6">
                  <div>
                     <label className="block text-sm font-bold text-[#1D2B5D] mb-2">Why do you want to represent this brand?</label>
                     <textarea rows={4} className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5]" placeholder="Your answer..."></textarea>
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#1D2B5D] mb-2">Your College / University</label>
                     <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5]" placeholder="e.g. Stanford University" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#1D2B5D] mb-2">Social Media Handle (IG / TikTok)</label>
                     <input type="text" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5]" placeholder="@username" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-[#1D2B5D] mb-2">Availability</label>
                     <select className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]">
                        <option>Part-time (5-10 hrs/week)</option>
                        <option>Full-time (15+ hrs/week)</option>
                     </select>
                  </div>
               </div>
               <div className="p-5 sm:p-8 border-t border-gray-100 mt-auto">
                  <button onClick={() => {
                     setAppliedBrands([...appliedBrands, applyingToBrand.id]);
                     setToastMessage('Application sent! You\'ll hear back soon.');
                     setTimeout(() => setToastMessage(''), 4000);
                     setApplyingToBrand(null);
                  }} className="w-full bg-[#1D2B5D] text-white py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Send Application</button>
               </div>
            </div>
         </div>
      )}
    </DashboardLayout>
  );

  const renderRewards = () => {
    return (
      <DashboardLayout activeTab="rewards" setCurrentView={setCurrentView} displayName={displayName} initials={initials}>
        <div className="max-w-4xl mx-auto">
           <h1 className="font-serif text-3xl text-white mb-2 drop-shadow-sm">Rewards & Badges</h1>
           <p className="text-white/80 mb-8 max-w-xl">Track your streaks, earn exclusive CampBridge goodies, and view your badge history.</p>
           
           {/* Section A: Reward Status */}
           <div className="bg-white/90 backdrop-blur-xl border border-white/40 p-6 sm:p-8 rounded-[2rem] shadow-2xl mb-8 relative overflow-hidden group">
             {/* Hidden trigger for testing toasts */}
             <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => triggerToast("🎉 You've entered the Global Top 10!")} className="text-[10px] bg-white/50 px-2 py-1 rounded">Test Toast 1</button>
                <button onClick={() => triggerToast("🔥 2 weeks in Top 10 — one more to unlock goodies!")} className="text-[10px] bg-white/50 px-2 py-1 rounded">Test Toast 2</button>
                <button onClick={() => triggerToast("🎁 You're now eligible for CampBridge Goodies! Go to Rewards to claim.")} className="text-[10px] bg-white/50 px-2 py-1 rounded">Test Toast 3</button>
             </div>

             {isRewardEligible && (
               <div className="absolute inset-0 bg-gradient-to-r from-[#DF79B5]/10 to-[#F9ECA5]/10 animate-pulse pointer-events-none"></div>
             )}
             <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
               <div className="w-full md:w-auto flex-1">
                 <h2 className="font-bold text-xl text-[#1D2B5D] mb-2">My Reward Status</h2>
                 <p className="text-[#1D2B5D]/70 text-sm font-medium mb-6">You've been in the Top 10 for {rewardStreak} consecutive weeks.</p>
                 
                 <div className="w-full bg-[#1A2B60]/5 rounded-full h-3 mb-2 overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }} 
                     animate={{ width: `${Math.min((rewardStreak / 3) * 100, 100)}%` }} 
                     transition={{ duration: 1, ease: "easeOut" }}
                     className="bg-gradient-to-r from-[#DF79B5] to-[#F9ECA5] h-full rounded-full"
                   />
                 </div>
                 <div className="flex justify-between text-xs font-bold text-[#1D2B5D]/50 mb-1">
                   <span>0 Weeks</span>
                   <span>3 Weeks</span>
                 </div>
                 <p className="text-xs font-bold text-[#D47FA9]">
                   {isRewardEligible ? "🎉 You're eligible for CampBridge Goodies!" : `${3 - rewardStreak} more week${3 - rewardStreak > 1 ? 's' : ''} to unlock goodies!`}
                 </p>
               </div>
               
               {isRewardEligible && (
                 <button 
                   onClick={() => setShowClaimModal(true)} 
                   disabled={rewardsClaimed}
                   className={`shrink-0 px-6 py-3 rounded-full font-bold text-sm shadow-md transition-all ${rewardsClaimed ? 'bg-[#1D2B5D]/10 text-[#1D2B5D]/40 cursor-not-allowed' : 'bg-[#1D2B5D] text-white hover:-translate-y-1 hover:shadow-lg'}`}
                 >
                   {rewardsClaimed ? 'Reward Claimed' : 'Claim Reward'}
                 </button>
               )}
             </div>
           </div>

           {/* Claim Modal */}
           <AnimatePresence>
             {showClaimModal && (
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }}
                 className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1D2B5D]/60 backdrop-blur-sm"
               >
                 <motion.div 
                   initial={{ scale: 0.95, y: 20 }} 
                   animate={{ scale: 1, y: 0 }}
                   exit={{ scale: 0.95, y: 20 }}
                   className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
                 >
                   <button onClick={() => setShowClaimModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors">
                     <XCircle className="w-6 h-6" />
                   </button>
                   <div className="text-center mb-6">
                     <div className="mx-auto w-16 h-16 bg-[#DF79B5]/10 flex items-center justify-center rounded-full mb-4">
                       <Gift className="w-8 h-8 text-[#DF79B5]" />
                     </div>
                     <h2 className="font-serif text-2xl text-[#1D2B5D] mb-2">Claim Your CampBridge Goodies</h2>
                     <p className="text-sm text-[#1D2B5D]/60 font-medium">Please provide your delivery details below.</p>
                   </div>
                   <form onSubmit={(e) => { e.preventDefault(); setShowClaimModal(false); setRewardsClaimed(true); triggerToast('✅ Details received! Your goodies are on their way.'); }} className="space-y-4">
                     <input required placeholder="Full Name" value={claimForm.name} onChange={(e) => setClaimForm({...claimForm, name: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]" />
                     <input required placeholder="Phone Number" value={claimForm.phone} onChange={(e) => setClaimForm({...claimForm, phone: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]" />
                     <textarea required rows={3} placeholder="Full Delivery Address" value={claimForm.address} onChange={(e) => setClaimForm({...claimForm, address: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D] resize-none" />
                     <input required placeholder="Pin Code" value={claimForm.pin} onChange={(e) => setClaimForm({...claimForm, pin: e.target.value})} className="w-full bg-[#1D2B5D]/5 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#DF79B5] text-[#1D2B5D]" />
                     <button type="submit" className="w-full py-4 bg-[#1D2B5D] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-[#1A2B60] transition-colors mt-2">
                       Send My Details
                     </button>
                   </form>
                 </motion.div>
               </motion.div>
             )}
           </AnimatePresence>

           {/* Section B: Badges Earned */}
           <h2 className="font-serif text-2xl text-white mb-4 drop-shadow-sm">Your Badges</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[
                 { id: 1, name: "First Steps", desc: "Completed first task", icon: <Star className="w-8 h-8 text-green-500" />, earned: true, date: "Oct 12" },
                 { id: 2, name: "Top 10", desc: "Reached global top 10", icon: <Trophy className="w-8 h-8 text-[#DF79B5]" />, earned: true, date: "Oct 19" },
                 { id: 3, name: "Streak Master", desc: "7 day activity streak", icon: <History className="w-8 h-8 text-orange-500" />, earned: true, date: "Oct 22" },
                 { id: 4, name: "Star Performer", desc: "Top 3 in a week", icon: <Award className="w-8 h-8 text-[#F9ECA5]" />, earned: false, date: "" },
                 { id: 5, name: "Brand Champion", desc: "Completed all tasks for a brand", icon: <Medal className="w-8 h-8 text-purple-500" />, earned: false, date: "" },
              ].map(b => (
                 <motion.div 
                   key={b.id}
                   whileHover={b.earned ? { y: -5 } : {}}
                   className={`p-5 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${b.earned ? 'bg-white/90 border-white/50 shadow-xl' : 'bg-white/40 border-white/20 grayscale opacity-60'}`}
                 >
                    <div className="mb-3 relative">
                       {b.icon}
                       {!b.earned && <div className="absolute -bottom-2 -right-2 bg-gray-200 text-gray-500 rounded-full p-1 border border-white"><Lock className="w-3 h-3" /></div>}
                    </div>
                    <div className="font-bold text-[#1D2B5D] text-sm mb-1">{b.name}</div>
                    <div className="text-[10px] text-[#1D2B5D]/60 leading-tight mb-2 h-6">{b.desc}</div>
                    {b.earned && <div className="text-[9px] font-bold text-[#D47FA9] uppercase tracking-wider">{b.date}</div>}
                 </motion.div>
              ))}
           </div>

           {/* Section C: Points History */}
           <div className="bg-white/90 backdrop-blur-xl border border-white/40 p-6 sm:p-8 rounded-[2rem] shadow-2xl">
              <h2 className="font-serif text-2xl text-[#1D2B5D] mb-6">Points History</h2>
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-gray-200">
                          <th className="pb-3 text-xs font-bold uppercase tracking-wider text-[#1D2B5D]/50 px-2">Task</th>
                          <th className="pb-3 text-xs font-bold uppercase tracking-wider text-[#1D2B5D]/50 px-2">Brand</th>
                          <th className="pb-3 text-xs font-bold uppercase tracking-wider text-[#1D2B5D]/50 px-2">Points</th>
                          <th className="pb-3 text-xs font-bold uppercase tracking-wider text-[#1D2B5D]/50 px-2">Date</th>
                          <th className="pb-3 text-xs font-bold uppercase tracking-wider text-[#1D2B5D]/50 px-2">Status</th>
                       </tr>
                    </thead>
                    <tbody className="text-sm">
                       {[
                          { task: "Instagram Reel for Campaign", brand: "RedBull India", pts: "+200", date: "Oct 23, 2026", status: "Approved" },
                          { task: "Campus Flyers Distribution", brand: "RedBull India", pts: "+150", date: "Oct 21, 2026", status: "Approved" },
                          { task: "Weekly Feedback Survey", brand: "RedBull India", pts: "+50", date: "Oct 19, 2026", status: "Approved" },
                          { task: "Host a Mini Event", brand: "RedBull India", pts: "+500", date: "Oct 15, 2026", status: "Approved" },
                          { task: "LinkedIn Post", brand: "Spotify", pts: "+100", date: "Oct 10, 2026", status: "Approved" },
                          { task: "App Review & Rating", brand: "Spotify", pts: "+50", date: "Oct 08, 2026", status: "Approved" },
                          { task: "Sign up 5 friends", brand: "Notion", pts: "+150", date: "Oct 05, 2026", status: "Approved" },
                          { task: "Welcome Bonus", brand: "CampBridge", pts: "+100", date: "Oct 01, 2026", status: "Approved" },
                       ].map((row, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                             <td className="py-3 px-2 font-bold text-[#1D2B5D]">{row.task}</td>
                             <td className="py-3 px-2 font-medium text-[#1D2B5D]/70">{row.brand}</td>
                             <td className="py-3 px-2 font-bold text-[#DF79B5]">{row.pts}</td>
                             <td className="py-3 px-2 text-[#1D2B5D]/50 text-[13px]">{row.date}</td>
                             <td className="py-3 px-2">
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{row.status}</span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
                 <div className="flex justify-end pt-4 pr-2">
                    <div className="text-right">
                       <span className="text-xs font-bold text-[#1D2B5D]/50 uppercase tracking-widest mr-4">Total Points</span>
                       <span className="text-xl font-bold text-[#1D2B5D]">1,300</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </DashboardLayout>
    );
  };

  const renderLeaderboard = () => {
    const nationalLeaderboard = [
       { r: 1, name: "Aarav Sharma", col: "IIT Bombay", pts: "12,450", badges: 14, brand: "RedBull India", streak: 4 },
       { r: 2, name: "Riya Patel", col: "BITS Pilani", pts: "11,200", badges: 12, brand: "Spotify", streak: 3 },
       { r: 3, name: "Karan Singh", col: "DU - SRCC", pts: "9,850", badges: 10, brand: "Nike", streak: 1 },
       { r: 4, name: "Ananya Desai", col: "IIM Ahmedabad", pts: "8,900", badges: 9, brand: "Apple", streak: 2 },
       { r: 5, name: "Vikram Reddy", col: "NIT Trichy", pts: "8,600", badges: 9, brand: "Notion", streak: 2 },
       { r: 6, name: "Priya Gupta", col: "St. Xavier's Mumbai", pts: "8,450", badges: 8, brand: "Figma", streak: 0 },
       { r: 7, name: "Rahul Verma", col: "IIT Delhi", pts: "8,200", badges: 7, brand: "Duolingo", streak: 3 },
       { r: 8, name: "Neha Menon", col: "Christ University", pts: "7,900", badges: 7, brand: "RedBull India", streak: 1 },
       { r: 9, name: "Aditya Kumar", col: "VIT Vellore", pts: "7,500", badges: 5, brand: "Notion", streak: 0 },
       { r: 10, name: "Kriti Agarwal", col: "Manipal University", pts: "7,100", badges: 5, brand: "Spotify", streak: 0 },
       { r: 14, name: displayName, col: "Your College", pts: "6,340", badges: 4, brand: "RedBull India", me: true, streak: 0 },
    ];

    const brandLeaderboard = [
       { r: 1, name: "Aarav Sharma", col: "IIT Bombay", pts: "12,450", badges: 14, brand: "RedBull India", streak: 4 },
       { r: 2, name: "Neha Menon", col: "Christ University", pts: "7,900", badges: 7, brand: "RedBull India", streak: 1 },
       { r: 3, name: displayName, col: "Your College", pts: "6,340", badges: 4, brand: "RedBull India", me: true, streak: 0 },
       { r: 4, name: "Rohan Das", col: "SRM University", pts: "5,200", badges: 3, brand: "RedBull India", streak: 0 },
       { r: 5, name: "Ishita Jain", col: "NMIMS Mumbai", pts: "4,800", badges: 2, brand: "RedBull India", streak: 0 },
    ];

    const currentData = leaderboardTab === 'national' ? nationalLeaderboard : brandLeaderboard;

    const renderRank = (r: number) => {
        if (r === 1) return <span className="flex items-center gap-1.5"><span className="text-2xl">👑</span></span>;
        if (r === 2) return <span className="flex items-center gap-1.5"><span className="text-2xl">🥈</span></span>;
        if (r === 3) return <span className="flex items-center gap-1.5"><span className="text-2xl">🥉</span></span>;
        return <span className="font-bold text-[#1D2B5D]/60 w-8 text-center">#{r}</span>;
    };

    return (
      <DashboardLayout activeTab="leaderboard" setCurrentView={setCurrentView} displayName={displayName} initials={initials}>
        <div className="bg-white/90 backdrop-blur-xl border border-white/40 p-5 sm:p-8 rounded-[2rem] shadow-2xl max-w-3xl mx-auto">
           <h1 className="font-serif text-3xl text-[#1D2B5D] mb-8">Leaderboard</h1>
           
           <div className="flex gap-2 p-1.5 bg-[#1D2B5D]/5 rounded-full mb-8 max-w-sm">
              <button 
                onClick={() => setLeaderboardTab('national')}
                className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-colors ${leaderboardTab === 'national' ? 'bg-white shadow-sm text-[#1D2B5D]' : 'text-[#1D2B5D]/60 hover:text-[#1D2B5D]'}`}
              >
                Overall
              </button>
              <button 
                onClick={() => setLeaderboardTab('brand')}
                className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-colors px-4 ${leaderboardTab === 'brand' ? 'bg-white shadow-sm text-[#1D2B5D]' : 'text-[#1D2B5D]/60 hover:text-[#1D2B5D]'}`}
              >
                My Brand
              </button>
           </div>
           
           <div className="space-y-3">
              {currentData.map((u: any) => {
                 const isTop10 = u.r <= 10;
                 const isRewardEligible = u.streak >= 3;
                 return (
                 <div key={u.r} className={`flex items-center justify-between p-4.5 rounded-2xl border ${u.me ? 'bg-blue-50/80 border-blue-200 shadow-sm' : 'bg-white/50 border-white/40 hover:bg-white transition-colors'} ${isTop10 ? 'border-l-4 border-l-[#F9ECA5] bg-[#F9ECA5]/5' : ''}`}>
                    <div className="flex items-center gap-5 w-1/2 min-w-max">
                       <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold font-serif text-[15px] shrink-0 ${u.r <= 3 ? 'bg-[#F9ECA5] text-[#1D2B5D] shadow-sm' : 'bg-[#1A2B60]/5 text-[#1D2B5D]'}`}>
                          {renderRank(u.r)}
                       </div>
                       <div>
                          <div className="font-bold text-[#1D2B5D] text-[15px] flex items-center gap-2 mb-0.5">
                             {u.name} {u.me && <span className="bg-[#1D2B5D] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">You</span>}
                             {isRewardEligible && <Gift className="w-4 h-4 text-[#D47FA9]" strokeWidth={2.5} />}
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="text-[13px] font-medium text-[#1D2B5D]/60 whitespace-nowrap">{u.col}</div>
                             {leaderboardTab === 'national' && (
                                <>
                                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                  <div className="text-[12px] font-bold text-[#1D2B5D] whitespace-nowrap flex items-center gap-1.5 opacity-80">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                                    {u.brand}
                                  </div>
                                </>
                             )}
                             <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                             <div className="text-[11px] font-bold text-[#D47FA9] whitespace-nowrap">{u.badges} Badges</div>
                          </div>
                       </div>
                    </div>
                    <div className="font-bold text-[#1D2B5D] text-[17px]">{u.pts} <span className="text-[10px] uppercase text-[#1D2B5D]/40 ml-1 font-bold">pts</span></div>
                 </div>
              )})}
           </div>
        </div>
      </DashboardLayout>
    );
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden w-full">
      <Clouds />
      {currentView === 'landing' && renderLanding()}
      {currentView === 'partners' && renderPartners()}
      {currentView === 'choose-role' && renderChooseRole()}
      {currentView === 'login' && renderLogin()}
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'browse-brands' && renderBrowseBrands()}
      {currentView === 'task-detail' && renderTaskDetail()}
      {currentView === 'leaderboard' && renderLeaderboard()}
      {currentView === 'rewards' && renderRewards()}

      {currentView === 'manager-login' && renderManagerLogin()}
      {currentView === 'manager-dashboard' && renderManagerDashboard()}
      {currentView === 'manager-create-task' && renderManagerCreateTask()}
      {currentView === 'manager-submissions' && renderManagerSubmissions()}
      {currentView === 'manager-ambassadors' && renderManagerAmbassadors()}
      {currentView === 'manager-tasks' && renderManagerTasks()}

      {/* Global Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-white text-[#1D2B5D] px-6 py-4 rounded-2xl shadow-xl font-bold flex items-center gap-3 border border-white/40 backdrop-blur-md pointer-events-auto"
            >
              {toast.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
