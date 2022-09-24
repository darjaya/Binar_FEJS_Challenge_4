import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../Button/Search";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import TodoButton from "../Button/TodoButton";
import ButtonAppBar from "../Button/AppBar";
import ActButton from "../Button/ActButton";

const TaskButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  width: "40%",
  border: "1px solid",
  lineHeight: 1.5,
  marginTop: 50,
  margin: 10,
  backgroundColor: "#FF0000",

  fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
  "&:hover": {
    backgroundColor: "#A9A9A9",

    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

function AllTask(props) {
  const [itemTask, setItemTask] = useState();
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    if (refetch) getAllTask();
  }, [refetch]);

  const getAllTask = async (id) => {
    try {
      const { data } = await axios.get(`https://fake-api-coba.herokuapp.com/todos`);
      setItemTask(data);
    } catch (error) {
      console.log(error);
    }
    setRefetch(true);
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
    setRefetch(true);
  };

  const handleComplete = (id, item) => {
    axios
      .patch("https://fake-api-coba.herokuapp.com/todos/" + id, {
        complete: !item,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setRefetch(true);
  };

  //

  const handleDeleteAll = () => {
    Promise.all(
      itemTask.map((id) =>
        fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
          method: "DELETE",
        })
          .then((res) => res)
          .then((data) => data.status)
      )
    ).then((res) => {});
  };

  //

  const handleDeleteDone = async () => {
    getAllTask(
      itemTask.forEach((item) => {
        if (item.complete === true) {
          axios.delete(`https://fake-api-coba.herokuapp.com/todos/${item.id}`);
        }
      })
    );
    setRefetch(true);
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
        <hr></hr>
        <div>
          <h2 className="todo-header">All Task List</h2>
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
        <TaskButton variant="contained" color={"primary"} size="large" onClick={() => handleDeleteDone}>
          Delete Done Task
        </TaskButton>

        <TaskButton variant="contained" color={"primary"} size="large" onClick={() => handleDeleteAll}>
          Delete All Task
        </TaskButton>
      </div>
    </div>
  );
}
export default AllTask;
