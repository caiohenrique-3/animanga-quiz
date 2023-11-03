// dependencies
import { useState } from "react";

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

      {isQuizStarted && (
        <p>
          Lorem ipsum dolor sit amet
        </p>
      )}
    </div>
  );
}

export default App;
