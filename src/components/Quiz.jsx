// dependencies
import { useEffect, useState } from "react";
import he from "he";

// css
import "../styles/quiz.css";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [checkResults, setCheckResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=10&category=31&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        // Shuffle the answers for each question
        const shuffledQuestions = data.results.map((question) => ({
          ...question,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          selectedAnswer: null,
        }));
        setQuestions(shuffledQuestions);
      });
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].selectedAnswer = answerIndex;
      return updatedQuestions;
    });
  };

  const questionElements = questions.map((question, questionIndex) => (
    <div key={questionIndex} className="question">
      <h3>{he.decode(question.question)}</h3>
      <ul>
        {question.answers.map((answer, answerIndex) => {
          let answerClass = "";
          if (checkResults) {
            if (answer === question.correct_answer) {
              answerClass = "correct";
            } else if (question.selectedAnswer === answerIndex) {
              answerClass = "incorrect";
            }
          } else if (question.selectedAnswer === answerIndex) {
            answerClass = "selected";
          }

          return (
            <li
              key={answerIndex}
              onClick={() => handleAnswerSelect(questionIndex, answerIndex)}
              className={answerClass}
            >
              {he.decode(answer)}
            </li>
          );
        })}
      </ul>
    </div>
  ));

  const handleCheckResults = () => {
    if (checkResults) {
      // Reset the quiz
      fetchQuestions();
      setCheckResults(false);
      setScore(0);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const unansweredQuestions = questions.filter(
        (question) => question.selectedAnswer === null,
      );

      if (unansweredQuestions.length > 0) {
        alert("Please answer all questions before checking results.");
      } else {
        // Calculate the score
        const newScore = questions.reduce((totalScore, question) => {
          if (
            question.answers[question.selectedAnswer] ===
              question.correct_answer
          ) {
            return totalScore + 1;
          } else {
            return totalScore;
          }
        }, 0);

        setScore(newScore);
        setCheckResults(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <main>
      <div className="questions-container">
        {questionElements}
        <div className="button-container">
          <button onClick={handleCheckResults} id="check-restart-button">
            {checkResults ? "Reset game" : "Check results"}
          </button>
          {checkResults && <p>score: {score}/10</p>}
        </div>
      </div>
    </main>
  );
}
