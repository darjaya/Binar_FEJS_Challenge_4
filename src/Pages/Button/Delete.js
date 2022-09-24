import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
// import
// import axios from "axios";

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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

function DeleteButton(props) {
  // const doneDelete = async (id) => {
  //   for(let i = 0; i < props.todolist.length; i++){
  //     if(props.AllTask[i].complete){
  //         props.deleteTask(props.todolist[i].id)
  //     }
  //   try {
  //     await axios({
  //       method: "DELETE",
  //       url: `https://fake-api-coba.herokuapp.com/todos/${id}`,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDeleteAll = () => {
  //   Promise.all(
  //     itemTask.map((id) =>
  //       fetch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
  //         method: 'DELETE',
  //       })
  //         .then((res) => res)
  //         .then((data) => data.status)
  //     )
  //   ).then((res) => {
  //     if (res.every((code) => code === 200)) setRefetch(true);
  //   });
  // };

  const { item, handleDeleteDone, handleDeleteAll } = props;

  return (
    <div>
      <TaskButton variant="contained" color={"primary"} size="large" onClick={() => handleDeleteDone(item.id)}>
        Delete Done Task
      </TaskButton>

      <StyledLink to="/done-task">
        <TaskButton variant="contained" color={"primary"} size="large" onClick={() => handleDeleteAll(item.id)}>
          Delete All Task
        </TaskButton>
      </StyledLink>
    </div>
  );
}

export default DeleteButton;
