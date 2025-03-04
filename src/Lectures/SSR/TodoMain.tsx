import { Todo } from "./Todo";
import { TodoResponse } from "./fetch";

export function TodoMain({ todos }: { todos: Array<TodoResponse> }) {
  return (
    <>
      <h1>Somethin Todo</h1>
      {todos.map((todo, index) => {
        <li>{<Todo todos={todo}></Todo>}</li>;
      })}
    </>
  );
}
