import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicPoll } from "../api/poll.api";
import { submitResponse } from "../api/response.api";

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
      const formattedAnswers = Object.entries(answers).map(([questionId, optionId]) => ({
        questionId,
        optionId,
      }));
      await submitResponse({ pollId: poll.id, answers: formattedAnswers });
      alert("Response submitted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="animate-pulse text-[#097FE8] font-black tracking-widest uppercase">Initializing PollSync...</div>
    </div>
  );

  if (error || !poll) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100 text-center">
        <p className="text-red-600 font-bold">{error || "Poll not found"}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 selection:bg-[#DBEAFE]">
      <div className="max-w-2xl mx-auto">
        
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tight mb-4 leading-tight">
            {poll.title}
          </h1>
          <p className="text-[#64748B] text-lg font-medium leading-relaxed">
            {poll.description}
          </p>
          
          {poll.isExpired && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-black uppercase tracking-wider border border-red-100">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
              Poll Expired
            </div>
          )}
        </header>

        <div className="space-y-10">
          {poll.questions.map((question) => (
            <div key={question.id} className="group">
              <h2 className="text-xl font-extrabold text-[#0F172A] mb-6 flex items-baseline gap-2">
                {question.text}
                {question.required && <span className="text-[#097FE8] text-sm">*</span>}
              </h2>

              <div className="grid gap-3">
                {question.options.map((option) => {
                  const isSelected = answers[question.id] === option.id;
                  
                  return (
                    <button
                      key={option.id}
                      disabled={isClosed}
                      onClick={() => handleSelectOption(question.id, option.id)}
                      className={`
                        relative w-full p-5 rounded-2xl text-left transition-all duration-200 border-2 flex items-center justify-between
                        ${isSelected 
                          ? "bg-[#F0F7FF] border-[#097FE8] shadow-md shadow-blue-100 translate-x-1" 
                          : "bg-white border-[#F1F5F9] hover:border-[#E2E8F0] active:scale-[0.99]"}
                        ${isClosed ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
                      `}
                    >
                      <span className={`font-bold transition-colors ${isSelected ? "text-[#097FE8]" : "text-[#64748B]"}`}>
                        {option.text}
                      </span>
                      
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                        ${isSelected ? "bg-[#097FE8] border-[#097FE8]" : "border-[#E2E8F0]"}`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-[#F1F5F9]">
          {isClosed ? (
            <div className="text-center p-6 bg-white border border-[#F1F5F9] rounded-3xl text-[#64748B] font-bold">
              Voting has concluded for this session.
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full py-5 bg-[#10B981] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-green-100 hover:bg-[#0da673] hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
            >
              Cast My Vote
            </button>
          )}
          
          <p className="mt-6 text-center text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
            Powered by PollSync Real-Time
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PublicPollPage;