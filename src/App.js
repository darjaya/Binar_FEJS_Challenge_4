import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import InputData from "./Pages/Input/InputData";
import AllTask from "./Pages/Task/AllTask";
import DoneTask from "./Pages/Task/DoneTask";
import TodoTask from "./Pages/Task/TodoTask";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/new-task" element={<InputData />} />
      <Route path="/edit/:id" element={<InputData />} />
      <Route path="/all-task" element={<AllTask />} />
      <Route path="/done-task" element={<DoneTask />} />
      <Route path="/todo-task" element={<TodoTask />} />
    </Routes>
  );
}

export default App;
