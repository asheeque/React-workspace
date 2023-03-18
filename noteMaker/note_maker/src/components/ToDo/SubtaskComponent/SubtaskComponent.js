import classes from "./SubtaskComponent.module.css";

import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { deleteSubtask, changeSubtaskStatus } from "../../../store/ToDo";

const SubtaskComponent = ({ subtask, task, task_id }) => {
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const dispatch = useDispatch();
  const [status, setStatus] = useState(subtask.status);
  const removeTaskHandler = () => {
    let payload = {
      task_id: task_id,
      subtask_id: subtask.subtask_id,
    };
    dispatch(deleteSubtask(payload));
  };

  const changeSubtaskStatusHandler = () => {
    const newStatus = !status;
    setStatus(newStatus);
    let payload = {
      task_id: task_id,
      subtask_id: subtask.subtask_id,
      status: newStatus,
    };
    dispatch(changeSubtaskStatus(payload));
  };

  return (
    <div className={classes.SubTaskContent}>
      {/* <div className={classes.SubTaskIconWrapper} onClick={removeTaskHandler}>
        <RemoveIcon className={classes.SubTaskIcon} />
      </div> */}
      <div className={classes.SubTaskNameWrapper}>{Capitalize(subtask.subtask_name)}</div>
      <div style={{ flex: "2" }}>
        <input
          type="checkbox"
          value={status}
          checked={status}
          onChange={changeSubtaskStatusHandler}
        />
      </div>
    </div>
  );
};

export default SubtaskComponent;
