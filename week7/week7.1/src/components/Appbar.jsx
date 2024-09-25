import { useNavigate } from "react-router-dom";

export function AppBar() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "1em",
        marginBottom: "1em",
      }}
    >
      <button
        onClick={() => {
          // this is not the right way as this doesnt implement client side rendering
          // using this method, page hard refreshes
          //   window.location.href = "/";
          // the right way is to use useNavigate hook
          navigate("/");
        }}
      >
        Landing Page
      </button>
      <button
        onClick={() => {
          //   window.location.href = "/dashboard";
          navigate("/dashboard");
        }}
      >
        Dashboard
      </button>
    </div>
  );
}
