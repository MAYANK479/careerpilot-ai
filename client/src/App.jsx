import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios
      .get(`${API_URL}/`)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Backend Connection Failed ❌");
      });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "32px",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  );
}

export default App;