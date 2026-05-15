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

  const handleSubmit =
async () => {

if (!poll || isClosed)
return;

try {

const formattedAnswers =
Object.entries(
answers
).map(
([questionId, optionId]) => ({

questionId,
optionId

})
);

await submitResponse({

pollId:
poll.id,

answers:
formattedAnswers

});


showSuccess(
"Response submitted successfully!"
);


setAnswers({});


} catch (error) {

showError(

error?.response
?.data
?.message ||

"Failed to submit response"

);

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

<h1 className="text-4xl font-black text-[#0F172A] tracking-tight mb-4">

{poll.title}

</h1>

<p className="text-[#64748B] text-lg">

{poll.description}

</p>


{poll.isExpired && (

<div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-black">

Poll Expired

</div>

)}


{poll.published && (

<div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#DBEAFE] text-[#097FE8] rounded-full text-xs font-black">

🏆 Final Results Published

</div>

)}

</header>



{

!poll.published && (

<div className="space-y-10">

{

poll.questions.map(
(question) => (

<div
key={question.id}
>

<h2 className="text-xl font-bold mb-6">

{question.text}

{question.required &&
<span className="text-[#097FE8]">
*
</span>}

</h2>


<div className="grid gap-3">

{

question.options.map(
(option)=>{

const isSelected =
answers[
question.id
] === option.id;


return (

<button

key={
option.id
}

disabled={
isClosed
}

onClick={()=>

handleSelectOption(
question.id,
option.id
)

}

className={`

p-5
rounded-2xl
border-2
flex
justify-between

${

isSelected

?

"bg-[#F0F7FF] border-[#097FE8]"

:

"bg-white"

}

`}

>

<span>

{option.text}

</span>

</button>

);

}

)

}

</div>

</div>

)

)

}

</div>

)

}



<footer className="mt-16 pt-8 border-t border-[#F1F5F9]">


{

poll.published ? (

<div className="bg-white rounded-3xl p-8 text-center">

<h3 className="text-2xl font-black mb-3">

Voting Closed

</h3>


<p className="text-[#64748B] mb-6">

Final results have been published.

This poll no longer accepts responses.

</p>


<Link

to={`/results/${poll.slug}`}

className="
inline-flex
bg-[#097FE8]
text-white
px-6
py-4
rounded-2xl
font-black
"

>

View Results →

</Link>

</div>

)

:

poll.isExpired ? (

<div className="text-center p-6 bg-white rounded-3xl">

Voting has concluded

</div>

)

:

(

<button

onClick={
handleSubmit
}

className="
w-full
py-5
bg-[#10B981]
text-white
rounded-2xl
font-black
"

>

Cast My Vote

</button>

)

}


<p className="mt-6 text-center text-[10px] font-black text-[#94A3B8]">

Powered by PollSync Real-Time

</p>


</footer>


</div>

</div>
);
};

export default PublicPollPage;