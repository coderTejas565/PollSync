import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { publishPoll, getMyPolls } from "../api/poll.api";

const DashboardPage = () =>{
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await getMyPolls()

        setPolls(response.data)
      } catch (error) {
        console.log(error);
        
      }finally{
        setLoading(false)
      }
    }
    fetchPolls();
  }, [])

  const handlePublish =
  async (pollId) => {
    try {
      await publishPoll(pollId);

      alert(
        "Poll published"
      );

      setPolls((prev) =>
        prev.map((poll) =>
          poll.id === pollId
            ? {
                ...poll,
                published: true,
              }
            : poll
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  return(
   <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          My Polls
        </h1>

        <Link to="/create" className="border px-4 py-2">
          Create Poll
        </Link>
      </div>

      <div className="grid gap-4">

        { polls.length === 0 && ( <p>No polls created yet.</p>)}

        {polls.map((poll) => (
          <div key={poll.id} className="border p-4 rounded"
          >
            <h2 className="text-xl font-semibold">
              {poll.title}
            </h2>

            <p>
              Responses:
              {" "}
              {poll.totalResponses}
            </p>

            <p>
              Published:
              {" "}
              {poll.published
                ? "Yes"
                : "No"}
            </p>

            <p>
              Expires:
              {" "}
              {new Date(
                poll.expiresAt
              ).toLocaleString()}
            </p>

            <div className="flex gap-4 mt-4">

              { !poll.published && ( <button onClick={() => handlePublish(poll.id)

              } className="border px-3 py-1"> Publish Results </button> ) }
              <Link
                to={`/poll/${poll.slug}`}
                className="border px-3 py-1"
              >
                Open Poll
              </Link>

              <Link
                to={`/poll/${poll.slug}/results`}
                className="border px-3 py-1"
              >
                Results
              </Link>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default DashboardPage