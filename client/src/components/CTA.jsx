import React from 'react';
import { Link } from "react-router-dom";

export default function CTA({ scrollToSection }) {
  return (
    <div className="bg-[#0F172A] py-20 px-6 text-center">
      <div className="max-w-[580px] mx-auto">
        <div className="inline-flex items-center gap-[7px] px-[14px] py-1 bg-[rgba(9,127,232,0.12)] border border-[rgba(9,127,232,0.3)] rounded-full text-[11px] font-bold text-[#60A5FA] mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
          Free to start · No credit card
        </div>
        <h2 className="text-[28px] md:text-[48px] font-extrabold text-white tracking-tight leading-[1.08] mb-4">
          Your team's next decision<br />
          <span className="text-[#60A5FA]">starts here.</span>
        </h2>
        <p className="text-sm text-[rgba(255,255,255,0.5)] leading-[1.7] max-w-[420px] mb-7 mx-auto">
          Create a poll in 30 seconds. Watch responses stream in live. Share the outcome with one click.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="bg-[#097FE8] text-white border-none py-[14px] px-8 rounded-xl text-sm font-bold cursor-pointer shadow-[0_8px_24px_rgba(9,127,232,0.35)] transition-all duration-150 hover:bg-[#0866BA] hover:-translate-y-px">
            <Link to="/create" >
            Launch free poll →
                </Link>
          </button>
          <button onClick={() => scrollToSection("demo")} className="bg-transparent text-[rgba(255,255,255,0.7)] border-[1.5px] border-[rgba(255,255,255,0.12)] py-3 px-7 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-150 hover:border-[rgba(255,255,255,0.25)] hover:text-white">
            Try the demo
          </button>
        </div>
        <p className="mt-6 text-xs text-[rgba(255,255,255,0.25)]">
          No credit card · Free forever on starter · Edge-deployed worldwide
        </p>
      </div>
    </div>
  );
}



