import {useEffect,useState,} from "react";

import { useParams, } from "react-router-dom";

import { getPublicPoll, } from "../api/poll.api";

import { submitResponse, } from "../api/response.api";

const PublicPollPage = () => {
  const { slug } = useParams();

  const [poll, setPoll] = useState(null);

  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoll =
      async () => {
        try {
          const response =
          await getPublicPoll(slug);
          setPoll(response.poll);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchPoll();
  }, [slug]);

  const handleSelectOption = (
    questionId,
    optionId
  ) => {
    setAnswers((prev) => ({
      ...prev,

      [questionId]: optionId,
    }));
  };

  const handleSubmit =
    async () => {
      try {
        const formattedAnswers =
          Object.entries(
            answers
          ).map(
            ([
              questionId,
              optionId,
            ]) => ({
              questionId,

              optionId,
            })
          );

        await submitResponse({
          pollId: poll.id,

          answers:
            formattedAnswers,
        });

        alert(
          "Response submitted"
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!poll) {
    return (
      <div>Poll not found</div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-2">{poll.title} </h1>

      <p className="mb-6"> {poll.description}</p>

      <div className="flex flex-col gap-6">

        {poll.questions.map(
          (question) => (
            <div key={question.id} className="border p-4 rounded">

              <h2 className="text-xl font-semibold mb-4">

                {question.text}

                {question.required && " *"}
              </h2>

              <div className="flex flex-col gap-2">

                {question.options.map(
                  (option) => (
                    <label key={option.id} className="flex gap-2">

                      <input type="radio" name={question.id}checked={answers[question.id] ===option.id} onChange={() =>
                          handleSelectOption(question.id,option.id)
                        } />
                         {option.text} 
                    </label>
                  )
                )}
              </div>
            </div>
          )
        )}

      </div>

      <button onClick={handleSubmit}className="border px-4 py-2 mt-6">
        Submit Response
      </button>

    </div>
  );
};

export default PublicPollPage;