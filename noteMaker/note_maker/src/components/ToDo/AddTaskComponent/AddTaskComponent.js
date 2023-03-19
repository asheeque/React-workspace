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
import { addUserTask } from "../../../services/ToDoApiService";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddTaskComponent = ({ addDataHandler }) => {
  const dispatch = useDispatch();
  const colors = [
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
  const [currentTask, setCurrentTask] = useState("");
  const [color, setColor] = useState("#ff3b30c7");
  const [category, setCategory] = useState("HOME");

  const [dueDate,setDueDate] = useState(new Date())
  const enterKeyHandler = (e) => {
    if (e.keyCode === 13) buttonClickHandler();
  };

  const handleCategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  const buttonClickHandler = async () => {
    if (currentTask.trim() === "") return;

    // console.log(Math.random() * 100)


    let newTask = {
      task_name: currentTask.trim(),
      due_date: dueDate,
      priority: "HIGH",
      category: category,
      status: "TODO",
      color: color,
      subtasks: [],
    };
    console.log(dueDate,category)

    const addTaskToDB = await addUserTask(newTask);
    if (addTaskToDB) {
      console.log(addTaskToDB, "mewo");
      const task_id = addTaskToDB["Task"]["id"];
      newTask["task_id"] = task_id;
      newTask["due_date"] = addTaskToDB["Task"]["due_date"]
      
      dispatch(addTask(newTask));
      setCurrentTask("");
    }
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
            className={classes.SelectWrapperInner}
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
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={"HOME"}>Home</MenuItem>
            <MenuItem value={"WORK"}>Work</MenuItem>
            <MenuItem value={"HEALTH"}>Health</MenuItem>
          </Select>
        </FormControl>
      </div>

      <DemoContainer components={['DatePicker']} sx={{"margin": "14px 6px"}}>
        <DatePicker value={dueDate} onChange={(newValue) => setDueDate(newValue)} sx={{"width": "196px"}} />
      </DemoContainer>
      <div className={classes.ButtonWrapper}>
        <button onClick={buttonClickHandler}>
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default AddTaskComponent;
