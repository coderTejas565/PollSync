import { useFieldArray } from "react-hook-form";

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
    name: `questions.${questionIndex}.options`,
  });

  return (
    <div className="group bg-white border border-[#F1F5F9] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
      <div className="absolute top-0 left-0 bg-[#F1F5F9] text-[#64748B] text-[10px] font-black px-3 py-1 rounded-br-lg uppercase tracking-wider">
        Question {questionIndex + 1}
      </div>

      <div className="flex flex-col gap-5 mt-2">
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <input
              placeholder="What would you like to ask?"
              {...register(`questions.${questionIndex}.text`)}
              className="w-full text-xl font-bold text-[#0F172A] border-b-2 border-[#F8FAFC] focus:border-[#097FE8] outline-none pb-1 transition-colors placeholder:text-[#CBD5E1]"
            />
          </div>
          
          <button
            type="button"
            onClick={() => removeQuestion(questionIndex)}
            className="text-[#94A3B8] hover:text-red-500 transition-colors p-1"
            title="Remove Question"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`req-${questionIndex}`}
            {...register(`questions.${questionIndex}.required`)}
            className="w-4 h-4 rounded border-[#CBD5E1] text-[#097FE8] focus:ring-[#097FE8]"
          />
          <label htmlFor={`req-${questionIndex}`} className="text-sm font-bold text-[#64748B] cursor-pointer select-none">
            Mark as Required
          </label>
        </div>

        <div className="space-y-3 pl-2 border-l-2 border-[#F1F5F9]">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-2">Options</p>
          
          {optionFields.map((option, optionIndex) => (
            <div key={option.id} className="flex gap-3 group/option items-center">
              <div className="w-2 h-2 rounded-full bg-[#E2E8F0] group-focus-within/option:bg-[#097FE8] transition-colors"></div>
              
              <input
                placeholder={`Option ${optionIndex + 1}`}
                {...register(`questions.${questionIndex}.options.${optionIndex}.text`)}
                className="flex-1 bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl px-4 py-2 text-[#0F172A] font-medium text-sm focus:bg-white focus:border-[#097FE8] focus:ring-4 focus:ring-[#097FE8]/5 outline-none transition-all placeholder:text-[#CBD5E1]"
              />

              {optionFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOption(optionIndex)}
                  className="text-[#CBD5E1] hover:text-red-400 transition-colors px-2"
                >
                  <span className="text-lg">&times;</span>
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addOption({ text: "" })}
            className="mt-2 ml-5 text-sm font-bold text-[#097FE8] hover:text-[#0866ba] transition-colors flex items-center gap-1"
          >
            <span className="text-lg">+</span> Add Option
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBlock;