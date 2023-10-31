import React, { useState } from "react";

function QuestionList({ questions, onDeleteQuestion }) {
  const handleDeleteClick = (questionId) => {
    // Sent a DELETE request to your server to delete the question
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        onDeleteQuestion(questionId);
      }
    });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h4>{question.prompt}</h4>
            <p>Answers:</p>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <button onClick={() => handleDeleteClick(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
