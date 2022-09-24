import React from "react";
import ButtonAppBar from "../Button/AppBar";
import Search from "../Button/Search";
import TodoButton from "../Button/TodoButton";

function Home(props) {
  return (
    <div className="todo-list-app">
      <ButtonAppBar />
      <div className="todo-group-form">
        <h2 className="header"> Todo Search Task</h2>
        <Search />
      </div>
      <div className="todo-group-form">
        <h2 className="header"> Todo List Task</h2>
        <TodoButton />
      </div>
    </div>
  );
}

export default Home;
