import "./App.css";

function App() {
  return (
    <>
      <div>Hello world</div>
      <Todo
        title="video"
        description="complete ts live recording"
        isCompleted
      />
    </>
  );
}

interface TodoType {
  title: string;
  description: string;
  isCompleted?: boolean;
}

function Todo({ title, description, isCompleted }: TodoType) {
  return (
    <div>
      <p>Title: {title}</p>
      <p>Description: {description}</p>
      <p>Completed: {isCompleted ? "true" : "false"}</p>
    </div>
  );
}

export default App;
