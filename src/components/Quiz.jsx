// dependencies
import { useEffect, useState } from "react";
import he from "he";

// css
import "../styles/quiz.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=31&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }, []);

  const questionElements = questions.map((question, index) => (
    <div key={index} className="question">
      <h3>{he.decode(question.question)}</h3>
      <ul>
        {question.incorrect_answers.map((answer, i) => (
          <li key={i}>{he.decode(answer)}</li>
        ))}
        <li>{he.decode(question.correct_answer)}</li>
      </ul>
    </div>
  ));

  return (
    <main>
      <div className="questions-container">
        {questionElements}
      </div>
    </main>
  );
}
