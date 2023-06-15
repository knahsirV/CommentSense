"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlayIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

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

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const vidId = data.url.split("v=")[1];
    router.push(`/sense/${vidId}`);
    setLoading(true);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`mb-2 grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-full bg-zinc-900 pl-4`}
      >
        <PlayIcon className="h-5 w-5 rounded bg-zinc-800 p-1 text-zinc-600" />
        <input
          className=" w-full bg-transparent py-3 font-semibold placeholder:text-zinc-700 autofill:shadow-[inset_0_0_0px_1000px_rgb(24,24,27)] autofill:[-webkit-text-fill-color:_#fff] focus:outline-none"
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
          className="group h-full rounded-r-full px-4 transition-colors duration-200 hover:bg-red-500 disabled:cursor-not-allowed disabled:hover:bg-zinc-700"
        >
          {loading ? (
            <svg className="h-5 w-5 animate-spin" viewBox="3 3 18 18">
              <path
                className="fill-zinc-800 group-hover:fill-red-800"
                d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
              ></path>
              <path
                className="fill-zinc-600 group-hover:fill-red-200"
                d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
              ></path>
            </svg>
          ) : (
            <ArrowRightIcon className="h-5 w-5 text-zinc-700 transition-colors duration-200 group-hover:text-white" />
          )}
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
