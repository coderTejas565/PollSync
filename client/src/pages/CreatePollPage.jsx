import { useForm, useFieldArray } from "react-hook-form";
import { createPoll } from "../api/poll.api";
import QuestionBlock from "../pages/QuestionBlock";
import { showSuccess, showError } from "../utils/toast";

const CreatePollPage = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      expiresAt: "",
      isAnonymous: true,
      questions: [
        {
          text: "",
          required: false,
          options: [{ text: "" }],
        },
      ],
    },
  });

  const {
    fields: questionFields,
    append: addQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data) => {
    try {
      await createPoll(data);
      showSuccess("Poll created successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 antialiased selection:bg-[#DBEAFE] selection:text-[#097FE8]">
      <div className="max-w-3xl mx-auto">
        
        {/* Page Meta Headline */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mb-2">
            Create New Poll<span className="text-[#097FE8]">.</span>
          </h1>
          <p className="text-[#64748B] font-medium text-sm">
            Configure your global tracking context and structure live interactive elements.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Base Form Parameters Wrapper */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6">
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8] mb-2 block">
                Poll Workspace Title
              </label>
              <input 
                placeholder="e.g., Q3 Product Sprint Review" 
                {...register("title")} 
                className="w-full text-xl font-bold text-[#0F172A] border-b-2 border-[#E2E8F0] focus:border-[#097FE8] outline-none pb-2.5 transition-colors placeholder:text-[#CBD5E1]"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8] mb-2 block">
                Context Description
              </label>
              <textarea 
                placeholder="Provide details or scope guidelines for your voters..." 
                {...register("description")}
                className="w-full text-sm text-[#475569] font-medium bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] focus:border-[#097FE8] focus:bg-white outline-none transition-all resize-none h-24 placeholder:text-[#94A3B8]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-center">
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8] mb-2 block">
                  Automated Expiry Constraint
                </label>
                <input 
                  type="datetime-local" 
                  {...register("expiresAt")}
                  className="w-full p-3 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A] font-semibold focus:border-[#097FE8] focus:ring-4 focus:ring-[#097FE8]/5 outline-none transition-all bg-[#F8FAFC] focus:bg-white"
                />
              </div>

              <div className="md:pt-6 flex items-center h-full">
                <label className="flex items-center gap-3 cursor-pointer group unselectable">
                  <div className="relative">
                    <input type="checkbox" {...register("isAnonymous")} className="sr-only peer"/>
                    <div className="w-11 h-6 bg-[#E2E8F0] peer-checked:bg-[#097FE8] rounded-full transition-colors duration-200"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow peer-checked:translate-x-5"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#334155] group-hover:text-[#0F172A] transition-colors">
                      Anonymous Submissions
                    </span>
                    <span className="text-[11px] text-[#64748B] font-medium leading-none mt-0.5">
                      Hide personal details on responses
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Core Dynamic Content Block */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[11px] font-extrabold text-[#0F172A] uppercase tracking-widest">
                Interactive Components
              </h3>
              <span className="text-xs font-semibold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-md">
                {questionFields.length} Defined
              </span>
            </div>
            
            <div className="space-y-4">
              {questionFields.map((question, questionIndex) => (
                <div 
                  key={question.id} 
                  className="transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
                >
                  <QuestionBlock 
                    questionIndex={questionIndex}
                    register={register}
                    control={control}
                    removeQuestion={removeQuestion}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Operational Area Link Utilities */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button 
              type="button" 
              onClick={() => addQuestion({ text: "", required: false, options: [{ text: "" }] })}
              className="w-full sm:w-1/2 py-3.5 border-2 border-dashed border-[#E2E8F0] text-[#64748B] text-sm font-bold rounded-xl hover:border-[#097FE8] hover:text-[#097FE8] hover:bg-[#F0F7FF] transition-all duration-150 active:scale-[0.99] inline-flex items-center justify-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Component Block
            </button>

            <button 
              type="submit" 
              className="w-full sm:w-1/2 py-3.5 bg-[#097FE8] hover:bg-[#0866ba] text-white text-sm font-extrabold uppercase tracking-wider rounded-xl shadow-md shadow-blue-100 transition-all duration-150 active:scale-[0.99] inline-flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Deploy Live Pipeline
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreatePollPage;