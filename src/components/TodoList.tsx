import { type TodoItemType } from "../App";

type Props = {
  todoList: TodoItemType[];
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
