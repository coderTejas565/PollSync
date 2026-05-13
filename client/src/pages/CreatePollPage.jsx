import { useForm, useFieldArray } from "react-hook-form";
import { createPoll } from "../api/poll.api";
import QuestionBlock from "../pages/QuestionBlock"

const CreatePollPage = () => {
  const {register, control, handleSubmit} = useForm({
    defaultValues:{
      title: "",

      description: "",

      expiresAt: "",

      isAnonymous: true,

      questions: [
        {
          text: "",


          required: false,

          options: [
            {
              text: "",
            }
          ]
        }
      ]
    }
  });

  const {
    fields: questionFields,

    append: addQuestion,

    remove: removeQuestion,
  } = useFieldArray({
    control,

    name: "questions"
  })

  const onSubmit = async (
    data
  ) => {
    try {
      console.log(data);

      await createPoll(data);

      alert("Poll created");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6"
      >

        <input placeholder="Poll title" {...register("title")} className="border p-2"
        />

        <textarea placeholder="Description" {...register("description")}className="border p-2"
        />

        <input type="datetime-local" {...register("expiresAt")}
        className="border p-2"
        />

        <label className="flex gap-2">

          <input type="checkbox" {...register("isAnonymous")}/>
          Anonymous Poll
          </label> 
          <div className="flex flex-col gap-6">
            
            {questionFields.map(
            (question, questionIndex) => (
              <QuestionBlock key={question.id} questionIndex={questionIndex}register={register}
              control={control}
              removeQuestion={removeQuestion}
              />
            )
          )}

        </div>

        <button type="button" onClick={() => 
        addQuestion({
              text: "",
              required: false,
              options: [
                { text: "" },
              ],
            })
          }
          className="border p-2"
        >
          Add Question
        </button>

        <button type="submit" className="border p-2">
          Create Poll
        </button>

      </form>
    </div>
  );
}

export default CreatePollPage;