import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicResults } from "../api/poll.api";

const PublicResultsPage = () => {
  const { slug } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getPublicResults(slug);
        setResults(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center antialiased">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-[#097FE8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#64748B] font-bold tracking-widest uppercase text-[10px]">Fetching Live Metrics Pipeline...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 antialiased">
        <div className="bg-white p-8 rounded-2xl max-w-sm w-full shadow-sm border border-[#E2E8F0] text-center">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xl mx-auto mb-4">🔒</div>
          <p className="text-[#0F172A] font-black text-lg tracking-tight mb-1">Results Unavailable</p>
          <p className="text-[#64748B] text-xs leading-relaxed font-medium">This metrics deck might be private, restricted, or the slug context doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 antialiased selection:bg-[#DBEAFE] selection:text-[#097FE8]">
      <div className="max-w-2xl mx-auto">
        
        {/* Core Presentation Header */}
        <header className="mb-12 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#E0F2FE] border border-[#BFDBFE] text-[#097FE8] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#097FE8] rounded-full animate-pulse"></span>
            Public Analytics Deck
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
            {results.title}
          </h1>
          
          {/* Main Response Overview Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-2 rounded-xl shadow-sm text-sm font-semibold text-[#475569]">
            <span className="text-[#64748B]">Total Accumulated Responses:</span>
            <span className="text-[#0F172A] font-black tabular-nums bg-[#F1F5F9] px-2 py-0.5 rounded-md text-xs">
              {results.totalResponses}
            </span>
          </div>
        </header>

        {/* Analytics Card Deck Grid */}
        <div className="flex flex-col gap-6">
          {results.questions.map((question, questionIndex) => (
            <div 
              key={questionIndex} 
              className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-2xl shadow-sm hover:border-[#CBD5E1] transition-all duration-200"
            >
              <h2 className="text-lg font-bold text-[#0F172A] mb-6 border-l-4 border-[#097FE8] pl-3 leading-snug">
                {question.question}
              </h2> 

              <div className="flex flex-col gap-5">
                {question.options.map((option, optionIndex) => {
                  const percentage = results.totalResponses > 0 
                    ? Math.round((option.count / results.totalResponses) * 100) 
                    : 0;

                  // Highlighting logic: Identify if this specific index is the dominant leader
                  const maxVotes = Math.max(...question.options.map(o => o.count));
                  const isLeader = option.count === maxVotes && maxVotes > 0;

                  return (
                    <div key={optionIndex} className="group space-y-1.5">
                      <div className="flex justify-between items-end text-sm">
                        <span className="font-semibold text-[#334155] group-hover:text-[#0F172A] transition-colors max-w-[75%] break-words">
                          {option.text}
                        </span>
                        <span className={`text-xs font-bold tabular-nums px-2 py-0.5 rounded-md transition-colors shrink-0 ${
                          isLeader 
                            ? "bg-[#DCFCE7] text-[#15803D] font-extrabold" 
                            : "text-[#64748B] bg-[#F1F5F9]"
                        }`}>
                          {option.count} {option.count === 1 ? 'vote' : 'votes'} ({percentage}%)
                        </span>
                      </div>

                      {/* Tracks & Progress Pipelines */}
                      <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden border border-[#F1F5F9]/50">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            isLeader 
                              ? "bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.2)]" 
                              : "bg-[#097FE8] shadow-[0_0_12px_rgba(9,127,232,0.15)]"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Action Controls Footer */}
        <footer className="mt-12 text-center">
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 text-[#64748B] hover:text-[#097FE8] bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sync Live Deck
          </button>
        </footer>

      </div>
    </div>
  );
};

export default PublicResultsPage;