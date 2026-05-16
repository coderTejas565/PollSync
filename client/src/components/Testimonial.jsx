import React from 'react';

const chips = ["JWT Auth", "Prisma ORM", "PostgreSQL", "Socket.IO", "React", "Node.js", "Vercel"];

export default function Testimonial() {
  return (
    <div className="py-16 px-6 border-b border-[#E2E8F0]">
      <div className="max-w-[720px] mx-auto text-center">
        <span className="inline-flex items-center gap-[6px] px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#F0FDF4] border border-[rgba(16,185,129,0.2)] text-[#059669]">
          Engineering journey
        </span>
        <h2 className="text-[26px] md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-none mt-[14px]">
          Behind the architecture
        </h2>
        
        <div className="bg-white border-[1.5px] border-[#E2E8F0] rounded-[20px] p-8 text-left relative overflow-hidden mt-7">
          <div className="absolute -top-2 left-5 text-[120px] font-black text-[#097FE8] opacity-5 pointer-events-none select-none leading-none">
            "
          </div>
          <p className="text-sm font-medium text-[#475569] leading-[1.8] relative z-10">
            PollSync was built to master real-time systems end-to-end from secure JWT token infrastructure and type-safe Prisma data access, to instant Socket.IO stream updates and production deployment pipelines. Every feature was a deliberate lesson in full-stack engineering under real constraints.
          </p>
          
          <div className="flex items-center gap-3 mt-5 pt-[18px] border-t border-[#E2E8F0]">
            <div className="w-[38px] h-[38px] rounded-full bg-[#EEF6FF] border-[1.5px] border-[rgba(9,127,232,0.2)] flex items-center justify-center text-xs font-extrabold text-[#097FE8] shrink-0">
              TD
            </div>
            <div>
              <div className="text-[13px] font-extrabold text-[#0F172A]">Tejas</div>
              <div className="text-[11px] text-[#94A3B8] mt-px">Software Developer · Built during backend engineering deep-dive</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-4">
            {chips.map(chip => (
              <span key={chip} className="p-[4px_10px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-[11px] font-semibold text-[#64748B]">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}