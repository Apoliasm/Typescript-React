import { useEffect, useState } from "react";
import { TodoResponse } from "./fetch";

export function Todo({ todos }: { todos: TodoResponse }) {
  const [finished, setFinished] = useState("Not yet");
  function handleClick() {
    setFinished("Completed");
  }

  return (
    <li>
      <span>
        <button onClick={handleClick}>{`${todos.response} ${finished}`}</button>
      </span>
    </li>
  );
}
