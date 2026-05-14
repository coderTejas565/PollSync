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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#097FE8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#64748B] font-bold tracking-widest uppercase text-xs">Fetching Live Data</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#F1F5F9] text-center">
          <p className="text-[#0F172A] font-bold text-lg">Results not available</p>
          <p className="text-[#64748B] text-sm">This poll might be private or doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-10 text-center">
          <span className="inline-block bg-[#DBEAFE] text-[#097FE8] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4">
            Live Analytics
          </span>
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tight mb-2">
            {results.title}
          </h1>
          <p className="text-[#64748B] font-medium">
            Total Responses: <span className="text-[#0F172A] font-bold">{results.totalResponses}</span>
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {results.questions.map((question, questionIndex) => (
            <div 
              key={questionIndex} 
              className="bg-white border border-[#F1F5F9] p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h2 className="text-xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                {question.question}
              </h2>

              <div className="flex flex-col gap-5">
                {question.options.map((option, optionIndex) => {
                  const percentage = results.totalResponses > 0 
                    ? Math.round((option.count / results.totalResponses) * 100) 
                    : 0;

                  return (
                    <div key={optionIndex} className="group">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                          {option.text}
                        </span>
                        <span className="text-xs font-black text-[#0F172A] bg-[#F8FAFC] px-2 py-1 rounded-md">
                          {option.count} votes ({percentage}%)
                        </span>
                      </div>

                      <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-[#097FE8] rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(9,127,232,0.3)]" 
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

        <div className="mt-12 text-center">
            <button 
              onClick={() => window.location.reload()}
              className="text-[#64748B] hover:text-[#097FE8] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Results
            </button>
        </div>
      </div>
    </div>
  );
};

export default PublicResultsPage;