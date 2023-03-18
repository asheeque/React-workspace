import { Card, CardContent, Chip, TextField, Typography } from "@mui/material";
import * as React from "react";
import { v4 as uuid } from "uuid";
import Button from "@mui/material/Button";
import { Draggable } from "react-beautiful-dnd";
import classes from "./TaskComponent.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

import ClearIcon from "@mui/icons-material/Clear";
import FaceIcon from "@mui/icons-material/Face";

import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSubtask, deleteTask } from "../../../store/ToDo";
import {
  addSubTaskToDB,
  deleteTaskFromDB,
} from "../../../services/ToDoApiService";

import SubtaskComponent from "../SubtaskComponent/SubtaskComponent";
import { format } from "date-fns";
import EditTaskModal from "../EditTaskComponent/EditTaskModal";

const TaskComponent = ({ task, index }) => {
  // console.log(task);
  const [isEdit, setIsEdit] = useState(false);
  const [subTask, setSubTask] = useState([]);
  const [taskName, setTaskName] = useState("");
  const formattedDueDate = format(new Date(task.due_date), "MMM dd");
  const dispatch = useDispatch();

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const startEditHandler = () => {
    console.log(isEdit);
    setIsEdit(!isEdit);
  };

  const displaySubtasks = (subtasks) => {
    const numberOfSubtasks = 3;
    return (
      <ul className={classes.SubtaskList}>
        {subtasks.slice(0, numberOfSubtasks).map((st, idx) => (
          <li key={idx}>
            <SubtaskComponent
              subtask={st}
              task={task}
              task_id={task.task_id}
              key={idx}
            />
          </li>
        ))}
      </ul>
    );
  };
  const subtaskSaveHandler = async () => {
    // dispatch(addSubtask(subTask));
    // console.log(subTask, "subbb");
    const response = await addSubTaskToDB(subTask);
    if (response) {
      console.log(response);
      let payload = {
        task_id: task.task_id,
        subtask: response,
      };
      dispatch(addSubtask(payload));
    }
    setIsEdit(!isEdit);
  };
  const subtaskChangeHandler = (e) => {
    console.log(subTask);
    let val = e.target.value;
    let sentences = val.split(/\r?\n|\r|\n/g);
    let subTasks = [];
    sentences.forEach((it, idx) => {
      console.log(it.trim());
      if (it.trim().length > 1) {
        console.log(it, it.trim(), it.trim().length);
        subTasks.push(it.trim());
      }
    });
    // console.log(subTasks)

    let subtaskObj = [];
    subTasks.forEach((it, idx) => {
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      const singleSubtask = {
        task: {
          id: task.task_id,
        },
        name: it,
        status: false,
      };
      subtaskObj.push(singleSubtask);
    });

    // let payload = {
    //     task_id:task.task_id,
    //     subtask:subtaskObj
    // }
    setSubTask(subtaskObj);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSave = ({ taskName, subtasks }) => {
    // Implement the logic to save the updated task and subtasks
    setModalOpen(false);
  };

  const taskDeleteHandler = () => {
    const payload = {
      task_id: task.task_id,
    };

    deleteTaskFromDB(task.task_id);
    dispatch(deleteTask(payload));
  };
  return (
    // <Grid item xs={6}>
    <Draggable draggableId={task.task_id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{ maxWidth: 345, backgroundColor: task.color }}
          className={`${classes.TaskCard} ${
            snapshot.isDragging ? classes.Drag : ""
          }
        `}
        >
          <CardContent className={classes.cardContainer}>
            <div className={classes.cardContainerInner}>
              <div>
                {!isEdit && (
                  <div className={classes.CardHeader}>
                    {Capitalize(task.task_name)}
                  </div>
                )}
                {isEdit && (
                  <div className={classes.TaskContainer}>
                    <TextField
                      label="Task"
                      id="outlined-size-small"
                      defaultValue={task.task_name}
                      size="small"
                      onChange={subtaskChangeHandler}
                    />
                  </div>
                )}
              </div>
              <div className={classes.DueDateOuter}>
                <div className={classes.DueDateOuterInner}>
                  <Chip
                    label={`${task.category}`}
                    variant="outlined"
                    className={classes.ChipCategory}
                    size="small"
                    style={{
                      marginRight: "8px",
                      marginBottom: "8px",
                      // backgroundColor: "lightblue",
                    }}
                  />
                </div>
                <div className={classes.DueDateOuterInner}>
                  <Chip
                    label={formattedDueDate}
                    variant="outlined"
                    className={classes.Chip}
                    size="small"
                    style={{ marginRight: "8px", marginBottom: "8px" }}
                  />
                </div>
              </div>

              <div className={classes.SubTaskContainer}>
                {!isEdit && task.subtasks.length > 0 && (
                  <div>{displaySubtasks(task.subtasks)}</div>
                )}
                {isEdit && (
                  <div className={classes.SubTaskWrapper}>
                    <TextField
                      id="outlined-textarea"
                      label="Sub-tasks"
                      placeholder="Placeholder"
                      multiline
                      onChange={subtaskChangeHandler}
                    />
                  </div>
                )}
              </div>
              <div
                className={classes.ButtonContainer}
                style={{
                  bottom: "-18px",
                  right: "-4px",
                }}
              >
                {!isEdit && (
                  // <div onClick={startEditHandler}>
                  //   <EditIcon className={classes.Icons} />
                  // </div>
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.Button}
                    onClick={handleModalOpen}
                  >
                    Edit
                  </Button>
                )}
                <EditTaskModal
                  open={modalOpen}
                  handleClose={handleModalClose}
                  task={task}
                  handleSave={handleModalSave}
                />
                {/* {isEdit && (
                  <>
                    <div onClick={subtaskSaveHandler}>
                      <CheckIcon className={classes.Icons} />
                    </div>

                    <div onClick={() => setIsEdit(!isEdit)}>
                      <ClearIcon className={classes.Icons} />
                    </div>

                    <div onClick={() => taskDeleteHandler()}>
                      <DeleteIcon className={classes.Icons} />
                    </div>
                  </>
                )} */}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
    // </Grid>
  );
};

export default TaskComponent;
