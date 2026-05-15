const Testimonial = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
      <span className="text-[10px] font-black text-[#10B981] uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">Engineering Journey</span>
      <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">Behind the Architecture</h3>
      <blockquote className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 text-left relative overflow-hidden">
        <p className="text-xs sm:text-sm font-semibold text-[#475569] leading-relaxed relative z-10">
          "PollSync was built during learning backend development and engineering real-time systems. The project was explicitly designed to implement and master end-to-end full-stack challenges: secure token infrastructure with JWT authentication, type-safe data access using Prisma and PostgreSQL, instant stream updating with Socket.IO, and production deployment pipeline configurations."
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#097FE8]/10 text-[#097FE8] flex items-center justify-center text-[10px] font-black">TD</div>
          <span className="text-xs font-black text-[#0F172A] uppercase tracking-wider">Tejas — Software Developer</span>
        </div>
      </blockquote>
    </section>
  );
};

export default Testimonial;