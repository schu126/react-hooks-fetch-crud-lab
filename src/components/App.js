import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((resp) => resp.json())
    .then((data) => setQuestions(data))
  }, [setQuestions])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm setQuestions={setQuestions} questions={questions}/> : <QuestionList setQuestions={setQuestions} questions={questions} />}
    </main>
  );
}

export default App;