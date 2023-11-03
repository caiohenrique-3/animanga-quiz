// dependencies
import { useState } from "react";

// components
import Quiz from "./components/Quiz";

// css
import "./styles/index.css";
import "./styles/fonts.css";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  function handleQuizStartButton() {
    setIsQuizStarted(true);
  }

  return (
    <div className="container">
      {!isQuizStarted && (
        <button id="start-quiz-button" onClick={handleQuizStartButton}>
          Start quiz
        </button>
      )}

      {isQuizStarted && <Quiz />}
    </div>
  );
}

export default App;
