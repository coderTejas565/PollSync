import { Link } from "react-router-dom";

const CTA = ({ scrollToSection }) => {
  return (
    <section className="bg-[#0F172A] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800">
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Collect feedback in real time.
        </h3>
        <p className="text-slate-400 text-xs sm:text-base max-w-md mx-auto font-medium">
          Create polls. Track responses. Publish results. Everything from one single workspace.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
          <Link to="/create" className="w-full bg-[#097FE8] hover:bg-[#0866ba] text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-center shadow-lg shadow-blue-500/10 active:scale-[0.99] transition-all">
            Start Creating
          </Link>
          <button onClick={() => scrollToSection("demo")} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-all">
            Try Demo Poll
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;