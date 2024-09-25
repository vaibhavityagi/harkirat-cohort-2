import { useEffect, useState } from "react";
import { CreateTodo } from "../components/CreateTodo";
import { Todos } from "../components/Todos";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  // useEffect(() => {}, []);

  // fetch("http://localhost:3000/todos").then(async function (res) {
  //   const json = await res.json();
  //   console.log(json);
  //   setTodos(json.todos);
  // });

  return (
    <>
      <CreateTodo />
      <Todos todos={todos} />
    </>
  );
}

export default App;
