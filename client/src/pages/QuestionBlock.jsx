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
    <div className="group bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200 relative overflow-hidden">
      
      {/* Component Index Badge Tag */}
      <div className="absolute top-0 left-0 bg-[#F1F5F9] border-r border-b border-[#E2E8F0] text-[#64748B] text-[9px] font-black px-3 py-1 rounded-br-xl uppercase tracking-widest">
        Component Matrix {questionIndex + 1}
      </div>

      <div className="flex flex-col gap-6 mt-4">
        
        {/* Core Block Heading Entry */}
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input
              placeholder="What query or metric would you like to collect?"
              {...register(`questions.${questionIndex}.text`)}
              className="w-full text-lg font-bold text-[#0F172A] border-b-2 border-[#E2E8F0] focus:border-[#097FE8] outline-none pb-2 transition-colors placeholder:text-[#CBD5E1]"
            />
          </div>
          
          <button
            type="button"
            onClick={() => removeQuestion(questionIndex)}
            className="text-[#94A3B8] hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all active:scale-95 shrink-0"
            title="Remove Question Block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Global Enforcement Toggle */}
        <div className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#F1F5F9] px-3 py-2 rounded-xl w-fit">
          <input
            type="checkbox"
            id={`req-${questionIndex}`}
            {...register(`questions.${questionIndex}.required`)}
            className="w-4 h-4 rounded border-[#CBD5E1] text-[#097FE8] focus:ring-[#097FE8]/20 focus:ring-offset-0 cursor-pointer"
          />
          <label 
            htmlFor={`req-${questionIndex}`} 
            className="text-xs font-bold text-[#475569] hover:text-[#0F172A] cursor-pointer select-none transition-colors"
          >
            Mandatory Requirement Flag
          </label>
        </div>

        {/* Dynamic Nested Option Array */}
        <div className="space-y-3 pl-4 border-l-2 border-[#E2E8F0] focus-within:border-[#097FE8] transition-colors duration-200">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-[#94A3B8]">Response Option Anchors</p>
            <span className="text-[10px] font-bold text-[#94A3B8] tabular-nums bg-[#F8FAFC] px-1.5 py-0.5 rounded border border-[#F1F5F9]">
              {optionFields.length} Allocated
            </span>
          </div>
          
          <div className="space-y-2.5">
            {optionFields.map((option, optionIndex) => (
              <div key={option.id} className="flex gap-3 group/option items-center transition-all animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1] group-focus-within/option:bg-[#097FE8] group-focus-within/option:scale-125 transition-all shrink-0"></div>
                
                <input
                  placeholder={`Option ${optionIndex + 1} selection namespace...`}
                  {...register(`questions.${questionIndex}.options.${optionIndex}.text`)}
                  className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2 text-[#0F172A] font-semibold text-sm focus:bg-white focus:border-[#097FE8] focus:ring-4 focus:ring-[#097FE8]/5 outline-none transition-all placeholder:text-[#CBD5E1]"
                />

                {optionFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(optionIndex)}
                    className="text-[#CBD5E1] hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all active:scale-95 shrink-0"
                    title="Delete Option"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Append Option Interaction Trigger */}
          <div className="pt-1.5">
            <button
              type="button"
              onClick={() => addOption({ text: "" })}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#097FE8] hover:text-[#0866ba] bg-[#F0F7FF] hover:bg-[#E0F2FE] px-3 py-1.5 rounded-lg transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Option Node
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBlock;