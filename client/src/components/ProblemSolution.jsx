const ProblemSolution = () => {
  return (
    <section className="bg-[#F8FAFC] border-y border-[#E2E8F0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex px-3 py-1 bg-red-50 border border-red-100 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
          The Problem
        </div>
        <h3 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          Feedback workflows are fragmented.
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-4">
          <div className="md:col-span-5 bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm text-left space-y-3 opacity-70">
            <span className="text-[10px] font-black text-red-500 uppercase tracking-wider">Before Stack</span>
            <div className="flex flex-wrap gap-2 text-xs font-bold text-[#64748B]">
              <span className="px-2.5 py-1 bg-[#F1F5F9] rounded-md border border-[#E2E8F0]">Forms</span>
              <span className="text-[#CBD5E1] self-center">+</span>
              <span className="px-2.5 py-1 bg-[#F1F5F9] rounded-md border border-[#E2E8F0]">Sharing</span>
              <span className="text-[#CBD5E1] self-center">+</span>
              <span className="px-2.5 py-1 bg-[#F1F5F9] rounded-md border border-[#E2E8F0]">Analytics</span>
              <span className="text-[#CBD5E1] self-center">+</span>
              <span className="px-2.5 py-1 bg-[#F1F5F9] rounded-md border border-[#E2E8F0]">Manual tracking</span>
            </div>
          </div>
          
          <div className="md:col-span-2 text-center text-[#94A3B8] font-black text-xl rotate-90 md:rotate-0">
            ➔
          </div>
          
          <div className="md:col-span-5 bg-white border-2 border-[#097FE8] p-5 rounded-2xl shadow-md text-left space-y-3">
            <span className="text-[10px] font-black text-[#097FE8] uppercase tracking-wider">After PollSync</span>
            <div className="text-base font-black text-[#0F172A]">
              PollSync Dashboard Unified Workspace
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-3 max-w-xl mx-auto">
          <p className="text-[#0F172A] font-black text-lg tracking-tight">Stop switching between tools.</p>
          <p className="text-[#64748B] text-sm sm:text-base leading-relaxed font-medium">
            Create, share, collect responses, monitor analytics, and publish results from one place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;