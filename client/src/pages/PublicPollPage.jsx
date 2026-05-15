import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicPoll } from "../api/poll.api";
import { submitResponse } from "../api/response.api";
import { showSuccess, showError } from "../utils/toast";

const PublicPollPage = () => {
  const { slug } = useParams();
  const [poll, setPoll] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        setLoading(true);
        const response = await getPublicPoll(slug);
        setPoll(response.poll);
      } catch (err) {
        setError("Failed to load poll");
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [slug]);

  const isClosed = poll?.isExpired || poll?.published;

  const handleSelectOption = (questionId, optionId) => {
    if (isClosed) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    if (!poll || isClosed) return;

    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, optionId]) => ({
          questionId,
          optionId
        })
      );

      await submitResponse({
        pollId: poll.id,
        answers: formattedAnswers
      });

      showSuccess("Response submitted successfully!");
      setAnswers({});
    } catch (error) {
      showError(
        error?.response?.data?.message || "Failed to submit response"
      );
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-4 border-[#097FE8] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#64748B] text-sm font-bold tracking-widest uppercase animate-pulse">Initializing PollSync...</p>
      </div>
    </div>
  );

  if (error || !poll) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 antialiased">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-sm border border-red-100 text-center transform transition-all">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4 text-xl">⚠️</div>
        <p className="text-red-600 font-bold text-sm tracking-wide">{error || "Poll context not found"}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 antialiased selection:bg-[#DBEAFE] selection:text-[#097FE8]">
      <div className="max-w-2xl mx-auto">

        {/* Voter Interface Header Meta */}
        <header className="mb-12 text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight max-w-xl mx-auto">
            {poll.title}
          </h1>
          <p className="text-[#64748B] font-medium text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            {poll.description}
          </p>

          {poll.isExpired && (
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              Poll Expired
            </div>
          )}

          {poll.published && (
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[#E0F2FE] border border-[#BFDBFE] text-[#097FE8] rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
              🏆 Final Results Published
            </div>
          )}
        </header>

        {/* Dynamic Questionnaire Form Grid */}
        {!poll.published && (
          <div className="space-y-8">
            {poll.questions.map((question) => (
              <div
                key={question.id}
                className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-2xl shadow-sm space-y-5"
              >
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug flex items-start gap-1">
                  <span>{question.text}</span>
                  {question.required && (
                    <span className="text-[#097FE8] text-sm font-black" title="Required Metric">*</span>
                  )}
                </h2>

                <div className="grid gap-3">
                  {question.options.map((option) => {
                    const isSelected = answers[question.id] === option.id;

                    return (
                      <button
                        key={option.id}
                        disabled={isClosed}
                        onClick={() => handleSelectOption(question.id, option.id)}
                        className={`p-4 sm:p-5 rounded-xl border-2 text-left font-semibold text-sm transition-all duration-150 relative overflow-hidden flex items-center justify-between group/opt ${
                          isSelected
                            ? "bg-[#F0F7FF] border-[#097FE8] text-[#097FE8] shadow-sm"
                            : "bg-white border-[#E2E8F0] text-[#334155] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] disabled:hover:bg-white disabled:hover:border-[#E2E8F0]"
                        }`}
                      >
                        <span className="max-w-[90%] break-words">{option.text}</span>
                        
                        {/* Interactive selection indicator node */}
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isSelected 
                            ? "border-[#097FE8] bg-[#097FE8]" 
                            : "border-[#CBD5E1] bg-white group-hover/opt:border-[#94A3B8]"
                        }`}>
                          {isSelected && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-scaleUp"></div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Workflow Pipeline Action Blocks */}
        <footer className="mt-12 pt-8 border-t border-[#E2E8F0]">
          {poll.published ? (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center shadow-sm max-w-md mx-auto">
              <h3 className="text-xl font-black text-[#0F172A] mb-2">Voting Pipeline Closed</h3>
              <p className="text-[#64748B] text-sm mb-6 leading-relaxed">
                Final response arrays have been published. This terminal workspace no longer accepts incoming records.
              </p>
              <Link
                to={`/results/${poll.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-[#097FE8] hover:bg-[#0866ba] text-white px-6 py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider shadow-md shadow-blue-100 active:scale-[0.98] transition-all"
              >
                View System Results
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ) : poll.isExpired ? (
            <div className="text-center p-6 bg-white border border-[#E2E8F0] rounded-xl text-sm font-bold text-[#64748B] max-w-xs mx-auto shadow-sm">
              ⌛ Voting window has concluded
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-[#10B981] hover:bg-[#0d9668] text-white text-base font-extrabold uppercase tracking-widest rounded-xl shadow-md shadow-emerald-100 active:scale-[0.99] transition-all duration-150 inline-flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cast My Vote
            </button>
          )}

          <p className="mt-8 text-center text-[9px] font-extrabold text-[#94A3B8] uppercase tracking-widest">
            Powered by PollSync Real-Time Pipeline
          </p>
        </footer>

      </div>
    </div>
  );
};

export default PublicPollPage;