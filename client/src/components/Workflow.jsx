import { useState } from "react";

const steps = [
  {
    num: "01",
    label: "Create poll",
    desc: "Write your question and options",
    icon: "📝",
    title: "Create your poll",
    detail:
      "Add your question, up to 6 answer options, and optional settings like expiry time or auth mode. Takes under 30 seconds from blank to live.",
  },
  {
    num: "02",
    label: "Share link",
    desc: "Paste anywhere in one click",
    icon: "🔗",
    title: "Share your link",
    detail:
      "Copy your unique poll URL and paste it into Slack, email, a tweet, or generate a QR code. Anyone with the link can vote instantly — no account needed.",
  },
  {
    num: "03",
    label: "Collect votes",
    desc: "Responses stream in live",
    icon: "🗳️",
    title: "Collect responses",
    detail:
      "Votes arrive in real time over WebSockets. Watch the numbers climb as your team or community responds from any device, anywhere.",
  },
  {
    num: "04",
    label: "Watch analytics",
    desc: "Track results in real time",
    icon: "📊",
    title: "Watch the analytics",
    detail:
      "Your live dashboard shows vote counts, percentages, and trends as they happen. No refreshing — the chart updates itself the moment a new vote lands.",
  },
  {
    num: "05",
    label: "Publish results",
    desc: "Close and share the outcome",
    icon: "🏆",
    title: "Publish the results",
    detail:
      "When you're ready, publish the final results. Voting closes automatically and every respondent sees the outcome — clear, decisive, done.",
  },
];

const Workflow = () => {
  const [cur, setCur] = useState(0);

  const progressPct = cur === 0 ? 0 : (cur / (steps.length - 1)) * 100;

  return (
    <section
      id="workflow"
      className="py-[72px] px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#E2E8F0] scroll-mt-16"
    >
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center px-3 py-1 bg-emerald-50 border border-emerald-200/60 text-emerald-600 rounded-full text-[11px] font-bold tracking-widest uppercase">
          How it works
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
          From idea to insight in 5 steps.
        </h2>
        <p className="mt-3 text-base text-[#64748B] leading-relaxed max-w-lg mx-auto">
          The fastest path from a question in your head to a decision your team trusts.
        </p>
      </div>

      {/* Progress track + steps */}
      <div className="mt-10 relative">
        {/* Track line */}
        <div className="hidden lg:block absolute top-[22px] left-[10%] right-[10%] h-[2px] bg-[#E2E8F0] z-0">
          <div
            className="h-full bg-gradient-to-r from-[#097FE8] to-[#0EA5E9] rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10">
          {steps.map((s, i) => {
            const isDone = i < cur;
            const isActive = i === cur;

            return (
              <button
                key={i}
                onClick={() => setCur(i)}
                className="flex lg:flex-col items-center gap-4 lg:gap-0 text-left lg:text-center
                           bg-transparent border-0 p-0 cursor-pointer"
              >
                {/* Circle */}
                <div
                  className={`
                    w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0
                    text-[13px] font-extrabold border-2 transition-all duration-200
                    ${isActive
                      ? "bg-[#097FE8] border-[#097FE8] text-white shadow-[0_0_0_5px_rgba(9,127,232,0.12)]"
                      : isDone
                      ? "bg-emerald-50 border-emerald-300 text-emerald-600"
                      : "bg-white border-[#E2E8F0] text-[#94A3B8]"
                    }
                  `}
                >
                  {isDone ? "✓" : s.num}
                </div>

                {/* Label */}
                <div className="lg:mt-3">
                  <p className={`text-[12px] font-bold leading-snug ${isActive ? "text-[#0F172A]" : "text-[#64748B]"}`}>
                    {s.label}
                  </p>
                  <p className="text-[11px] text-[#94A3B8] leading-snug mt-0.5">{s.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className="mt-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 flex items-start gap-4 transition-all duration-300">
        <div className="w-10 h-10 bg-[#EEF6FF] rounded-xl flex items-center justify-center text-xl flex-shrink-0">
          {steps[cur].icon}
        </div>
        <div>
          <p className="text-[15px] font-extrabold text-[#0F172A]">{steps[cur].title}</p>
          <p className="mt-1 text-[13px] text-[#64748B] leading-relaxed">{steps[cur].detail}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-5 flex justify-center gap-2">
        <button
          onClick={() => setCur((p) => Math.max(p - 1, 0))}
          disabled={cur === 0}
          className="px-5 py-2.5 rounded-xl text-[13px] font-bold bg-white border-[1.5px] border-[#E2E8F0]
                     text-[#334155] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]
                     disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          ← Back
        </button>
        <button
          onClick={() => setCur((p) => Math.min(p + 1, steps.length - 1))}
          disabled={cur === steps.length - 1}
          className="px-5 py-2.5 rounded-xl text-[13px] font-bold
                     bg-[#097FE8] text-white border-[1.5px] border-[#097FE8]
                     shadow-[0_4px_12px_rgba(9,127,232,0.25)]
                     hover:bg-[#0866BA] disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150"
        >
          Next step →
        </button>
      </div>
    </section>
  );
};

export default Workflow;