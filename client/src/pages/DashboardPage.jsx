import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publishPoll, getMyPolls, deletePoll } from "../api/poll.api";
import { socket } from "../lib/socket";
import { showSuccess,showError } from "../utils/toast";

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

                totalResponses:
                  data.totalResponses,
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
  className="
    group
    flex items-center gap-2
    px-4 py-2 
    bg-[#F0F7FF] 
    border border-[#DBEAFE] 
    text-[#097FE8] 
    text-[11px] font-black uppercase tracking-widest 
    rounded-xl 
    hover:bg-[#097FE8] hover:text-white hover:border-[#097FE8]
    hover:shadow-lg hover:shadow-blue-100
    active:scale-95 
    transition-all duration-300
  "
>
  {/* Signal Icon */}
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-4 w-4" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2.5} 
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
    />
  </svg>
  
  Publish Results
</button>

                    )}
                  </div>

<button 
  onClick={() => hadleDelete(poll.id)}
  className="
    group
    flex items-center gap-2
    px-3 py-2 
    rounded-xl
    text-[11px] font-black uppercase tracking-widest
    text-[#94A3B8] 
    bg-transparent
    border border-transparent
    hover:text-red-600 hover:bg-red-50 hover:border-red-100
    active:scale-95
    transition-all duration-200
  "
>
  {/* Modern Trash Icon */}
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-4 w-4 transition-transform group-hover:rotate-12" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2.5} 
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
    />
  </svg>
  Delete
</button>

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