import classes from "./SubtaskComponent.module.css";

import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

import { useDispatch } from "react-redux";

const SubtaskComponent = ({ subtask, task_id }) => {
//   const dispatch = useDispatch();

  console.log(subtask);
  const removeTaskHandler = () => {
    let payload = {
      task_id: task_id,
      subtask_id: subtask.subtask_id,
    };
    console.log(payload);
    // dispatch(deleteSubtask(payload))
  };
  const [status, setStatus] = useState(subtask.status);
  return (
    <div className={classes.SubTaskContent}>
      <div className={classes.SubTaskIconWrapper} onClick={removeTaskHandler}>
        <RemoveIcon className={classes.SubTaskIcon} />
      </div>
      <div className={classes.SubTaskNameWrapper}>{subtask.subtask_name}</div>
      <div style={{ flex: "1" }}>
        <input
          type="checkbox"
          value={status}
          onClick={() => setStatus(!status)}
        />
      </div>
    </div>
  );
};

export default SubtaskComponent;
