export type TodoResponse = {
  response: string;
};
export async function fetchTodo() {
  console.log("fetchTodo");
  const fc = await fetch("http://localhost:3000/");
  return [
    { response: "hello1" },
    { response: "hello2" },
    { response: "hello3" },
    { response: "hello4" },
    { response: "hello5" },
  ];
}
