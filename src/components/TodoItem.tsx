import { useState } from "react";
import { type TodoItemType } from "../App";
import { cn } from "../lib/cn";
import CustomButton from "./CustomButton";
import { CheckIcon, PencilIcon, SaveIcon, TrashIcon } from "../assets/Icons";

type Props = {
  todo: TodoItemType;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
  doneTodo: (id: number) => void;
};

export default function TodoItem(props: Props) {
  const [showInput, setShowInput] = useState(false);
  return (
    <div
      className="mx-auto flex w-full max-w-[45rem] items-center justify-between gap-4 rounded-lg bg-black/30 px-4 py-3"
      key={props.todo.id}
    >
      <p className={cn(`flex-1`, props.todo.done ? `italic line-through` : ``)}>
        {props.todo.task}
      </p>
      <div className="flex items-center justify-end gap-8">
        <button
          className={cn(
            "tooltip size-12 items-center justify-center rounded-full font-semibold transition-all active:scale-105",
            showInput ? "inline-flex" : "hidden",
          )}
          onClick={() => setShowInput((prev) => !prev)}
        >
          <span className="tooltiptext">Save</span>
          <SaveIcon />
        </button>

        <button
          onClick={() => setShowInput((prev) => !prev)}
          className={cn(
            `tooltip size-12 items-center justify-center rounded-full font-semibold transition-all active:scale-105`,
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
        />
        <CustomButton
          actionFunction={() => props.doneTodo(props.todo.id)}
          icon={<CheckIcon />}
          tooltipText="Mark finished"
          className="bg-white/10 text-white hover:bg-white/20"
        />
      </div>
    </div>
  );
}
