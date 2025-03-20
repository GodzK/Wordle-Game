import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const api = "http://localhost:8777/";
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState(Array(6).fill(""));

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch(api);
        const words = await response.json();
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);
      } catch (error) {
        console.error("Error fetching word:", error);
      }
    };
    fetchWord();
  }, []);

  return (
    <div className="app">
      <UserInput guess={guess} setGuess={setGuess} />
      <Box word={word} />
    </div>
  );
}

// แสดงตัวอักษรของคำปริศนา
function Box({ word }) {
  if (!word) return <h2>Loading...</h2>;

  return (
    <div style={{ display: "flex" }}>
      {Array.from(word).map((letter, key) => (
        <h1 key={key} style={{ margin: "5px" }}>
          {letter}
        </h1>
      ))}
    </div>
  );
}

// รับอินพุตจากผู้ใช้
function UserInput({ guess, setGuess }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length !== 5) {
      alert("Word must be 5 letters long!");
      return;
    }
    const newGuess = [...guess];
    const index = newGuess.findIndex((g) => g === "");
    if (index !== -1) {
      newGuess[index] = input;
      setGuess(newGuess);
    }
    setInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={5}
          style={{ textTransform: "uppercase" }}
        />
        <button type="submit">Submit</button>
      </form>

      {guess.map((word, key) => (
        <h1 key={key} style={{ backgroundColor: "black", color: "white", margin: "5px" }}>
          {word}
        </h1>
      ))}
    </div>
  );
}

export default App;
