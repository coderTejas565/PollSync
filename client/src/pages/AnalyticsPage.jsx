import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnalytics } from "../api/analytics.api";
import { socket } from "../lib/socket";

const AnalyticsPage = () => {
  const { pollId } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getAnalytics(pollId);
        setAnalytics(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [pollId]);

  useEffect(() => {
    socket.emit("join-poll", pollId);

    socket.on("analytics-updated", (data) => {
      setAnalytics(data);
    });

    return () => {
      socket.off("analytics-updated");
    };
  }, [pollId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-[#097FE8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#64748B] font-medium text-sm tracking-wide animate-pulse">Compiling analytics streaming pipeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 antialiased selection:bg-[#DBEAFE] selection:text-[#097FE8]">
      <div className="max-w-4xl mx-auto">
        
        {/* Dynamic Header Metrics Deck */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
                Live Analytics
              </h1>
            </div>
            <p className="text-[#64748B] font-medium text-sm">
              Real-time response delivery system active and socket connected.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-4 rounded-xl flex items-center gap-4 shadow-sm min-w-[200px]">
            <div className="w-10 h-10 bg-[#F0F7FF] rounded-lg flex items-center justify-center text-[#097FE8]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase font-extrabold text-[#94A3B8] tracking-widest">Total Responses</p>
              <p className="text-xl font-black text-[#0F172A] tracking-tight tabular-nums">
                {analytics?.totalResponses || 0}
              </p>
            </div>
          </div>
        </header>

        {/* Empty State Overlay */}
        {analytics?.totalResponses === 0 && (
          <div className="bg-white border border-[#E2E8F0] p-12 rounded-2xl text-center max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-center mx-auto mb-4 text-xl shadow-inner">
              📡
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-1">Awaiting Feed Inputs</h3>
            <p className="text-[#64748B] text-xs max-w-xs mx-auto leading-relaxed">
              No metrics compiled yet. Share your public pipeline link to stream responses live.
            </p>
          </div>
        )}

        {/* Main Content Component List */}
        <div className="flex flex-col gap-6">
          {analytics?.questions?.map((question) => (
            <div
              key={question.questionId}
              className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm transition-all duration-300 hover:border-[#CBD5E1]"
            >
              <h2 className="text-lg font-bold text-[#0F172A] mb-6 border-l-4 border-[#097FE8] pl-3 leading-snug">
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option) => {
                  const percentage =
                    analytics.totalResponses > 0
                      ? Math.round((option.count / analytics.totalResponses) * 100)
                      : 0;

                  return (
                    <div key={option.optionId} className="space-y-1.5">
                      <div className="flex justify-between items-end text-sm">
                        <span className="font-semibold text-[#334155] max-w-[80%] break-words">
                          {option.text}
                        </span>
                        <span className="text-xs font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-md text-right shrink-0 tabular-nums">
                          {option.count} {option.count === 1 ? 'vote' : 'votes'} ({percentage}%)
                        </span>
                      </div>

                      {/* Progress Track Context */}
                      <div className="w-full h-3 bg-[#F1F5F9] rounded-full overflow-hidden border border-[#F1F5F9]/50">
                        <div
                          className="h-full bg-[#097FE8] rounded-full transition-all duration-500 ease-out shadow-sm"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;