import React from 'react';

const useCasesData = [
  { icon: '👥', title: 'Teams', desc: 'Run standups and gather internal feedback without leaving Slack.' },
  { icon: '🎓', title: 'Students', desc: 'Quick classroom polls and peer surveys with zero setup.' },
  { icon: '🌐', title: 'Communities', desc: 'Gather opinions at scale with public shareable links.' },
  { icon: '🎪', title: 'Events', desc: 'Live audience voting and real-time engagement tracking.' },
  { icon: '⚡', title: 'Hackathons', desc: 'Collect project votes and judge feedback in minutes.' },
  { icon: '🏢', title: 'Organizations', desc: 'Monitor structured feedback across departments in real time.' },
];

export default function UseCases() {
  return (
    <div className="bg-[#F8FAFC] border-t border-b border-[#E2E8F0] py-16 px-6">
      <div className="max-w-[900px] margin-center mx-auto text-center">
        <span className="inline-flex items-center gap-[6px] px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#EEF6FF] border border-[rgba(9,127,232,0.2)] text-[#097FE8]">
          Use cases
        </span>
        <h2 className="text-[26px] md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-none mt-[14px]">
          Built for every kind of team.
        </h2>
        <p className="text-base text-[#64748B] leading-[1.7] max-w-[520px] mt-3 mx-auto">
          Whether you're running a standup, a survey, or a hackathon vote PollSync adapts to your workflow.
        </p>
        
        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-9">
          {useCasesData.map((uc, index) => (
            <div 
              key={index} 
              className="bg-white border-[1.5px] border-[#E2E8F0] rounded-[14px] px-4 py-5 text-center cursor-default transition-all duration-150 hover:border-[#097FE8] hover:-translate-y-[2px]"
            >
              <div className="text-2xl mb-[10px]">{uc.icon}</div>
              <div className="text-[13px] font-extrabold text-[#0F172A] mb-1">{uc.title}</div>
              <div className="text-xs text-[#64748B] leading-[1.55]">{uc.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}