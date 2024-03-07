import React, { useState } from "react";

function QuestionItem({ question, handleDelete, handleCorrectAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const [selectedAnswer, setSelectedAnswer] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>{answer}</option>
  ));

  const handleSelectChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value); // Parse selected value to integer
    handleCorrectAnswerChange(id, newCorrectIndex);
    setSelectedAnswer(newCorrectIndex);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedAnswer} onChange={handleSelectChange}>
          {options}
        </select>
      </label>
      <button onClick={() => handleDelete(question)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;