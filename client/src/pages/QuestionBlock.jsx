import { useFieldArray,} from "react-hook-form";

const QuestionBlock = ({
  questionIndex,
  register,
  control,
  removeQuestion,
}) => {

  const {
    fields: optionFields,

    append: addOption,

    remove: removeOption,
  } = useFieldArray({
    control,

    name:
      `questions.${questionIndex}.options`,
  });

  return (
    <div className="border p-4 rounded flex flex-col gap-4">

      <input placeholder="Question" {...register(
          `questions.${questionIndex}.text`
        )}
        className="border p-2"
      />

      <label className="flex gap-2">

        <input type="checkbox"
          {...register(
            `questions.${questionIndex}.required`
          )}
        />

        Required
      </label>

      <div className="flex flex-col gap-2">

        {optionFields.map(
          (option, optionIndex) => (
            <div
              key={option.id}
              className="flex gap-2"
            >

              <input placeholder="Option"
                {...register(
                  `questions.${questionIndex}.options.${optionIndex}.text`
                )}
                className="border p-2 flex-1"
              />

              <button type="button"
                onClick={() =>
                  removeOption(
                    optionIndex
                  )
                }
                className="border px-2"
              >
                X
              </button>

            </div>
          )
        )}

      </div>

      <button type="button"
        onClick={() =>
          addOption({
            text: "",
          })
        }
        className="border p-2"
      >
        Add Option
      </button>

      <button type="button"
        onClick={() =>
          removeQuestion(
            questionIndex
          )
        }
        className="border p-2"
      >
        Remove Question
      </button>

    </div>
  );
};

export default QuestionBlock;