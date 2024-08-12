import { memo } from "react";
import { type TodoItemType } from "../App";
import TodoItem from "./TodoItem";

type Props = {
  todoList: TodoItemType[];
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
  doneTodo: (id: number) => void;
};

const TodoList = memo(function TodoList(props: Props) {
  return (
    <div className="flex w-full flex-col-reverse items-start justify-center gap-4">
      {props.todoList.map((item) => (
        <TodoItem
          deleteTodo={props.deleteTodo}
          doneTodo={props.doneTodo}
          todo={item}
          updateTodo={props.updateTodo}
          key={item.id}
        />
      ))}
    </div>
  );
});

export default TodoList;
