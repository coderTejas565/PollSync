import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar2 = ({ scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      scrolled ? "bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-7 h-7 bg-[#097FE8] rounded-lg flex items-center justify-center text-white font-black text-xs shadow-sm">
            P
          </div>
          <span className="text-lg font-black text-[#0F172A] tracking-tight">
            Poll<span className="text-[#097FE8]">Sync</span>
          </span>
        </div>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection("features")} className="text-xs font-black uppercase tracking-wider text-[#475569] hover:text-[#097FE8] transition-colors">Features</button>
          <button onClick={() => scrollToSection("why-pollsync")} className="text-xs font-black uppercase tracking-wider text-[#475569] hover:text-[#097FE8] transition-colors">Why PollSync</button>
          <button onClick={() => scrollToSection("demo")} className="text-xs font-black uppercase tracking-wider text-[#475569] hover:text-[#097FE8] transition-colors">Demo</button>
          <button onClick={() => scrollToSection("workflow")} className="text-xs font-black uppercase tracking-wider text-[#475569] hover:text-[#097FE8] transition-colors">Docs</button>
          <a href="https://github.com/coderTejas565/PollSync.git" target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-wider text-[#475569] hover:text-[#097FE8] transition-colors">GitHub</a>
          <Link to="/dashboard" className="text-xs font-black uppercase tracking-wider text-[#475569] hover:text-[#097FE8] transition-colors">Login</Link>
          <Link to="/create" className="bg-[#097FE8] hover:bg-[#0866ba] text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-blue-100 active:scale-[0.98] transition-all">
            Create Poll
          </Link>
        </nav>

        {/* Mobile Hamburger Menu Icon */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[#475569] hover:text-[#0F172A]">
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-4 pt-2 pb-6 flex flex-col gap-4 shadow-inner">
          <button onClick={() => { scrollToSection("features"); setMobileMenuOpen(false); }} className="text-left text-xs font-black uppercase tracking-wider text-[#475569] py-2">Features</button>
          <button onClick={() => { scrollToSection("why-pollsync"); setMobileMenuOpen(false); }} className="text-left text-xs font-black uppercase tracking-wider text-[#475569] py-2">Why PollSync</button>
          <button onClick={() => { scrollToSection("demo"); setMobileMenuOpen(false); }} className="text-left text-xs font-black uppercase tracking-wider text-[#475569] py-2">Demo</button>
          <button onClick={() => { scrollToSection("workflow"); setMobileMenuOpen(false); }} className="text-left text-xs font-black uppercase tracking-wider text-[#475569] py-2">Docs</button>
          <a href="https://github.com/coderTejas565/PollSync.git" target="_blank" rel="noreferrer" className="text-xs font-black uppercase tracking-wider text-[#475569] py-2">GitHub</a>
          <Link to="/login" className="text-xs font-black uppercase tracking-wider text-[#475569] py-2">Login</Link>
          <Link to="/create" className="bg-[#097FE8] hover:bg-[#0866ba] text-white px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-center shadow-md">
            Create Poll
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar2;