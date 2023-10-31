import React, { useState } from "react";

function QuestionForm({ onQuestionSubmit }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "correctIndex") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else if (name.startsWith("answer")) {
      const answerIndex = parseInt(name.replace("answer", ""));
      setFormData({
        ...formData,
        answers: formData.answers.map((answer, index) =>
          index === answerIndex ? value : answer
        ),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.prompt && formData.answers.every((answer) => answer)) {
      onQuestionSubmit(formData);
      setFormData({
        prompt: "",
        answers: ["", "", "", ""],
        correctIndex: 0,
      });
    }
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              name={`answer${index}`}
              value={answer}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index}>
                Answer {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
