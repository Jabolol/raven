import IconArrowDown from "icons/arrow-down.tsx";
import IconArrowUp from "icons/arrow-up.tsx";
import { useState } from "preact/hooks";

export default function ({ message }: { message: string }) {
  const [isErrorExpanded, setIsErrorExpanded] = useState<boolean>(true);

  return (
    <>
      <div className="w-90vw m-4">
        <button
          className="max-w-md text-sm font-bold cursor-pointer flex items-center text-red-700 dark:text-red-300"
          onClick={() => setIsErrorExpanded((x) => !x)}
        >
          {isErrorExpanded ? "Hide errors" : "Show Errors"}
          {isErrorExpanded
            ? <IconArrowUp className="ml-1 w-4 h-4" />
            : <IconArrowDown className="ml-1 w-4 h-4" />}
        </button>
      </div>
      {isErrorExpanded && (
        <div className="max-w-md overflow-auto border border-2 border-red-500 rounded-md">
          <p className="font-mono text-sm p-2 text-red-700 dark:text-red-300 rounded-md relative max-w-full">
            {message}
          </p>
        </div>
      )}
    </>
  );
}
