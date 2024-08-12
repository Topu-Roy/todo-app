import { useCallback, useReducer } from "react";
import AddTodo from "./components/AddTodo";
import { idGenerator } from "./lib/idGenerator";
import RenderTodoList from "./components/RenderTodoList";

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
    case "ADD": {
      if (action.text === "") return state;

      return [
        ...state,
        {
          id: idGenerator.next().value,
          done: false,
          task: action.text,
        },
      ];
    }

    case "DELETE":
      return state.filter((item) => item.id !== action.id);

    case "DONE":
      return state.map((item) =>
        item.id === action.id ? { ...item, done: !item.done } : item,
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

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({ type: "ADD", text });
  }, []);

  const deleteTodo = useCallback((id: number) => {
    dispatch({ type: "DELETE", id });
  }, []);

  const updateTodo = useCallback((id: number, text: string) => {
    dispatch({ type: "UPDATE", id, text });
  }, []);

  const doneTodo = useCallback((id: number) => {
    dispatch({ type: "DONE", id });
  }, []);

  return (
    <div className="animated-gradient w-full">
      <div className="mx-auto min-h-screen w-full max-w-[80rem] space-y-8 font-inter text-slate-100">
        <AddTodo addTodo={addTodo} />
        <RenderTodoList
          todoList={state}
          deleteTodo={deleteTodo}
          doneTodo={doneTodo}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
}
