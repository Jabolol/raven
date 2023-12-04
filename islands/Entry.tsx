import { type EntryProps } from "~/types.ts";

export default function Entry(
  { id, title, description, placeholder, buttonText, disabled, handler }:
    EntryProps,
) {
  return (
    <>
      <div className="w-90vw mt-10 mb-5">
        <h1 className="text-2xl font-semibold text-center dark:text-white">
          {title}
        </h1>
        <p className="mt-5 truncate text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="w-90vw mb-10">
        <input
          id={id}
          type="tel"
          className={`w-full p-3 mb-4 text-black bg-white border border-gray-300 rounded-md dark:text-white dark:bg-gray-700 dark:border-gray-600 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button
          disabled={disabled}
          className={`w-full py-3 rounded-md bg-black text-white border-white dark:bg-white dark:border-black dark:text-black ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handler()}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
}
