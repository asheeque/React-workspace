import {

  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { v4 as uuid } from "uuid";

import { Draggable } from "react-beautiful-dnd";
import classes from "./TaskComponent.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

import ClearIcon from "@mui/icons-material/Clear";

import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import {  useDispatch } from "react-redux";
import { addSubtask,deleteTask } from "../../../store/ToDo";
import SubtaskComponent from "../SubtaskComponent/SubtaskComponent";
const TaskComponent = ({ task, index }) => {
  console.log(task);
  const [isEdit, setIsEdit] = useState(false);
  const [subTask, setSubTask] = useState([]);
  const [taskName,setTaskName] = useState("")
  const dispatch = useDispatch();

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const startEditHandler = () => {
    console.log(isEdit);
    setIsEdit(!isEdit);
  };


  const subtaskSaveHandler = () =>{

    dispatch(addSubtask(subTask));
    setIsEdit(!isEdit)
  }
  const subtaskChangeHandler = (e) => {
    console.log(subTask);
    let val = e.target.value;
    let sentences = val.split(/\r?\n|\r|\n/g);
    let subTasks = [];
    sentences.forEach((it, idx) => {
      console.log(it.trim());
      if (it.trim().length > 1) {
        console.log(it,it.trim(),it.trim().length)
        subTasks.push(it.trim());
      }
    });
    // console.log(subTasks)

    let subtaskObj = [];
    subTasks.forEach((it, idx) => {
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      const singleSubtask = {
        subtask_id:small_id,
        subtask_name:it,
        status:false
      }
      subtaskObj.push(singleSubtask)
    });
    let payload = {
        task_id:task.task_id,
        subtask:subtaskObj
    }
    setSubTask(payload);
    
  };


  const taskDeleteHandler = () =>{

    const payload = {
        task_id:task.task_id
    }
    dispatch(deleteTask(payload))
  }
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
            }`}
          >
            <CardContent className={classes.cardContainer}>
              <div className={classes.cardContainerInner}>
                <div>
                  {!isEdit && (
                    <Typography sx={{ fontSize: "1rem" ,fontWeight:"600"}}>
                      {Capitalize(task.task_name)}
                    </Typography>
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
                <div className={classes.SubTaskContainer}>
                  {!isEdit && task.subtasks.length > 0 && (
                    <div>
                      {task.subtasks.map((st, idx) => {
                        return (
                            <SubtaskComponent subtask={st} task_id={task.task_id} key={idx}/>
                        )
                      })}
                    </div>
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
                <div className={classes.ButtonContainer}>
                  {!isEdit && (
                    <div onClick={startEditHandler}>
                      <EditIcon className={classes.Icons} />
                    </div>
                  )}
                  {isEdit && (
                    <div onClick={subtaskSaveHandler}>
                      <CheckIcon className={classes.Icons} />
                    </div>
                  )}
                  {isEdit && (
                    <>
                      <div onClick={() => setIsEdit(!isEdit)}>
                        <ClearIcon className={classes.Icons} />
                      </div>

                      <div onClick={()=>taskDeleteHandler()}>
                        <DeleteIcon className={classes.Icons} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          //   </div>
          // </div>
        )}
      </Draggable>
    // </Grid>
  );
};

export default TaskComponent;
