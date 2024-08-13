import { useEffect, useRef, useState } from "react";
import { type TodoItemType } from "../App";
import { cn } from "../lib/cn";
import CustomButton from "./CustomButton";
import {
  CheckDoubleIcon,
  CheckIcon,
  PencilIcon,
  SaveIcon,
  TrashIcon,
} from "../assets/Icons";

type Props = {
  todo: TodoItemType;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
  doneTodo: (id: number) => void;
};

export default function TodoItem(props: Props) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.value = props.todo.task;
  }, [props.todo.task]);

  function handleSave() {
    if (!inputRef.current) return;
    props.updateTodo(props.todo.id, inputRef.current.value);
    setShowInput((prev) => !prev);
  }

  return (
    <div
      className="mx-auto flex w-full max-w-[45rem] items-center justify-between gap-4 rounded-lg bg-black/30 px-4 py-3"
      key={props.todo.id}
    >
      <p
        className={cn(
          "flex-1 text-lg font-medium",
          props.todo.done ? "italic text-white/60 line-through" : "",
          showInput ? "hidden" : "",
        )}
      >
        {props.todo.task}
      </p>

      <input
        type="text"
        ref={inputRef}
        className={cn(
          "h-12 w-[55%] flex-1 rounded-lg bg-slate-900/30 px-4 font-medium opacity-90 outline-[2px] ring-1 ring-white/30 placeholder:italic placeholder:text-white/90 focus:ring-white focus-visible:outline-none sm:w-full",
          showInput ? "block" : "hidden",
        )}
      />

      <div className="flex items-center justify-end gap-2 sm:gap-3">
        <button
          className={cn(
            "tooltip size-8 items-center justify-center rounded-full font-semibold transition-all hover:bg-white/10 active:scale-105 sm:size-10 md:size-12 lg:size-14",
            showInput ? "inline-flex" : "hidden",
          )}
          onClick={handleSave}
        >
          <span className="tooltiptext">Save</span>
          <SaveIcon />
        </button>

        <button
          onClick={() => setShowInput((prev) => !prev)}
          className={cn(
            `tooltip size-8 items-center justify-center rounded-full font-semibold transition-all hover:bg-white/10 active:scale-105 sm:size-10 md:size-12 lg:size-14`,
            showInput === false ? "inline-flex" : "hidden",
          )}
        >
          <span className="tooltiptext">Edit task</span>
          <PencilIcon />
        </button>

        <CustomButton
          actionFunction={() => props.deleteTodo(props.todo.id)}
          icon={<TrashIcon />}
          tooltipText="Delete task"
          className="size-8 hover:bg-rose-300/15 hover:text-rose-500 sm:size-10 md:size-12 lg:size-14"
        />

        <CustomButton
          actionFunction={() => props.doneTodo(props.todo.id)}
          icon={props.todo.done ? <CheckDoubleIcon /> : <CheckIcon />}
          tooltipText={props.todo.done ? "Mark unfinished" : "Mark finished"}
          className={cn(
            "size-8 bg-white/10 text-white hover:bg-white/20 sm:size-10 md:size-12 lg:size-14",
            showInput ? "hidden sm:inline-flex" : "",
          )}
        />
      </div>
    </div>
  );
}
