const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-[#F1F5F9]">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#097FE8] rounded-lg flex items-center justify-center text-white font-black text-xs shadow-sm">P</div>
            <span className="text-lg font-black text-[#0F172A] tracking-tight">PollSync</span>
          </div>
          <p className="text-[#64748B] text-xs font-medium max-w-xs">
            Real-time polling & analytics platform.
          </p>
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Links</span>
            <a href="https://github.com/coderTejas565" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#475569] hover:text-[#097FE8]">GitHub</a>
            <a href="https://www.linkedin.com/in/tejas-null-5174b0399/" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#475569] hover:text-[#097FE8]">LinkedIn</a>
            <a href="https://x.com/TEJAS_DEV_code" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#475569] hover:text-[#097FE8]">X / Twitter</a>
          </div>
        </div>
      </div>

      {/* Deployment Trust Badge Sub-Footer */}
      <div className="max-w-7xl mx-auto pt-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
          <span>Built with:</span>
          <div className="flex flex-wrap gap-2">
            {["React", "Node", "Prisma", "Postgres", "Socket.IO", "Vercel", "Render", "Neon"].map((badge, bIdx) => (
              <span key={bIdx} className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded text-[#475569]">{badge}</span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()} PollSync Engine.</span>
          <span className="bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1 rounded text-[#097FE8]">Built by Tejas</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;