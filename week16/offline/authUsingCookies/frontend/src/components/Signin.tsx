import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        placeholder="email@gmail.com"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="password"
      />
      <button
        onClick={async () => {
          try {
            await axios.post(
              `${BACKEND_URL}/signin`,
              {
                email,
                password,
              },
              {
                withCredentials: true,
              }
            );
            alert("you are logged in");
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};
