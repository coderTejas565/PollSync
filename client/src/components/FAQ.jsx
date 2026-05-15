const FAQ = () => {
  return (
    <section id="faq" className="bg-[#F8FAFC] border-t border-[#E2E8F0] py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-black text-[#097FE8] uppercase tracking-widest">FAQ</span>
          <h3 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {[
            { q: "Can polls expire automatically?", a: "Yes. Expired polls stop accepting responses immediately." },
            { q: "Are anonymous responses supported?", a: "Yes. Poll creators choose anonymous or authenticated mode depending on use case." },
            { q: "Can I share polls publicly?", a: "Yes. Every poll generates a shareable public URL instantly." },
            { q: "Do analytics update in real time?", a: "Yes. Socket.IO updates dashboards with live responses instantly." },
            { q: "What happens after publishing?", a: "Voting closes and final results become public automatically." }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white border border-[#E2E8F0] p-5 rounded-xl shadow-xs space-y-1.5">
              <h4 className="text-xs sm:text-sm font-black text-[#0F172A]">Q: {faq.q}</h4>
              <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed pl-3 border-l-2 border-[#097FE8]/30">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;