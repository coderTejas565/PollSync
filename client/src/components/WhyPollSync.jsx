const WhyPollSync = () => {
  const checks = [
    "Real-time analytics",
    "Public share links",
    "Secure auth modes",
    "Auto poll expiry",
    "Result publishing",
    "Duplicate prevention",
  ];

  const rows = [
    { feature: "Data updates",     before: "Refresh to see",     after: "Live stream",      afterStyle: "text-[#097FE8] font-bold" },
    { feature: "Analytics",        before: "Manual export",      after: "Live dashboard",   afterStyle: "text-emerald-600 font-bold" },
    { feature: "Workspace",        before: "5+ tools",           after: "One dashboard",    afterStyle: "text-[#0F172A] font-bold" },
    { feature: "Share flow",       before: "Copy embed, configure", after: "1-click link",  afterStyle: "text-[#097FE8] font-bold" },
    { feature: "Response control", before: "Manual close",       after: "Auto-expiry",      afterStyle: "text-emerald-600 font-bold" },
  ];

  return (
    <section id="why-pollsync" className="py-[72px] px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#E2E8F0] scroll-mt-16">

      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center px-3 py-1 bg-[#EEF6FF] border border-[#097FE8]/20 text-[#097FE8] rounded-full text-[11px] font-bold tracking-widest uppercase">
          Why PollSync
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
          Built different from day one.
        </h2>
        <p className="mt-3 text-base text-[#64748B] leading-relaxed max-w-lg mx-auto">
          Legacy forms were designed for data collection. PollSync is designed for
          decisions real-time, collaborative, and zero-friction.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">

        {/* Check list */}
        <div>
          <p className="text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest mb-4">
            What's included
          </p>
          <div className="flex flex-col gap-2.5">
            {checks.map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-[#334155]">
                <span className="w-[22px] h-[22px] bg-emerald-50 border border-emerald-200/60 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-extrabold text-emerald-600">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="bg-white border-[1.5px] border-[#E2E8F0] rounded-2xl overflow-hidden">
          {/* Head */}
          <div className="grid grid-cols-3 bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <div className="p-3.5 text-[11px] font-extrabold text-[#64748B] uppercase tracking-wider">Feature</div>
            <div className="p-3.5 text-[11px] font-extrabold text-[#64748B] uppercase tracking-wider border-l border-[#E2E8F0]">Traditional forms</div>
            <div className="p-3.5 text-[11px] font-extrabold text-[#097FE8] uppercase tracking-wider border-l border-[#E2E8F0]">PollSync</div>
          </div>

          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-[#F1F5F9] last:border-0">
              <div className="p-3.5 text-[13px] font-bold text-[#0F172A] bg-[#FAFBFD]">{r.feature}</div>
              <div className="p-3.5 text-[13px] text-red-500/80 border-l border-[#E2E8F0]">{r.before}</div>
              <div className={`p-3.5 text-[13px] border-l border-[#E2E8F0] ${r.afterStyle}`}>{r.after}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPollSync;