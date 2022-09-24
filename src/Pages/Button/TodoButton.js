import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import axios from "axios";

const TaskButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 15,
  width: "15%",
  border: "1px solid",
  lineHeight: 1,
  marginTop: 50,
  margin: 22,
  backgroundColor: "#00BFFF",
  fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
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

function TodoButton(props) {
  const [AllTask, setAllTask] = useState([]);

  const getAllTask = async () => {
    try {
      await axios({
        method: `Get`,
        url: `https://fake-api-coba.herokuapp.com/todos`,
      });
      // navigate("/");
      // setId(id);
      setAllTask();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios.get(`https://fake-api-coba.herokuapp.com/todos`).then((response) => {
      setAllTask(response.data.task);
    });
  }, []);

  return (
    <>
      <div>
        <StyledLink to="/all-task">
          <TaskButton variant="contained" color={"primary"} size="large" startIcon={<AssignmentOutlinedIcon />} onClick={() => getAllTask}>
            All
          </TaskButton>
        </StyledLink>
        <StyledLink to="/done-task">
          <TaskButton variant="contained" color={"primary"} size="large" startIcon={<AssignmentTurnedInOutlinedIcon />} onClick={AllTask}>
            Done
          </TaskButton>
        </StyledLink>
        <StyledLink to="/todo-task">
          <TaskButton variant="contained" color={"primary"} size="large" startIcon={<PlaylistAddIcon />}>
            Todo
          </TaskButton>
        </StyledLink>
        <StyledLink to="/new-task">
          <TaskButton variant="contained" color={"primary"} size="large" startIcon={<AddIcon />}>
            New
          </TaskButton>
        </StyledLink>
      </div>
    </>
  );
}

export default TodoButton;
