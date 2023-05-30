"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlayIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export interface IFormInput {
  url: string;
}

const YTInput = ({ onDashboard }: { onDashboard?: boolean }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormInput>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const vidId = data.url.split("v=")[1];
    router.push(`/sense/${vidId}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`mb-2 grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-full bg-zinc-800 pl-4`}
      >
        <PlayIcon className="h-5 w-5 rounded bg-zinc-700 p-1 text-zinc-500" />
        <input
          className=" w-full bg-transparent py-3 font-semibold placeholder:text-zinc-600 autofill:bg-transparent focus:outline-none"
          placeholder="https://www.youtube.com/watch?v=..."
          {...register("url", {
            required: "Please enter a youtube link to proceed",
            pattern: {
              value: /https:\/\/www\.youtube\.com\/watch\?v=.*/,
              message: "Please enter a valid youtube link to proceed",
            },
          })}
          onKeyUp={(e) => {
            if (e.key === "Enter" && isValid) {
              handleSubmit(onSubmit);
            }
          }}
        />
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className="group h-full rounded-r-full px-4 transition-colors duration-200 hover:bg-red-500 disabled:cursor-not-allowed disabled:hover:bg-zinc-600"
        >
          <ArrowRightIcon className="h-5 w-5 text-zinc-600 transition-colors duration-200 group-hover:text-white" />
        </button>
      </form>
      <span
        className={`${
          !onDashboard && "mb-4"
        } ml-1 block text-center text-xs font-bold ${
          errors?.url
            ? "text-red-400"
            : "cursor-default select-none text-transparent"
        }`}
      >
        {errors?.url ? errors.url.message : "all good"}
      </span>
    </>
  );
};

export default YTInput;
