import React from "react";
import QuestionItem from "./QuestionItem"; 

function QuestionList({ setQuestions, questions }) {
  function handleCorrectAnswerChange(questionId, correctIndex) {
    // Find the question object in the state based on its id
    const questionToUpdate = questions.find((question) => question.id === questionId);
    
    // Create a new question object with the updated correctIndex
    const updatedQuestion = {
      ...questionToUpdate,
      correctIndex: correctIndex
    };

    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: correctIndex
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update question on the server");
      }
      return response.json();
    })
    .then(() => {
      // Update the questions state with the updated question
      const updatedQuestions = questions.map((question) => {
        if (question.id === questionId) {
          return updatedQuestion;
        }
        return question;
      });
      setQuestions(updatedQuestions);
    })
    .catch((error) => {
      console.error("Error updating question on the server:", error);
    });
  }

  function handleDelete (questionToDelete) {
    let newQuestionList = questions.filter((item) => item !== questionToDelete)

    fetch("http://localhost:4000/questions/" + questionToDelete.id, {
      method: "DELETE",
    })
    .then((resp) => resp.json())
    .then((data) => setQuestions(newQuestionList))
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            handleDelete={handleDelete}
            handleCorrectAnswerChange={handleCorrectAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
