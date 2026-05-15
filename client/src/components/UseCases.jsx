const UseCases = () => {
  return (
    <section className="bg-[#F8FAFC] border-y border-[#E2E8F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-black text-[#097FE8] uppercase tracking-widest">Target Vectors</span>
          <h3 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">Built for different workflows</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: "Teams", desc: "Collect internal feedback." },
            { title: "Students", desc: "Run surveys quickly." },
            { title: "Communities", desc: "Gather opinions at scale." },
            { title: "Events", desc: "Measure participation." },
            { title: "Hackathons", desc: "Collect votes." },
            { title: "Organizations", desc: "Monitor feedback in real time." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-xs text-center space-y-1.5">
              <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider text-[#097FE8]">{item.title}</h4>
              <p className="text-[#64748B] text-[11px] font-semibold leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;