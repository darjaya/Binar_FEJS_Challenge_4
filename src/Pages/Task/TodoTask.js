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

function DoneTask(props) {
  const [itemTask, setItemTask] = useState();
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    if (refetch) getTodoTask();
  }, [refetch]);
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
        <TaskButton
          variant="contained"
          color={"primary"}
          size="large"
          onClick={() => {
            Promise.all(
              itemTask
                .filter((e) => e.complete)
                .map(async ({ id }) => {
                  await fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
                    method: "DELETE",
                  })
                    .then(async (response) => {
                      return response;
                    })
                    .then((data) => {
                      return data.status;
                    });
                })
            ).then((response) => {
              setRefetch(true);
            });
          }}
        >
          Delete Done Task
        </TaskButton>

        <TaskButton
          variant="contained"
          color={"primary"}
          size="large"
          onClick={(id) => {
            setItemTask(itemTask.filter((item) => item.id !== id));
            Promise.all(
              itemTask.map(async ({ id }) => {
                await fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
                  method: "DELETE",
                })
                  .then(async (res) => {
                    return res;
                  })
                  .then((data) => {
                    return data.status;
                  });
              })
            ).then((response) => {
              setRefetch(true);
            });
          }}
        >
          Delete All Task
        </TaskButton>
      </div>
    </div>
  );
}
export default DoneTask;
