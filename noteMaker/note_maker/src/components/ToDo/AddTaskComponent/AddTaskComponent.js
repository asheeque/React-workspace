import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import classes from "./AddTaskComponent.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addTask } from "../../../store/ToDo";

const AddTaskComponent = ({ addDataHandler }) => {
  const dispatch = useDispatch();
  const colors = [
    {
      id: "1",
      value: "#fff740",
    },
    {
      id: "2",
      value: "#feff9c",
    },
    {
      id: "3",
      value: "#7afcff",
    },
    {
      id: "4",
      value: "#ff65a3",
    },
    {
      id: "5",
      value: "#ff7eb9",
    },
  ];
  const [currentTask, setCurrentTask] = useState("");
  const [color, setColor] = useState("#ff7eb9");

  const enterKeyHandler = (e) => {
    if (e.keyCode === 13) buttonClickHandler();
  };


  const buttonClickHandler = () => {
    if (currentTask.trim() === "") return;

    // console.log(Math.random() * 100)
    let newTask = {
      task_id: Math.floor(Math.random() * 100),
      task_name: currentTask.trim(),
      due_date: "2023-03-15",
      priority: "Medium",
      category: "Work",
      status: "TODO",
      color: color,
      subtasks: [
       
      ],
    };

    dispatch(addTask(newTask));
    setCurrentTask("")

  };

  const selectColorHandler = (e) => {
    console.log(e);
    setColor(e.target.value);
  };

  return (
    <div className={classes.OuterWrapper} onKeyUp={enterKeyHandler}>
      <div className={classes.InputWrapper}>
        <TextField
          id="outlined-basic"
          label="Task Name"
          variant="outlined"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
        />
      </div>
      <div className={classes.SelectWrapper}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Color</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={color}
            label="Color"
            onChange={selectColorHandler}
          >
            {colors.map((it, idx) => {
              return (
                <MenuItem value={it.value} key={it.id}>
                  <div
                    className={classes.TaskCard}
                    style={{ backgroundColor: it.value }}
                  >
                    <div></div>
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className={classes.ButtonWrapper}>
        <button onClick={buttonClickHandler}>
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default AddTaskComponent;
