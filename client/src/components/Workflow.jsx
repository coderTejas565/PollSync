const Workflow = () => {
  return (
    <section id="workflow" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-16">
      <div className="text-center space-y-3 mb-16">
        <span className="text-[10px] font-black text-[#097FE8] uppercase tracking-widest">Pipeline Speed</span>
        <h3 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">From idea to insights in minutes</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
        {[
          { step: "01", label: "Create Poll", desc: "Build polls with options." },
          { step: "02", label: "Share Link", desc: "Distribute public URLs." },
          { step: "03", label: "Collect Responses", desc: "Gather incoming data." },
          { step: "04", label: "Watch Live Analytics", desc: "Track live responses instantly." },
          { step: "05", label: "Publish Results", desc: "Close voting automatically." }
        ].map((flow, index) => (
          <div key={index} className="relative flex lg:flex-col items-center gap-4 bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-xs hover:border-[#097FE8] transition-colors group">
            <div className="w-8 h-8 bg-[#F0F7FF] text-[#097FE8] font-black rounded-lg flex items-center justify-center text-xs shrink-0">
              {flow.step}
            </div>
            <div className="space-y-1 lg:text-center">
              <h4 className="text-xs font-black uppercase text-[#0F172A] tracking-wider">{flow.label}</h4>
              <p className="text-[11px] text-[#64748B] font-semibold leading-tight">{flow.desc}</p>
            </div>
            {index < 4 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-[#CBD5E1] font-black text-sm z-10 group-hover:text-[#097FE8] transition-colors">
                ➔
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Workflow;