import { useEffect, useState } from "react";
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
  const [inputText, setInputText] = useState(props.todo.task);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    setInputText(props.todo.task);
  }, [props.todo.task]);

  function handleSave() {
    props.updateTodo(props.todo.id, inputText);
    setShowInput((prev) => !prev);
  }

  return (
    <div
      className="mx-auto flex w-full max-w-[45rem] items-center justify-between gap-4 rounded-lg bg-black/30 px-4 py-3"
      key={props.todo.id}
    >
      <p
        className={cn(
          "flex-1",
          props.todo.done ? "italic line-through" : "",
          showInput ? "hidden" : "",
        )}
      >
        {props.todo.task}
      </p>

      <input
        type="text"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        className={cn(
          "h-12 flex-1 rounded-lg bg-slate-900/30 px-4 font-medium opacity-90 outline-[2px] ring-1 ring-white/30 placeholder:italic placeholder:text-white/90 focus:ring-white focus-visible:outline-none",
          showInput ? "block" : "hidden",
        )}
      />

      <div className="flex items-center justify-end gap-4">
        <button
          className={cn(
            "tooltip size-12 items-center justify-center rounded-full font-semibold transition-all hover:bg-white/10 active:scale-105",
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
            `tooltip size-12 items-center justify-center rounded-full font-semibold transition-all hover:bg-white/10 active:scale-105`,
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
          className="hover:bg-rose-300/15 hover:text-rose-500"
        />

        <CustomButton
          actionFunction={() => props.doneTodo(props.todo.id)}
          icon={props.todo.done ? <CheckDoubleIcon /> : <CheckIcon />}
          tooltipText={props.todo.done ? "Mark unfinished" : "Mark finished"}
          className="bg-white/10 text-white hover:bg-white/20"
        />
      </div>
    </div>
  );
}
