import { useForm, useFieldArray } from "react-hook-form";
import { createPoll } from "../api/poll.api";
import QuestionBlock from "../pages/QuestionBlock";

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
      alert("Poll created successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">Create New Poll</h1>
          <p className="text-[#64748B] mt-2 font-medium">Draft your questions and set your preferences.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="bg-white p-8 rounded-2xl border border-[#F1F5F9] shadow-sm space-y-5">
            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-[#94A3B8] mb-2 block">Poll Title</label>
              <input 
                placeholder="e.g., Weekly Team Feedback" 
                {...register("title")} 
                className="w-full text-lg font-bold text-[#0F172A] border-b-2 border-[#F1F5F9] focus:border-[#097FE8] outline-none pb-2 transition-colors placeholder:text-[#CBD5E1]"
              />
            </div>

            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-[#94A3B8] mb-2 block">Description</label>
              <textarea 
                placeholder="Add some context for your voters..." 
                {...register("description")}
                className="w-full text-[#64748B] bg-[#F8FAFC] p-4 rounded-xl border border-[#F1F5F9] focus:border-[#097FE8] outline-none transition-all resize-none h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-[#94A3B8] mb-2 block">Expiry Date & Time</label>
                <input 
                  type="datetime-local" 
                  {...register("expiresAt")}
                  className="w-full p-3 rounded-xl border border-[#F1F5F9] text-[#0F172A] font-medium focus:ring-2 focus:ring-[#097FE8]/10 outline-none transition-all"
                />
              </div>

              <div className="flex items-end pb-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" {...register("isAnonymous")} className="sr-only peer"/>
                    <div className="w-10 h-6 bg-[#E2E8F0] peer-checked:bg-[#097FE8] rounded-full transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                  </div>
                  <span className="text-sm font-bold text-[#64748B] group-hover:text-[#0F172A] transition-colors">Anonymous Results</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black text-[#0F172A] uppercase tracking-widest px-2">Poll Questions</h3>
            
            {questionFields.map((question, questionIndex) => (
              <div key={question.id} className="transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
                <QuestionBlock 
                  questionIndex={questionIndex}
                  register={register}
                  control={control}
                  removeQuestion={removeQuestion}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => addQuestion({ text: "", required: false, options: [{ text: "" }] })}
              className="w-full py-4 border-2 border-dashed border-[#E2E8F0] text-[#64748B] font-bold rounded-2xl hover:border-[#097FE8] hover:text-[#097FE8] hover:bg-[#F0F7FF] transition-all"
            >
              + Add Another Question
            </button>

            <button 
              type="submit" 
              className="w-full py-4 bg-[#0F172A] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-black shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
            >
              Launch Live Poll
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreatePollPage;