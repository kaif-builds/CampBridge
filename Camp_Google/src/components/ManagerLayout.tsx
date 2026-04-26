import React from 'react';

export const ManagerLayout = ({ children, activeTab, setCurrentView, companyName, initials }: any) => {
  return (
    <div className="relative z-10 flex min-h-screen font-sans">
      <div className="w-64 bg-white/70 backdrop-blur-md border-r border-white/40 p-6 flex-col hidden md:flex fixed h-full left-0 top-0 z-50">
         <button onClick={() => setCurrentView('landing')} className="font-sans font-semibold text-2xl text-[#1D2B5D] mb-12 tracking-tight text-left hover:opacity-80 transition-opacity">CampBridge</button>
         <nav className="flex flex-col gap-2">
            <button onClick={() => setCurrentView('manager-dashboard')} className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'dashboard' ? 'bg-white text-[#1D2B5D] shadow-sm' : 'text-[#1D2B5D]/60 hover:text-[#1D2B5D] hover:bg-white/50'}`}>Dashboard</button>
            <button onClick={() => setCurrentView('manager-tasks')} className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'tasks' ? 'bg-white text-[#1D2B5D] shadow-sm' : 'text-[#1D2B5D]/60 hover:text-[#1D2B5D] hover:bg-white/50'}`}>Tasks</button>
            <button onClick={() => setCurrentView('manager-submissions')} className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'submissions' ? 'bg-white text-[#1D2B5D] shadow-sm' : 'text-[#1D2B5D]/60 hover:text-[#1D2B5D] hover:bg-white/50'}`}>Submissions</button>
            <button onClick={() => setCurrentView('manager-ambassadors')} className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === 'ambassadors' ? 'bg-white text-[#1D2B5D] shadow-sm' : 'text-[#1D2B5D]/60 hover:text-[#1D2B5D] hover:bg-white/50'}`}>Ambassadors</button>
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
                 <div className="font-bold text-[#1D2B5D] text-sm hidden sm:block">{companyName}</div>
                 <div className="text-xs font-bold text-[#1D2B5D]/70">Company Account</div>
               </div>
               <div className="w-10 h-10 rounded-[12px] bg-red-600 flex items-center justify-center font-serif font-bold text-white shadow-sm">{initials}</div>
            </div>
         </header>
         <main className="flex-1 p-4 md:p-8">
            {children}
         </main>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/40 p-2 flex justify-around items-center z-50 px-2 sm:px-4 overflow-x-auto">
         <button onClick={() => setCurrentView('manager-dashboard')} className={`flex flex-col items-center p-2 rounded-xl transition-colors min-w-[64px] ${activeTab === 'dashboard' ? 'text-[#1D2B5D] bg-[#1D2B5D]/5' : 'text-[#1D2B5D]/60'}`}>
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zm-10 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            <span className="text-[10px] font-bold">Dash</span>
         </button>
         <button onClick={() => setCurrentView('manager-tasks')} className={`flex flex-col items-center p-2 rounded-xl transition-colors min-w-[64px] ${activeTab === 'tasks' ? 'text-[#1D2B5D] bg-[#1D2B5D]/5' : 'text-[#1D2B5D]/60'}`}>
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            <span className="text-[10px] font-bold">Tasks</span>
         </button>
         <button onClick={() => setCurrentView('manager-submissions')} className={`flex flex-col items-center p-2 rounded-xl transition-colors min-w-[64px] ${activeTab === 'submissions' ? 'text-[#1D2B5D] bg-[#1D2B5D]/5' : 'text-[#1D2B5D]/60'}`}>
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span className="text-[10px] font-bold">Review</span>
         </button>
         <button onClick={() => setCurrentView('manager-ambassadors')} className={`flex flex-col items-center p-2 rounded-xl transition-colors min-w-[64px] ${activeTab === 'ambassadors' ? 'text-[#1D2B5D] bg-[#1D2B5D]/5' : 'text-[#1D2B5D]/60'}`}>
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span className="text-[10px] font-bold">Users</span>
         </button>
      </div>
    </div>
  );
};
