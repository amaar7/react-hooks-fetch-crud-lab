import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleQuestionDelete = (questionId) => {
    // Filtered out the deleted question from the questions array
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  const addQuestion = (newQuestion) => {
    // Sent a POST request to the server to add the new question
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((createdQuestion) => {
        // Updated the state with the newly created question
        setQuestions([...questions, createdQuestion]);
      });
  };

  useEffect(() => {
    // Fetched questions from the server when the component mounts
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []); 

  return (
    <main>
      <AdminNavBar onChangePage={handlePageChange} />
      {page === "Form" ? (
        <QuestionForm onQuestionSubmit={addQuestion} />
      ) : (
        // Rendered the QuestionList component and pass the onDeleteQuestion function
        <QuestionList questions={questions} onDeleteQuestion={handleQuestionDelete} />
      )}
    </main>
  );
}

export default App;
