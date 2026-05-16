import React, { useState } from 'react';

const faqItems = [
  { q: "Can polls expire automatically?", a: "Yes. Set an expiry time when creating the poll and responses stop being accepted the moment it lapses no manual action needed." },
  { q: "Are anonymous responses supported?", a: "Yes. Poll creators choose between anonymous mode for candid feedback, or authenticated mode when accountability matters." },
  { q: "Can I share polls publicly?", a: "Every poll gets a unique public URL the moment it's created. Share it anywhere Slack, email, social, or a QR code. Voters don't need an account." },
  { q: "Do analytics update in real time?", a: "Yes. Socket.IO pushes every vote to all connected dashboards instantly vote counts, percentages, and charts update without any refresh." },
  { q: "What happens after I publish results?", a: "Publishing closes voting immediately and makes the final results visible to all respondents. No further submissions are accepted." },
  { q: "Is it free to use?", a: "Yes. PollSync is free on the starter plan with no credit card required. Create unlimited polls and share them instantly." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#F8FAFC] border-t border-b border-[#E2E8F0] py-16 px-6">
      <div className="max-w-[700px] mx-auto text-center">
        <span className="inline-flex items-center gap-[6px] px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#EEF6FF] border border-[rgba(9,127,232,0.2)] text-[#097FE8]">
          FAQ
        </span>
        <h2 className="text-[26px] md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-none mt-[14px]">
          Common questions
        </h2>
        
        <div className="mt-9 flex flex-col gap-2 max-w-[680px] mx-auto text-left">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                onClick={() => toggleFaq(idx)}
                className={`bg-white border-[1.5px] rounded-[14px] overflow-hidden cursor-pointer transition-colors duration-150 ${isOpen ? 'border-[#097FE8]' : 'border-[#E2E8F0] hover:border-[#097FE8]'}`}
              >
                <div className="flex justify-between items-center p-[16px_20px] gap-3">
                  <span className="text-sm font-bold text-[#0F172A] leading-[1.4]">{item.q}</span>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] transition-all duration-200 ${isOpen ? 'rotate-180 bg-[#EEF6FF] text-[#097FE8]' : 'bg-[#F1F5F9]'}`}>
                    ▾
                  </span>
                </div>
                {isOpen && (
                  <div className="p-[0_20px_16px] text-[13px] text-[#64748B] leading-[1.7] border-l-2 border-[rgba(9,127,232,0.2)] mx-5">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}