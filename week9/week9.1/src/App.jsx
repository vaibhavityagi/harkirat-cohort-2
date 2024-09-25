import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App1() {
  const [render, setRender] = useState(true);
  useEffect(() => {
    setInterval(() => setRender(!render), 5000);
  }, []);

  return (
    <>
      {/* <MyComponent />; */}
      {render ? <MyComponent2 /> : <div>After 5 sec</div>}
    </>
  );
}

// class based components - older way of writng react
class MyComponentClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}

// functional components - use hooks to hook into react state and life cycle events of a component
function MyComponent() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

function MyComponent2() {
  useEffect(() => {
    // Perform setup or data fetching here
    console.log("component mounted");

    // always returns a function
    // return code runs every time the func unmounts if there are no dependencies
    // or in case of dependencies, return code runs first and then the normal code runs everytime there is a change in the dependency
    return () => {
      // Cleanup code (similar to componentWillUnmount)
      console.log("Component unmounted");
    };
  }, []);

  // Render UI
  return <div>From inside the component</div>;
}

// ------------------------ custom hooks -------------------------------------
function useTodos(n) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  function getData() {
    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
      setLoading(false);
    });
  }

  useEffect(() => {
    const clock = setInterval(() => {
      getData();
    }, n * 1000);
    getData();

    // stopping the old clock when n changes
    return () => {
      clearInterval(clock);
    };
  }, [n]);

  return { todos, loading };
}

function App() {
  // const { todos, loading } = useTodos(5);
  // if (loading) return <div>Loading....</div>;
  // return (
  //   <>
  //     {todos.map((todo) => (
  //       <Track todo={todo} key={todo.id} />
  //     ))}
  //   </>
  // );
  // return <IsOnline />;
  // return <Mouse />;
  // return <Dimension />;

  // Performance/ Timer based

  // useInterval
  /* 
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
  
  return <div>Timer is at {count}</div>;
  */

  // debouncing
  return <SearchBar />;
}

function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

function useIsOnline() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      window.removeEventListener("online", () => setIsOnline(true));
      window.removeEventListener("offline", () => setIsOnline(false));
    };
  }, []);

  return isOnline;
}

function IsOnline() {
  const status = useIsOnline();
  return (
    <>{status ? <div>Yay you are online</div> : <div>You are offline</div>}</>
  );
}

function useMousePointer() {
  const [posn, setPosn] = useState({ x: 0, y: 0 });
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setPosn({ x: e.clientX, y: e.clientY });
    });

    return () =>
      window.removeEventListener("mousemove", (e) => {
        setPosn({ x: e.clientX, y: e.clientY });
      });
  }, []);

  return posn;
}

function Mouse() {
  const { x, y } = useMousePointer();
  return (
    <>
      <div>
        X: {x}, Y: {y}
      </div>
    </>
  );
}

// function useDimensions() {
//   const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
//   useEffect(() => {
//     window.addEventListener("onresize", (e) => {
//       setDimensions({ w: e.innerHeight, y: e.innerWidth });
//     });
//   }, []);

//   return dimensions;
// }

// function Dimension() {
//   const { w, h } = useDimensions();

//   return (
//     <>
//       <div>Width: {w}</div>
//       <div>Height: {h}</div>
//     </>
//   );
// }

function useInterval(fn, time) {
  useEffect(() => {
    const clock = setInterval(() => fn(), time);

    return () => clearInterval(clock);
  }, []);
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const clock = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(clock);
  }, [value]);

  return debouncedValue;
}

function SearchBar() {
  const [inputValue, setIntputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  return (
    <>
      <label htmlFor="dh">Debouncing hook</label>
      <br />
      <input
        type="text"
        placeholder="type anything.."
        name="dh"
        onChange={(e) => setIntputValue(e.target.value)}
        value={inputValue}
      />
      <br />
      Debounced value is: {debouncedValue}
    </>
  );
}

export default App;
