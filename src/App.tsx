import { useReducer } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { idGenerator } from "./lib/idGenerator";

export type TodoItemType = {
  id: number;
  task: string;
  done: boolean;
};

type ActionType =
  | { type: "UPDATE"; id: number; text: string }
  | { type: "ADD"; text: string }
  | { type: "DELETE" | "DONE"; id: number };

const reducer = (state: TodoItemType[], action: ActionType): TodoItemType[] => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: idGenerator.next().value,
          done: false,
          task: action.text,
        },
      ];
    case "DELETE":
      return state.filter((item) => item.id !== action.id);
    case "DONE":
      return state.map((item) =>
        item.id === action.id ? { ...item, done: false } : item,
      );
    case "UPDATE":
      return state.map((item) =>
        item.id === action.id ? { ...item, task: action.text } : item,
      );
    default:
      return state;
  }
};

const initialTodos: TodoItemType[] = [];

function App() {
  const [state, dispatch] = useReducer(reducer, initialTodos);

  function addTodo(text: string) {
    dispatch({ type: "ADD", text });
  }

  // function deleteTodo(id: number) {
  //   dispatch({ type: "DELETE", id });
  // }

  return (
    <div className="animated-gradient min-h-screen w-full font-inter text-slate-100">
      <AddTodo addTodo={addTodo} />
      <TodoList todoList={state} />
    </div>
  );
}

export default App;
