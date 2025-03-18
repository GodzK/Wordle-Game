import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const api = "http://localhost:8777/";
  const [solution, setsolution] = useState("");
  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(api)
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)]
      setsolution(randomWord)
    };
    fetchWord();
  }, []);

  return <div className="app">
      <h1>{solution}</h1>
  </div>;
}

export default App;
