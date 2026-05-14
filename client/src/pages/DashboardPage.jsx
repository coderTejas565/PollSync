import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publishPoll, getMyPolls } from "../api/poll.api";

const DashboardPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await getMyPolls();
        setPolls(response?.data || []);
      } catch (error) {
        setError("Failed to load polls. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  const handlePublish = async (pollId) => {
    try {
      await publishPoll(pollId);
      setPolls((prev) =>
        prev.map((poll) =>
          poll.id === pollId ? { ...poll, published: true } : poll
        )
      );
    } catch (error) {
      setError("Failed to publish results.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#097FE8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#64748B] font-medium">Syncing your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] antialiased">
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              PollSync
            </h1>
            <p className="text-[#64748B] font-medium">
              You have <span className="text-[#097FE8]">{polls.length}</span> total polls.
            </p>
          </div>

          <Link
            to="/create"
            className="bg-[#097FE8] hover:bg-[#0866ba] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 flex items-center gap-2"
          >
            <span>+</span> Create New Poll
          </Link>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            {error}
          </div>
        )}

        {polls.length === 0 && (
          <div className="bg-white border border-[#F1F5F9] p-16 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">No Polls Found</h3>
            <p className="text-[#64748B] mb-6 max-w-xs mx-auto">Create your first real-time poll to start collecting live feedback.</p>
            <Link to="/create" className="text-[#097FE8] font-bold hover:text-[#0866ba] flex items-center justify-center gap-2">
              Create your first poll <span>→</span>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
          {polls.map((poll) => {
            const isExpired = new Date(poll.expiresAt) < new Date();

            return (
              <div
                key={poll.id}
                className="group bg-white border border-[#F1F5F9] rounded-2xl p-6 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-[#0F172A] group-hover:text-[#097FE8] transition-colors">
                      {poll.title}
                    </h2>
                    <p className="text-sm text-[#64748B] flex items-center gap-2">
                      <span>Expires:</span>
                      <span className="font-medium text-[#0F172A]">
                        {poll.expiresAt ? new Date(poll.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Indefinite"}
                      </span>
                    </p>
                  </div>

                  <div
                    className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${
                      poll.published
                        ? "bg-[#DCFCE7] text-[#10B981]" // Winner Green
                        : isExpired
                        ? "bg-red-50 text-red-500"
                        : "bg-[#DBEAFE] text-[#097FE8]" // Pulse Blue
                    }`}
                  >
                    {poll.published ? "Published" : isExpired ? "Expired" : "Live"}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-[#F8FAFC] rounded-xl p-4 mb-6">
                  <div>
                    <p className="text-[10px] uppercase font-black text-[#94A3B8] tracking-widest mb-1">Votes</p>
                    <p className="text-xl font-bold text-[#0F172A]">{poll.totalResponses || 0}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase font-black text-[#94A3B8] tracking-widest mb-1">Slug</p>
                    <p className="text-sm font-mono font-medium text-[#64748B] truncate">/{poll.slug}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-5">
                  <div className="flex gap-2">
                    <Link
                      to={`/poll/${poll.slug}`}
                      className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#64748B] text-xs font-bold rounded-lg hover:border-[#097FE8] hover:text-[#097FE8] transition-all"
                    >
                      Public Link
                    </Link>
                    {!poll.published && (
                      <button
                        onClick={() => handlePublish(poll.id)}
                        className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#0F172A] text-xs font-bold rounded-lg hover:bg-[#F8FAFC] transition-all"
                      >
                        Publish Results
                      </button>
                    )}
                  </div>

                  <Link
                    to={`/poll/${poll.slug}/results`}
                    className="px-5 py-2 bg-[#0F172A] text-white text-xs font-bold rounded-lg hover:bg-black transition-all shadow-sm flex items-center gap-2"
                  >
                    Manage Results
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;