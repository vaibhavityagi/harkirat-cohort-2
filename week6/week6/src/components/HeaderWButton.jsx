import { Header } from "./Header";
import React, { useState } from "react";

export function HeaderWButton() {
  const [title, setTitle] = useState("My name is vaibhavi");

  const handleClick = () => {
    setTitle(`My name is ${Math.floor(Math.random() * 10)}`);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me to change the title</button>
      <Header title={title} />
    </div>
  );
}
