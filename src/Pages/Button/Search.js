import React, { useState, useEffect } from "react";
import { Paper, InputBase, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ActButton from "./ActButton";

function Search(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetchData, setRefetchData] = useState(true);
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchData = async () => {
      setLoading(true);
      axios({
        method: "GET",
        url: `https://fake-api-coba.herokuapp.com/todos${location.search}`,
      })
        .then((res) => {
          setData(res?.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
          setRefetchData(false);
        });
    };
    if (refetchData) {
      searchData();
    }
  }, [refetchData, location.search]);

  // delete
  const handleDelete = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `https://fake-api-coba.herokuapp.com/todos/${id}`,
      });
      navigate();
      setRefetchData(true);
    } catch (error) {
      console.log(error);
    }
  };

  // complete
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
    <div>
      <div>
        <Paper elevation={3} component="form" sx={{ p: "2px 4px", borderColor: "primary", display: "flex", alignItems: "center", width: "100%" }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Write Here"
            inputProps={{ "aria-label": "search" }}
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
          />
          <Tooltip title="Close">
            <IconButton>
              <CloseIcon cursor="pointer" color="primary" onClick={() => navigate(`/`) === setSearch("")} />
            </IconButton>
          </Tooltip>
          <Divider sx={{ height: 35, m: 0.5 }} orientation="vertical" />
          <Tooltip title="Search">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon
                color="primary"
                onClick={() => {
                  if (search) {
                    navigate(`?task=${search}`);
                  } else {
                    navigate(`/`);
                  }
                  setRefetchData(true);
                  setSearch(" ");
                }}
              />
            </IconButton>
          </Tooltip>
        </Paper>
      </div>

      <div className="todo-form">
        {loading && <div>loading...</div>}
        {!loading &&
          search &&
          data.map((item) => (
            <h3 className={item.complete ? "todo-row complete" : "todo-row"} key={item.id}>
              {item.task}
              <ActButton handleComplete={handleComplete} handleDelete={handleDelete} item={item} key={item.id} />
            </h3>
          ))}
      </div>
    </div>
  );
}

export default Search;
