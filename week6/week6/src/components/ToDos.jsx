import { useEffect } from "react";

export function Todos() {
  // the callback fn passed in useEffect can't directly be an async fn
  useEffect(() => {
    fetch("https://sum-server.100xdevs.com/todos").then(async (res) => {
      const json = await res.json();
      console.log(json.todos);
      // setTodos(json.todos);
    });
  }, []);
}
