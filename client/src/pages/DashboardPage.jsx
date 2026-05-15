import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publishPoll, getMyPolls, deletePoll } from "../api/poll.api";
import { socket } from "../lib/socket";
import { showSuccess, showError } from "../utils/toast";

const DashboardPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await getMyPolls();
        const fetchedPolls = response?.data || [];

        setPolls(fetchedPolls);

        fetchedPolls.forEach((poll) => {
          socket.emit(
            "join-poll",
            poll.id
          );
        });
      } catch (error) {
        setError("Failed to load polls. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  useEffect(() => {
    socket.on(
      "new-response",
      (data) => {
        setPolls((prev) =>
          prev.map((poll) =>
            poll.id === data.pollId
              ? {
                  ...poll,
                  totalResponses: data.totalResponses,
                }
              : poll
          )
        );
      }
    );

    return () => {
      socket.off(
        "new-response"
      );
    };
  }, []);

  const handlePublish = async (pollId) => {
    try {
      await publishPoll(pollId);
      setPolls((prev) =>
        prev.map((poll) =>
          poll.id === pollId ? { ...poll, published: true } : poll
        )
      );
      showSuccess("Results published successfully");
    } catch (error) {
      showError("Failed to publish results.");
    }
  };

  const hadleDelete = async (pollId) => {
    try {
      await deletePoll(pollId)
      setPolls((prev)=> prev.filter((poll) => poll.id !== pollId))
      showSuccess("Poll Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-[#097FE8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#64748B] font-medium text-sm tracking-wide animate-pulse">Syncing your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] antialiased selection:bg-[#DBEAFE] selection:text-[#097FE8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-12 pb-6 border-b border-[#E2E8F0]">
          <div>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mb-1">
              PollSync <span className="text-[#097FE8]">.</span>
            </h1>
            <p className="text-[#64748B] font-medium text-sm">
              Keep track of your audience. You have <span className="text-[#097FE8] font-bold bg-[#E0F2FE] px-2 py-0.5 rounded-md">{polls.length}</span> active workspaces.
            </p>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center justify-center gap-2 bg-[#097FE8] hover:bg-[#0866ba] text-white px-5 py-3 rounded-xl font-bold transition-all duration-200 shadow-md shadow-blue-100 active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create New Poll
          </Link>
        </header>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium animate-fadeIn">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            {error}
          </div>
        )}

        {/* Empty Slate State */}
        {polls.length === 0 && (
          <div className="bg-white border border-[#E2E8F0] p-16 rounded-2xl text-center max-w-xl mx-auto shadow-sm transform transition-all">
            <div className="w-16 h-16 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl shadow-inner">
              📊
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">No Polls Found</h3>
            <p className="text-[#64748B] text-sm mb-6 max-w-xs mx-auto leading-relaxed">Create your first real-time poll to start collecting live data instantly.</p>
            <Link to="/create" className="inline-flex items-center gap-2 text-[#097FE8] font-bold hover:text-[#0866ba] transition-colors text-sm group">
              Create your first poll <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        )}

        {/* Card Grid Space Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {polls.map((poll) => {
            const isExpired = new Date(poll.expiresAt) < new Date();

            return (
              <div
                key={poll.id}
                className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Status Head */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="space-y-1 max-w-[75%]">
                      <h2 className="text-lg font-bold text-[#0F172A] group-hover:text-[#097FE8] transition-colors line-clamp-2 leading-snug">
                        {poll.title}
                      </h2>
                      <div className="text-xs text-[#64748B] flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Expires:</span>
                        <span className="font-semibold text-[#334155]">
                          {poll.expiresAt ? new Date(poll.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Indefinite"}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm transition-all duration-300 ${
                        poll.published
                          ? "bg-[#DCFCE7] text-[#10B981] border border-[#BBF7D0]" 
                          : isExpired
                          ? "bg-red-50 text-red-500 border border-red-100"
                          : "bg-[#DBEAFE] text-[#097FE8] border border-[#BFDBFE] animate-pulse" 
                      }`}
                    >
                      {poll.published ? "Published" : isExpired ? "Expired" : "Live"}
                    </div>
                  </div>

                  {/* Operational Mini Metrics Shelf */}
                  <div className="grid grid-cols-3 gap-3 bg-[#F8FAFC] rounded-xl p-3.5 mb-6 border border-[#F1F5F9]">
                    <div className="transition-all duration-300 transform group-hover:scale-[1.02]">
                      <p className="text-[9px] uppercase font-bold text-[#94A3B8] tracking-wider mb-0.5">Responses</p>
                      <p className="text-lg font-black text-[#0F172A] tracking-tight tabular-nums">
                        {poll.totalResponses || 0}
                      </p>
                    </div>
                    <div className="col-span-2 border-l border-[#E2E8F0] pl-3">
                      <p className="text-[9px] uppercase font-bold text-[#94A3B8] tracking-wider mb-0.5">Route Namespace</p>
                      <p className="text-xs font-mono font-medium text-[#475569] truncate bg-white px-2 py-0.5 border border-[#E2E8F0] rounded mt-0.5">
                        /{poll.slug}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Split Context Toolbars */}
                <div className="space-y-3 pt-4 border-t border-[#F1F5F9]">
                  {/* Action row 1: Links and Core workflows */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/poll/${poll.slug}`}
                        className="px-3 py-1.5 bg-white border border-[#E2E8F0] text-[#64748B] text-xs font-bold rounded-lg hover:border-[#097FE8] hover:text-[#097FE8] transition-all duration-150 active:scale-95"
                      >
                        Public Link
                      </Link>
                      
                      <Link 
                        to={`/dashboard/poll/${poll.id}/analytics`}
                        className="px-3 py-1.5 bg-white border border-[#E2E8F0] text-[#64748B] text-xs font-bold rounded-lg hover:border-[#475569] hover:text-[#0F172A] transition-all duration-150 active:scale-95"
                      >
                        Analytics
                      </Link>
                    </div>

                    <Link
                      to={`/poll/${poll.slug}/results`}
                      className="px-3 py-1.5 bg-[#0F172A] text-white text-xs font-bold rounded-lg hover:bg-black transition-all duration-150 active:scale-95 shadow-sm"
                    >
                      Manage
                    </Link>
                  </div>

                  {/* Action row 2: Destruction / State modifications */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button 
                      onClick={() => hadleDelete(poll.id)}
                      className="group/btn flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold text-[#94A3B8] hover:text-red-600 hover:bg-red-50 transition-all duration-200 active:scale-95"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-3.5 w-3.5 transition-transform group-hover/btn:rotate-12" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Workspace
                    </button>

                    {!poll.published && (
                      <button
                        onClick={() => handlePublish(poll.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0F7FF] border border-[#DBEAFE] text-[#097FE8] text-xs font-bold rounded-lg hover:bg-[#097FE8] hover:text-white hover:border-[#097FE8] active:scale-95 transition-all duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Publish Results
                      </button>
                    )}
                  </div>
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