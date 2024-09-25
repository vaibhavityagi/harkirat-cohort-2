import React, { Suspense, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Dashboard } from "./components/Dashboard";
// import { Landing } from "./components/Landing";
// lazy loading wont give the full bundle (html css js) in one go when the page loads for the first time
// it will only provide dashboard component when the user asks for it
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Landing = React.lazy(() => import("./components/Landing"));
import { AppBar } from "./components/Appbar";
import { CountContext } from "./context";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { countAtom, evenSelector } from "./store/atoms/count";
import {
  notifications,
  todosAtomFamily,
  totalNotifiSelector,
} from "./store/atoms/linkedIn";

// ---------------------------- ROUTING --------------------------------
// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <AppBar />
//         <Routes>
//           <Route
//             path="/dashboard"
//             element={
//               // need to wrap the component is Suspense API as when the user asks for Dashboard component, the call is async, takes some time to return the component depending on the network
//               // therefore in the meantime, kuch show krne ke liye hona chahiye, hence the fallback
//               <Suspense fallback="loading...">
//                 <Dashboard />
//               </Suspense>
//             }
//           />
//           <Route
//             path="/"
//             element={
//               <Suspense fallback="loading....">
//                 <Landing />
//               </Suspense>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// ---------------------------- PROP DRILLING --------------------------

// here, Count function is not directly using setCount or count, it is only passing it to a child component
// this is prop drilling, when components have to pass down the props
// context api lets you teleport props to the components which require them, w/o having to drill down the props

// context api
// Step 1 - create context
// Step 2 - wrap anyone that wants to use the teleported value inside a provider

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <CountContext.Provider value={{ count, setCount }}>
//         <Count />
//       </CountContext.Provider>
//     </div>
//   );
// }

// function Count() {
//   return (
//     <div>
//       <CountRender />
//       <Buttons />
//     </div>
//   );
// }

// function CountRender() {
//   const { count } = useContext(CountContext);
//   return (
//     <div>
//       <b>{count}</b>
//     </div>
//   );
// }

// function Buttons() {
//   const { count, setCount } = useContext(CountContext);
//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>Increase</button>
//       <button onClick={() => setCount(count - 1)}>Decrease</button>
//     </div>
//   );
// }

// 7.2

// interview ques: why to use context api
// to make syntax cleaner and get rid of prop drilling, not to make re-rendering more efficient
// as the intermediate components in our case Count component gets re-rendered even when it doesnt use any state
// hence state management libraries like redux or recoil are used

// state management libraries separate state and component logic

// ------------ RECOIL --------------------------

//step 1 - define atom
// useRecoilValue
// useRecoilState
// useSetRecoilState
// RecoilRoot - anything which uses recoil logic has to be wrapped in it, adviced to wrap at the top most level
// useRecoilValueLoadable
// useRecoilStateLoadable

// function App() {
//   return (
//     <RecoilRoot>
//       <Count />
//     </RecoilRoot>
//   );
// }

// function Count() {
//   return (
//     <div>
//       <CountRender />
//       <Buttons />
//     </div>
//   );
// }

// function CountRender() {
//   const count = useRecoilValue(countAtom);

//   return (
//     <div>
//       <b>{count}</b>
//       <IsEven />
//     </div>
//   );
// }

// function Buttons() {
//   const setCount = useSetRecoilState(countAtom);
//   return (
//     <div>
//       <button onClick={() => setCount((c) => c + 1)}>Increase</button>
//       <button onClick={() => setCount((c) => c - 1)}>Decrease</button>
//     </div>
//   );
// }

// function IsEven() {
//   const isEven = useRecoilValue(evenSelector);

//   return <div>{isEven ? null : "It is even"}</div>;
// }

// --------------------------------- RECOIL DEEP DIVE ---------------------------------------------------
// function App() {
//   return (
//     <>
//       <RecoilRoot>
//         <MainApp />
//       </RecoilRoot>
//     </>
//   );
// }

// function MainApp() {
//   const notificationsCount = useRecoilValue(notifications);
//   const totalNotificationCount = useRecoilValue(totalNotifiSelector);
//   return (
//     <div>
//       <button>Home</button>

//       <button>
//         My network (
//         {notificationsCount.network >= 100 ? "99+" : notificationsCount.network}
//         )
//       </button>
//       <button>Jobs ({notificationsCount.jobs})</button>
//       <button>Messaging ({notificationsCount.messaging})</button>
//       <button>Notifications ({notificationsCount.notifications})</button>

//       <button>Me ({totalNotificationCount})</button>
//     </div>
//   );
// }

//  ---------------------- ATOM FAMILY ------------------------------
function App() {
  return (
    <RecoilRoot>
      <Todo id={1} />
      <Todo id={2} />
      <Todo id={3} />
    </RecoilRoot>
  );
}

/* 
function Todo({ id }) {
  const currTodo = useRecoilValue(todosAtomFamily(id));
  // console.log(currTodo);
  return (
    <div>
      <b>Title: </b>
      {currTodo.title}
      <br />
      <b>Description: </b>
      {currTodo.description}
      <br />
      <br />
    </div>
  );
}
*/

// useRecoilValueLoadable, useRecoilStateLoadable

function Todo({ id }) {
  const currTodo = useRecoilValueLoadable(todosAtomFamily(id));
  // currTodo = {contents: {}, state: 'hasValue'/ 'loading'/ 'hasError'}
  console.log(currTodo);

  if (currTodo.state === "loading") {
    return <div>Loading data</div>;
  } else if (currTodo.state === "hasValue") {
    return (
      <div>
        <b>Title: </b>
        {currTodo.contents.title}
        <br />
        <b>Description: </b>
        {currTodo.contents.description}
        <br />
        <br />
      </div>
    );
  } else if (currTodo.state === "hasError") {
    return <div>Error fetching data</div>;
  }
}

export default App;
