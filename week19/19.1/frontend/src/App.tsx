import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("Connection established from the client");
      newSocket.send("hello from react");
      setSocket(newSocket);
    };
    // when the server
    newSocket.onmessage = (message) => {
      setLatestMessage(message.data);
      console.log(`Message received: ${message.data}`);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  if (!socket) return <div>Creating connection to the server...</div>;
  return (
    <div>
      <div>{latestMessage}</div>
      <br />
      <label htmlFor="mssg">Type your message: </label>
      <input
        type="text"
        name="mssg"
        id="mssg"
        value={message}
        onChange={(evt) => setMessage(evt.target.value)}
      />
      <br />
      <br />
      <button onClick={() => socket.send(message)}>Send</button>
    </div>
  );
}

export default App;
