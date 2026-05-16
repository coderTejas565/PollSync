const Screenshots = () => {
  const screenshots = [
    {
      title: "Dashboard",
      file: "dashboard.png",
      text: "Manage polls, track responses, and publish results from one dashboard.",
    },
    {
      title: "Poll Creation",
      file: "poll-creation1.png",
      text: "Create dynamic polls with multiple questions and options.",
    },
    {
      title: "Poll Settings",
      file: "poll-creation2.png",
      text: "Configure poll settings and customize response behavior.",
    },
    {
      title: "Public Poll",
      file: "public-poll.png",
      text: "Respondents access polls through simple public links.",
    },
    {
      title: "Analytics",
      file: "analytics.png",
      text: "Track responses and option-level insights in real time.",
    },
    {
      title: "Published Results",
      file: "published-results.png",
      text: "Publish final results publicly after voting closes.",
    },
  ];

  return (
    <section
      id="screenshots"
      className="bg-[#F8FAFC] border-y border-[#E2E8F0] py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Heading */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-black text-[#097FE8] uppercase tracking-widest">
            Interface Assets
          </span>

          <h3 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Product in Action
          </h3>
        </div>


        {/* Demo Block */}
        <div
          id="demo"
          className="bg-white border-2 border-[#097FE8] rounded-2xl p-6 max-w-2xl mx-auto text-center space-y-4 shadow-md scroll-mt-20"
        >
          <h4 className="text-lg font-black text-[#0F172A] uppercase tracking-wider">
            ⚡ Try PollSync Live
          </h4>

          <p className="text-xs sm:text-sm font-medium text-[#64748B]">
            Test out the workflow directly using demo routes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">

            <a
              href="https://poll-sync-tau.vercel.app/signup"
              target="_blank"
              rel="noreferrer"
              className="w-full px-4 py-2.5 bg-[#097FE8] text-white rounded-xl hover:bg-[#0866ba] text-center text-xs font-bold"
            >
              Create Poll
            </a>

            <a
              href="https://poll-sync-tau.vercel.app/login"
              target="_blank"
              rel="noreferrer"
              className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl text-center text-xs font-bold"
            >
              View Demo Poll
            </a>

            <a
              href="https://github.com/coderTejas565/PollSync"
              target="_blank"
              rel="noreferrer"
              className="w-full px-4 py-2.5 border border-[#CBD5E1] rounded-xl text-center text-xs font-bold"
            >
              Source Code
            </a>

          </div>
        </div>



        {/* Screenshots */}
        <div className="space-y-12">

          {screenshots.map((shot, idx) => (

            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >

              {/* Left Text */}
              <div className="lg:col-span-4 space-y-2">

                <span className="text-[10px] font-black text-[#097FE8] uppercase tracking-wider">
                  Module {idx + 1}
                </span>

                <h4 className="text-lg font-black text-[#0F172A]">
                  {shot.title}
                </h4>

                <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed">
                  {shot.text}
                </p>

              </div>


              {/* Right Image */}
              <div className="lg:col-span-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl overflow-hidden min-h-[220px] flex items-center justify-center">

                <img
                  src={`/screenshots/${shot.file}`}
                  alt={`${shot.title} screenshot`}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />


                {/* Fallback */}
                <div className="hidden py-16 text-center text-xs font-mono text-[#94A3B8] font-black">

                  Screenshot not found

                  <br />

                  {shot.file}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Screenshots;