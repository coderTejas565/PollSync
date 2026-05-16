const features = [
  {
    icon: "⚡",
    title: "Real-time analytics",
    desc: "Responses appear the moment they're submitted no refresh, no delay, powered by WebSockets.",
  },
  {
    icon: "🔗",
    title: "Public poll sharing",
    desc: "One shareable link works anywhere Slack, email, social, QR code no account needed to vote.",
  },
  {
    icon: "🔒",
    title: "Flexible auth modes",
    desc: "Run anonymous polls for candid feedback or require sign-in for accountable team decisions.",
  },
  {
    icon: "⏰",
    title: "Automatic poll expiry",
    desc: "Set a deadline and PollSync closes voting automatically no babysitting required.",
  },
  {
    icon: "🏆",
    title: "Result publishing",
    desc: "Publish final results with one click new submissions stop, and everyone sees the outcome.",
  },
  {
    icon: "🛡️",
    title: "Duplicate prevention",
    desc: "IP and session-based deduplication keeps your data clean and response integrity intact.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-[72px] px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#E2E8F0] bg-[#F8FAFC] scroll-mt-16"
    >
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center px-3 py-1 bg-[#EEF6FF] border border-[#097FE8]/20 text-[#097FE8] rounded-full text-[11px] font-bold tracking-widest uppercase">
          Features
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
          Everything you need, nothing you don't.
        </h2>
        <p className="mt-3 text-base text-[#64748B] leading-relaxed max-w-lg mx-auto">
          Six core capabilities that cover the full lifecycle from poll creation to final result.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-white border-[1.5px] border-[#E2E8F0] rounded-2xl p-6
                       hover:border-[#097FE8] hover:-translate-y-0.5
                       transition-all duration-200 cursor-default"
          >
            <div className="w-10 h-10 bg-[#EEF6FF] rounded-xl flex items-center justify-center text-xl mb-4">
              {f.icon}
            </div>
            <h3 className="text-[13px] font-extrabold text-[#0F172A] tracking-wide mb-2">
              {f.title}
            </h3>
            <p className="text-[13px] text-[#64748B] leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;