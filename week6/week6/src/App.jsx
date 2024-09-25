import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { HeaderWButton } from "./components/HeaderWButton";
import { Todos } from "./components/ToDos";
import axios from "axios";

function App() {
  // 6.1
  // since the state is present in the App component (even though the app component is not directly using the state)
  // everytime the state updates, the whole App compenent re-renders, along with all of its components
  // 2 ways to prevent it:
  // push down the state: done in HeaderWButton component
  // use memo
  const [title, setTitle] = useState("My name is vaibhavi");

  const handleClick = () => {
    setTitle(`My name is ${Math.floor(Math.random() * 10)}`);
  };

  // 6.2
  const [b, setB] = useState(1);

  // useMemo
  const [c, setC] = useState(0);
  const [inputValue, setInputValue] = useState(1);
  const count = useMemo(() => {
    let finalCount = 0;
    for (let i = 1; i <= inputValue; i++) {
      finalCount = finalCount + 1;
    }
    return finalCount;
  }, [inputValue]);

  // useCallback
  // let a = useCallback(() => {}, []);
  let a = () => console.log("inside a");

  return (
    <div>
      {/* 6.1 */}
      {/* <HeaderWButton /> */}
      {/* <button onClick={handleClick}>Click me to change the title</button>
      <Header title={title} />
      <Header title={"Title 3"} />
      <Header title={"Title 4"} />
      <Header title={"Title 5"} /> */}

      {/* useEffect example */}
      {/* <Todos /> */}
      {/* <Wrapper>hi there</Wrapper>
      <RealWrapper>
        <Header title={"Vaibhavi vaibhavi"} />
      </RealWrapper>
      <RealWrapper>
        <div>Hi there from RealWrapper</div>
      </RealWrapper> */}

      {/* 6.2 */}
      {/* <button onClick={() => setB(1)}>1</button>
      <button onClick={() => setB(2)}>2</button>
      <button onClick={() => setB(3)}>3</button>
      <button onClick={() => setB(4)}>4</button>
      <ToDo id={b} /> */}

      {/* <input
        type="text"
        name="num"
        id="num"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Find sum from 1 to n"
      />
      <div>Sum is {count}</div>
      <button onClick={() => setC(c + 1)}>Counter ({c})</button> */}

      {/* useCallback */}

      <button
        onClick={() => {
          setC(c + 1);
        }}
      >
        Counter ({c})
      </button>
      <Demo a={a} />
    </div>
  );
}

// wrapper function
function Wrapper({ children }) {
  console.log(children);
  return (
    <div style={{ border: "1px solid black", padding: 10, margin: 10 }}>
      {children}
    </div>
  );
}

// real world wrapper function
function RealWrapper({ children }) {
  console.log(children);
  return (
    <div
      style={{ border: "1px solid red", padding: 10, margin: 10, color: "red" }}
    >
      {children}
    </div>
  );
}

function ToDo({ id }) {
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchFn = async () => {
      const res = await axios.get(
        `https://sum-server.100xdevs.com/todo?id=${id}`
      );
      setTodo(res.data.todo);
    };
    fetchFn();
  }, [id]);

  // empty dependancy - useEffect will only run when the component gets mounted
  // dependancy array - useEffect will run every time those dependancies get updated
  // return something - the function retured will run when the component gets unmounted

  return (
    <div>
      <br />
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

const Demo = React.memo((a) => {
  console.log("re-render");
  return <div>Hi there</div>;
});

export default App;
