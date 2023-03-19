import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  ListItem,
  ListItemText,
  List,
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { parseISO } from "date-fns";
import classes from "./EditTaskModal.module.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  addSubTaskToDB,
  changeSubtaskStatusOnDB,
  deleteSubtaskFromDB,
  deleteTaskFromDB,
  updateUserTask,
} from "../../../services/ToDoApiService";
import {
  addSubtask,
  changeSubtaskStatus,
  deleteSubtask,
  deleteTask,
  updateTaskDetails,
} from "../../../store/ToDo";
import { useDispatch } from "react-redux";

const EditTaskModal = (props) => {
  const { open, handleClose, task, handleSave } = props;

  const [taskName, setTaskName] = useState(task.task_name);
  const [subtasks, setSubtasks] = useState([...task.subtasks]);
  const [newSubtask, setNewSubtask] = useState("");
  const [color, setColor] = useState(task.color);
  const [dueDate, setDueDate] = useState(parseISO(task.due_date));
  const [category, setCategory] = useState(task.category);

  useEffect(() => {
    setSubtasks([...task.subtasks]);
  }, [task]);

  const handleCategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  const colorsArr = [
    {
      id: "1",
      value: "#ff3b30c7",
    },
    {
      id: "2",
      value: "#96ed31b8",
    },
    {
      id: "3",
      value: "#00bcd48a",
    },
    {
      id: "4",
      value: "#a868dfad",
    },
    {
      id: "5",
      value: "#d2ff008c",
    },
  ];

  const buttonSaveHandler = async () => {
    if (taskName.trim() === "") return;

    // console.log(Math.random() * 100)

    let newTask = {
      task_name: taskName.trim(),
      due_date: dueDate,
      category: category,
      color: color,
      //   subtasks: [],
    };
    console.log(newTask);

    const updatedTask = await updateUserTask(task.task_id, newTask);
    const dueDateString = dueDate.toISOString();
    if (updatedTask) {
      const payload = {
        task_id: task.task_id,
        name: taskName.trim(),
        color: color,
        due_date: dueDateString,
        category: category,
      };
      dispatch(updateTaskDetails(payload));
      // dispatch(updateTaskDetails(payload))
    }
    handleSave();
    // if (addTaskToDB) {
    //   const task_id = addTaskToDB["Task"]["id"];
    //   newTask["task_id"] = task_id;

    //   console.log(addTaskToDB, "mewo");
    //   dispatch(addTask(newTask));
    //   setCurrentTask("");
    // }
  };

  const taskDeleteHandler = () => {
    const payload = {
      task_id: task.task_id,
    };

    deleteTaskFromDB(task.task_id);
    dispatch(deleteTask(payload));
  };

  const handleChange = async (newStatus, id, value) => {
    // const newStatus = e.target.value;
    // console.log(value);/
    // setStatus(newStatus);
    let payload = {
      task_id: task.task_id,
      subtask_id: id,
      status: newStatus,
    };
    console.log(payload);
    const response = await changeSubtaskStatusOnDB(id, newStatus);

    if (response) {
      dispatch(changeSubtaskStatus(payload));
    }
  };
  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const dispatch = useDispatch();
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const subtaskSaveHandler = async () => {
    if (newSubtask.trim() === "") {
      return;
    }

    const singleSubtask = {
      task: {
        id: task.task_id,
      },
      name: newSubtask,
      status: false,
    };
    console.log(singleSubtask);
    const response = await addSubTaskToDB(singleSubtask);
    if (response) {
      console.log(response);
      let payload = {
        task_id: task.task_id,
        subtask: {
          subtask_id: response.id,
          subtask_name: response.subtask_name,
          status: response.status,
        },
      };
      dispatch(addSubtask(payload));
    }
  };

  const subtaskDeleteHandler = async (subtaskId) => {
    console.log(subtaskId);
    const response = await deleteSubtaskFromDB(subtaskId);
    // task_id, subtask_id

    if (response) {
      const obj = {
        task_id: task.task_id,
        subtask_id: subtaskId,
      };
      dispatch(deleteSubtask(obj));
    }

    // dispatch(subtaskDeleteHandler(sub))
  };

  const handleSubtasksChange = (e) => {
    let val = e.target.value;

    setNewSubtask(val);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: "100%",
        },
      }}
    >
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="taskName"
            label="Task Name"
            type="text"
            fullWidth
            value={taskName}
            onChange={handleTaskNameChange}
          />
        </div>
        <div className={classes.DialogContentInner}>
          <div>
            <FormControl>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ margin: "14px 6px" }}
              >
                <DatePicker
                  value={dueDate}
                  onChange={(newValue) => handleDueDateChange(newValue)}
                  sx={{ width: "196px" }}
                  //   size="small"
                />
              </DemoContainer>
            </FormControl>
          </div>
          <div className={classes.ColorWrapper}>
            <FormControl fullWidth>
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                value={color}
                label="Color"
                className={classes.SelectWrapperInner}
                onChange={handleColorChange}
                // size="small"
              >
                {colorsArr.map((c, index) => (
                  <MenuItem key={index} value={c.value}>
                    <div
                      className={classes.TaskCard}
                      style={{ backgroundColor: c.value }}
                    ></div>
                  </MenuItem>
                ))}
              </Select>
              {/* <DialogContentText>Due Date</DialogContentText> */}
            </FormControl>
          </div>
          <div className={classes.CategoryWrapper}>
            <FormControl fullWidth>
              <InputLabel id="demo-select-small">Category</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small2"
                value={category}
                label="Category"
                onChange={handleCategory}
              >
                <MenuItem value={"HOME"}>Home</MenuItem>
                <MenuItem value={"WORK"}>Work</MenuItem>
                <MenuItem value={"HEALTH"}>Health</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <DialogContentText>Subtasks</DialogContentText>
        <div className={classes.NewSubtaskOuter}>
          <div className={classes.NewSubtaskInner}>
            <TextField
              margin="dense"
              id="subtasks"
              label="Subtask"
              type="text"
              fullWidth
              value={newSubtask}
              size="small"
              onChange={handleSubtasksChange}
            />
          </div>
          <div>
            <Button
              variant="outlined"
              className={classes.SubtaskButton}
              onClick={subtaskSaveHandler}
            >
              <AddIcon />
            </Button>
          </div>
        </div>

        <List
          sx={{
            width: "100%",

            bgcolor: "#e1e5eb54",
            position: "relative",
            overflow: "auto",
            maxHeight: 250,
            minHeight: 180,
            "& ul": { padding: 0 },
            borderRadius: "4px",
          }}
          subheader={<li />}
        >
          {subtasks.map((value, index) => (
            <div className={classes.SubtaskList} key={index}>
              <div className={classes.SubtaskListNames}>
                <ListItem>
                  <ListItemText primary={value.subtask_name} />
                </ListItem>
              </div>
              <div className={classes.SubtaskListCheckbox}>
                <Checkbox
                  edge="start"
                  checked={value.status}
                  // tabIndex={-1}
                  // disableRipple
                  onChange={() =>
                    handleChange(!value.status, value.subtask_id, value)
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className={classes.SubtaskListDelete}>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.DeleteButton}
                  onClick={() => subtaskDeleteHandler(value.subtask_id)}
                >
                  <DeleteOutlineIcon className={classes.ButtonIcon} />
                </Button>
              </div>
            </div>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button variant="outlined" onClick={buttonSaveHandler} color="success">Save</Button>
        <Button onClick={taskDeleteHandler} variant="outlined" color="warning">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
