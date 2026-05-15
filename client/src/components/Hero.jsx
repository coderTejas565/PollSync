import { Link } from "react-router-dom";

const Hero = ({ scrollToSection }) => {
  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-tight">
            Create polls. <br />
            <span className="text-[#097FE8]">Collect feedback.</span> <br />
            Track results in real time.
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            PollSync helps teams, students, and communities create polls, collect responses through public links, monitor live analytics, and publish results — all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link to="/create" className="w-full sm:w-auto bg-[#097FE8] hover:bg-[#0866ba] text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest text-center shadow-lg shadow-blue-100 active:scale-[0.99] transition-all">
              Start Creating
            </Link>
            <button onClick={() => scrollToSection("demo")} className="w-full sm:w-auto bg-white border-2 border-[#E2E8F0] hover:border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest text-center transition-all">
              View Demo
            </button>
          </div>

          {/* Social Proof Stats Block */}
          <div className="pt-8 border-t border-[#F1F5F9] space-y-4">
            <p className="text-xs font-bold text-[#64748B]">
              Trusted by students, communities, and teams for collecting real-time feedback.
            </p>
            <div className="flex gap-8 justify-center lg:justify-start flex-wrap">
              <div>
                <h4 className="font-black text-2xl text-[#0F172A]">100+</h4>
                <p className="text-xs font-semibold text-[#64748B]">Polls created</p>
              </div>
              <div>
                <h4 className="font-black text-2xl text-[#0F172A]">500+</h4>
                <p className="text-xs font-semibold text-[#64748B]">Responses</p>
              </div>
              <div>
                <h4 className="font-black text-2xl text-[#097FE8]">Live</h4>
                <p className="text-xs font-semibold text-[#64748B]">Analytics updates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Frame Box */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-2.5 shadow-xl shadow-slate-100 relative overflow-hidden">
            <img 
              src="/screenshots/dashboard.png" 
              alt="PollSync Main Dashboard Interface Screen" 
              className="w-full h-auto rounded-xl border border-[#E2E8F0]"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div className="hidden bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 min-h-[300px] flex-col justify-between">
              <div className="h-6 w-full flex items-center gap-1.5 border-b border-[#F1F5F9] pb-3 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              </div>
              <div className="text-center py-20 text-xs font-mono font-black text-[#94A3B8] uppercase">
               <img src="/screenshots/dashboard.png" alt="Dashboard" className="w-full rounded-xl"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;