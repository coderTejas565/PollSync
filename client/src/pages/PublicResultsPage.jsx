import { useEffect, useState, } from "react";

import { useParams, } from "react-router-dom";

import { getPublicResults, } from "../api/poll.api";

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
    return <div>Loading...</div>;
  }

  if (!results) {
    return (
      <div>
        Results not available
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-2"> {results.title} </h1>

      <p className="mb-6">
        Total Responses:
        {" "}
        {results.totalResponses}
      </p>

      <div className="flex flex-col gap-6">

        {results.questions.map(
          (
            question,
            questionIndex
          ) => (
            <div key={questionIndex} className="border p-4 rounded">

              <h2 className="text-xl font-semibold mb-4">
                {question.question}
              </h2>

              <div className="flex flex-col gap-3">

                {question.options.map(
                  (
                    option,
                    optionIndex
                  ) => {
                    const percentage = results.totalResponses > 0 ? Math.round((option.count / results.totalResponses) * 100 ) : 0;

                    return (
                      <div key={optionIndex}>
                        <div className="flex justify-between mb-1">
                            <span>{option.text} </span>
                            <span>{ option.count}{" "}votes{" "}({percentage}%)</span>
                        </div>

                        <div className="w-full border rounded h-4 overflow-hidden">
                            <div className="h-full bg-black" style={{
                              width:
                                `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PublicResultsPage;