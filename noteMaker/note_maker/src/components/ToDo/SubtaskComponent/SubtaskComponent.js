import classes from "./SubtaskComponent.module.css";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { changeSubtaskStatus } from "../../../store/ToDo";
import { changeSubtaskStatusOnDB } from "../../../services/ToDoApiService";

const SubtaskComponent = ({ subtask, task, task_id }) => {
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const dispatch = useDispatch();
  const [status, setStatus] = useState(subtask.status);

  useEffect(() => {
    setStatus(subtask.status);
  }, [subtask.status]);
  // console.log(task,subtask.status)

  const changeSubtaskStatusHandler = async () => {
    const newStatus = !status;
    setStatus(newStatus);
    let payload = {
      task_id: task_id,
      subtask_id: subtask.subtask_id,
      status: newStatus,
    };
    const response = await changeSubtaskStatusOnDB(
      subtask.subtask_id,
      newStatus
    );
    if (response) {
      dispatch(changeSubtaskStatus(payload));
    }
  };

  return (
    <div className={classes.SubTaskContent}>
      {/* <div className={classes.SubTaskIconWrapper} onClick={removeTaskHandler}>
        <RemoveIcon className={classes.SubTaskIcon} />
      </div> */}
      <div className={classes.SubTaskNameWrapper}>
        {Capitalize(subtask.subtask_name)}
      </div>
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
