import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Container } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";

// Styling
const TaskButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  padding: "6px 12px",
  width: 300,
  border: "1px solid",
  lineHeight: 1.5,
  marginTop: 20,

  backgroundColor: "#00BFFF",
  borderColor: "#0063cc",
  fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

function InputData(props) {
  const [task, setTask] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const handlePost = async () => {
    try {
      await axios({
        method: `POST`,
        url: `https://fake-api-coba.herokuapp.com/todos`,
        data: {
          id: id,
          task: task,
          complete: false,
        },
      });
      navigate("/");
      setId(id);
      alert("Data Akan Dismpan");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (params.id) {
      axios.get(`https://fake-api-coba.herokuapp.com/todos/${params.id}`).then((response) => {
        setTask(response.data.task);
      });
    }
  }, [params.id]);

  return (
    <div className="todo-list-app">
      <h2 className="headerinput"> {params.id ? "Update" : "New"} Task Todo</h2>
      <div className="todo-group-form">
        <TextField
          sx={{ width: "100%" }}
          value={task}
          onChange={(e) => {
            e.preventDefault();
            setTask(e.target.value);
          }}
          type="text"
          id="outlined-basic"
          label="Input Task"
          variant="outlined"
          placeholder="Input/Edit Task"
        />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TaskButton type="submit" variant="contained" color={"primary"} size="large" onClick={handlePost}>
            Submit
          </TaskButton>
        </Container>
      </div>
    </div>
  );
}

export default InputData;
