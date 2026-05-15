const WhyPollSync = () => {
  return (
    <section id="why-pollsync" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-16">
      <div className="text-center space-y-3 mb-16">
        <span className="text-[10px] font-black text-[#097FE8] uppercase tracking-widest bg-[#F0F7FF] px-3 py-1 rounded-full">Product Core</span>
        <h3 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">Why teams choose PollSync</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side List */}
        <div className="md:col-span-5 space-y-4">
          {[
            "Real-time analytics",
            "Public share links",
            "Secure authentication",
            "Automatic poll expiry",
            "Result publishing",
            "Duplicate prevention"
          ].map((check, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-bold text-[#334155]">
              <span className="text-[#10B981] text-base">✓</span>
              <span>{check}</span>
            </div>
          ))}
        </div>

        {/* Right Comparison Matrix Table Grid */}
        <div className="md:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-black uppercase tracking-wider">
                <th className="p-4">Feature Metric</th>
                <th className="p-4 border-l border-[#E2E8F0]">Traditional Forms</th>
                <th className="p-4 border-l border-[#E2E8F0] text-[#097FE8]">PollSync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#334155]">
              <tr>
                <td className="p-4 font-bold bg-[#F8FAFC]/50">Data State</td>
                <td className="p-4 border-l border-[#E2E8F0] text-red-500/80">Static updates</td>
                <td className="p-4 border-l border-[#E2E8F0] font-bold text-[#097FE8]">Real-time stream</td>
              </tr>
              <tr>
                <td className="p-4 font-bold bg-[#F8FAFC]/50">Metric Logs</td>
                <td className="p-4 border-l border-[#E2E8F0]">Manual tracking</td>
                <td className="p-4 border-l border-[#E2E8F0] font-bold text-[#10B981]">Live analytics</td>
              </tr>
              <tr>
                <td className="p-4 font-bold bg-[#F8FAFC]/50">Environment</td>
                <td className="p-4 border-l border-[#E2E8F0]">Separate systems</td>
                <td className="p-4 border-l border-[#E2E8F0] font-bold text-[#0F172A]">One dashboard</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default WhyPollSync;