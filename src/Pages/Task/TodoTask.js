import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../Button/Search";
import DeleteButton from "../Button/Delete";
import TodoButton from "../Button/TodoButton";
import ButtonAppBar from "../Button/AppBar";
import ActButton from "../Button/ActButton";

function DoneTask(props) {
  const [itemTask, setItemTask] = useState();
  useEffect(() => {
    getTodoTask();
  }, []);
  const getTodoTask = async (id) => {
    try {
      const { data } = await axios.get(`https://fake-api-coba.herokuapp.com/todos?complete=false`);
      setItemTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    setItemTask(itemTask.filter((item) => item.id !== id));
    try {
      await axios({
        method: "DELETE",
        url: `https://fake-api-coba.herokuapp.com/todos/${id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = (id, completed) => {
    axios
      .patch("https://fake-api-coba.herokuapp.com/todos/" + id, {
        complete: !completed,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <div>
          <hr></hr>
          <h2 className="todo-header">Todo Task List</h2>
          {itemTask &&
            itemTask.map((item) => (
              <h4 className={item.complete ? "todo-row complete" : "todo-row"} key={item.id}>
                {item.task}
                <ActButton handleComplete={handleComplete} handleDelete={handleDelete} item={item} key={item.id} />
              </h4>
            ))}
        </div>
      </div>

      <div className="todo-group-form">
        <DeleteButton />
      </div>
    </div>
  );
}
export default DoneTask;
