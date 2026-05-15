import { useEffect,useState,} from "react";

import {useParams,} from "react-router-dom";

import {getAnalytics,} from "../api/analytics.api";

import { socket }from "../lib/socket";

const AnalyticsPage = () => {

  const { pollId } =useParams();

  const [analytics,setAnalytics] =useState(null);

  const [loading,setLoading] =useState(true);

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const response =await getAnalytics(pollId);

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

  socket.emit(
    "join-poll",
    pollId
  );

  socket.on(
    "analytics-updated",
    (data) => {

      setAnalytics(data);

    }
  );

  return () => {

    socket.off(
      "analytics-updated"
    );
  };

}, [pollId]);

  if (loading) {
  return <div>Loading...</div>;
}

if (!analytics) {
  return (
    <div>
      Analytics not found
    </div>
  );
}

return (
  <div className="p-6 max-w-3xl mx-auto">

    <h1 className="text-3xl font-bold mb-2">

      Live Analytics

    </h1>

    <p className="mb-6">

      Total Responses:
      {" "}
      {analytics.totalResponses}

    </p>

    <div className="flex flex-col gap-6">

      {analytics.questions.map(
        (question) => (

          <div
            key={question.questionId}
            className="border p-4 rounded"
          >

            <h2 className="text-xl font-semibold mb-4">

              {question.question}

            </h2>

            <div className="flex flex-col gap-3">

              {question.options.map(
                (option) => {

                  const percentage =
                    analytics.totalResponses > 0
                      ? Math.round(
                          (
                            option.count /
                            analytics.totalResponses
                          ) * 100
                        )
                      : 0;

                  return (
                    <div
                      key={option.optionId}
                    >

                      <div className="flex justify-between mb-1">

                        <span>
                          {option.text}
                        </span>

                        <span>
                          {option.count}
                          {" "}
                          votes
                        </span>

                      </div>

                      <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">

                        <div
                          className="h-full bg-[#097FE8] transition-all duration-500"
                          style={{
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

export default AnalyticsPage;