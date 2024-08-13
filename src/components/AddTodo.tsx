import { useEffect, useRef } from "react";
import { PlusIcon } from "../assets/Icons";

type Props = {
  addTodo: (task: string) => void;
};

export default function AddTodo(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (!inputRef.current) return;
    props.addTodo(inputRef.current.value);
    inputRef.current.value = "";
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleClick();
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 pt-8">
      <h2 className="text-2xl font-semibold">Add a Todo</h2>
      <div className="flex w-full items-center justify-center gap-2">
        <input
          type="text"
          placeholder="type here..."
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="h-12 w-full max-w-[41rem] rounded-full bg-slate-900/30 px-3 font-medium opacity-90 outline-[2px] ring-1 ring-white/30 placeholder:italic placeholder:text-white/90 focus:ring-white focus-visible:outline-none sm:px-4"
        />
        <button
          onClick={handleClick}
          className="tooltip inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white font-semibold text-black transition-all hover:bg-white/80 active:scale-105"
        >
          <span className="tooltiptext">Add todo</span>
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}
