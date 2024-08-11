import { type TodoItemType } from "../App";

type Props = {
  todoList: TodoItemType[];
  deleteTodo(id: number): void;
  updateTodo(id: number, text: string): void;
  doneTodo(id: number): void;
};

export default function TodoList(props: Props) {
  return (
    <div>
      {props.todoList.map((item) => (
        <div key={item.id}>{item.task}</div>
      ))}
    </div>
  );
}
