import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

function ActButton(props) {
  const { item, handleComplete, handleDelete } = props;
  return (
    <div>
      <Tooltip title="Completed">
        <Checkbox sx={{ textDecoration: item.complete === true ? "line-through" : "none" }} color="orange" size="medium" onClick={() => handleComplete(item.id, item.complete)} defaultChecked={item.complete} />
      </Tooltip>
      <Link to={`/edit/${item.id}`}>
        <IconButton>
          <Tooltip title="Edit">
            <EditIcon color="hijau" />
          </Tooltip>
        </IconButton>
      </Link>
      <Tooltip title="Delete">
        <IconButton>
          <DeleteIcon color="red" onClick={() => handleDelete(item.id)} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default ActButton;
