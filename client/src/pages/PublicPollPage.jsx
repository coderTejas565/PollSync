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
        console.log(err);
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

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    if (!poll || isClosed) return;

    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, optionId]) => ({
          questionId,
          optionId,
        })
      );

      await submitResponse({
        pollId: poll.id,
        answers: formattedAnswers,
      });

      alert("Response submitted");
    } catch (error) {
      console.log(error);
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  // Not found state
  if (!poll) {
    return <div>Poll not found</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-2">
        {poll.title}
      </h1>

      {poll.isExpired && (
        <div className="p-3 mb-4 border text-red-600">
          This poll has expired. You can no longer submit responses.
        </div>
      )}

      <p className="mb-6">{poll.description}</p>

      <div className="flex flex-col gap-6">
        {poll.questions.map((question) => (
          <div
            key={question.id}
            className="border p-4 rounded"
          >
            <h2 className="text-xl font-semibold mb-4">
              {question.text}
              {question.required && " *"}
            </h2>

            <div className="flex flex-col gap-2">
              {question.options.map((option) => (
                <label
                  key={option.id}
                  className="flex gap-2"
                >
                  <input
                    type="radio"
                    name={question.id}
                    checked={
                      answers[question.id] === option.id
                    }
                    disabled={isClosed}
                    onChange={() =>
                      handleSelectOption(
                        question.id,
                        option.id
                      )
                    }
                  />
                  {option.text}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isClosed ? (
        <div className="border p-3 mt-6 text-red-600">
          Voting is closed for this poll.
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          className="border px-4 py-2 mt-6"
        >
          Submit Response
        </button>
      )}
    </div>
  );
};

export default PublicPollPage;