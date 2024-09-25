import { useState } from "react";
import axios from "axios";

export function CreateTodo() {
  const styles = { padding: 10, margin: 10 };

  const sendData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/todos",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      alert("data send");
      console.log(res);
    } catch (err) {
      console.log("Ran into an error: " + err);
    }
  };

  // local state variables
  // not a good way to obtain the data as the onChange event handler causes a lot of re-render
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <h1>Create a new to-do</h1>
      <input
        type="text"
        name=""
        id=""
        placeholder="title"
        style={styles}
        autoFocus
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
      />
      <br />
      <input
        type="text"
        name=""
        id=""
        placeholder="description"
        style={styles}
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      />
      <br />

      <button style={styles} onClick={sendData}>
        Add a todo
      </button>
    </div>
  );
}
