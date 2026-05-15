const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2E8F0] scroll-mt-16">
      <div className="text-center space-y-3 mb-16">
        <span className="text-[10px] font-black text-[#097FE8] uppercase tracking-widest bg-[#F0F7FF] px-3 py-1 rounded-full">Capability Matrix</span>
        <h3 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">Everything you need to collect insight</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm hover:border-[#CBD5E1] transition-all space-y-3">
          <div className="w-10 h-10 bg-[#F0F7FF] rounded-xl flex items-center justify-center text-[#097FE8] font-bold">⚡</div>
          <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Real-Time Analytics</h4>
          <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed">Monitor responses instantly with live dashboard updates powered by WebSockets.</p>
        </div>
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm hover:border-[#CBD5E1] transition-all space-y-3">
          <div className="w-10 h-10 bg-[#F0F7FF] rounded-xl flex items-center justify-center text-[#097FE8] font-bold">🔗</div>
          <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Public Poll Sharing</h4>
          <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed">Share polls using public links and collect responses from anyone.</p>
        </div>
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm hover:border-[#CBD5E1] transition-all space-y-3">
          <div className="w-10 h-10 bg-[#F0F7FF] rounded-xl flex items-center justify-center text-[#097FE8] font-bold">🔒</div>
          <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Authentication Options</h4>
          <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed">Support anonymous or authenticated response modes depending on use case.</p>
        </div>
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm hover:border-[#CBD5E1] transition-all space-y-3">
          <div className="w-10 h-10 bg-[#F0F7FF] rounded-xl flex items-center justify-center text-[#097FE8] font-bold">⌛</div>
          <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Poll Expiry</h4>
          <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed">Automatically stop accepting responses when polls expire.</p>
        </div>
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm hover:border-[#CBD5E1] transition-all space-y-3">
          <div className="w-10 h-10 bg-[#F0F7FF] rounded-xl flex items-center justify-center text-[#097FE8] font-bold">🏆</div>
          <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Result Publishing</h4>
          <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed">Publish final results and automatically stop new submissions.</p>
        </div>
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm hover:border-[#CBD5E1] transition-all space-y-3">
          <div className="w-10 h-10 bg-[#F0F7FF] rounded-xl flex items-center justify-center text-[#097FE8] font-bold">🛡️</div>
          <h4 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Duplicate Prevention</h4>
          <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed">Prevent multiple submissions and maintain response integrity.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;