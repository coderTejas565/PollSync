const ProblemSolution = () => {
  const checkIcon = (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <section className="bg-[#F8FAFC] border-y border-[#E2E8F0] py-[72px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200/60 text-red-600 rounded-full text-[11px] font-bold tracking-widest uppercase">
            The problem
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
            Your feedback stack is a mess.
          </h2>
          <p className="mt-3 text-base text-[#64748B] leading-relaxed max-w-lg mx-auto">
            Teams lose hours stitching together forms, share links, spreadsheets and
            dashboards when the answer should arrive in seconds.
          </p>
        </div>

        {/* Before / After */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] items-center gap-4 md:gap-0">

          {/* Before */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 opacity-75">
            <p className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest mb-3">
              Before - 4 broken tools
            </p>
            <div className="flex flex-wrap gap-2">
              {["Google Forms", "Slack DM", "Sheet tracker", "Manual tally"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1.5 bg-red-50 border border-red-200/60 rounded-lg text-xs font-semibold text-red-500 line-through opacity-70"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 p-3 bg-red-50 border border-red-200/60 rounded-xl">
              <p className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest mb-1">Result</p>
              <p className="text-xs text-red-800/70 leading-relaxed">
                Stale data. No live view. Context lost between tools.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="text-center text-xl text-[#CBD5E1] font-black rotate-90 md:rotate-0">→</div>

          {/* After */}
          <div className="bg-white border-[1.5px] border-[#097FE8] rounded-2xl p-5 shadow-[0_0_0_4px_rgba(9,127,232,0.07)]">
            <p className="text-[10px] font-extrabold text-[#097FE8] uppercase tracking-widest mb-3">
              After - PollSync
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                "Create poll in 30 seconds",
                "Share one link anywhere",
                "Watch responses stream live",
                "Publish results, auto-close",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[13px] font-semibold text-[#334155]">
                  <span className="w-5 h-5 bg-emerald-50 border border-emerald-200/60 rounded-full flex items-center justify-center flex-shrink-0">
                    {checkIcon}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insight footer */}
        <div className="mt-8 text-center bg-white border border-[#E2E8F0] rounded-2xl py-5 px-6">
          <p className="text-lg font-extrabold text-[#0F172A]">One workspace. Zero stitching.</p>
          <p className="mt-1 text-sm text-[#64748B]">
            Create, share, collect and analyze without switching a single tab.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;