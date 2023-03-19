import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddTaskComponent from "./AddTaskComponent/AddTaskComponent";
import DragDropComponent from "./DragDropComponent/DragDropComponent";
import { useSelector, useDispatch } from "react-redux";
// import data from "./TASKS.json";
import { fetch_initial_data } from "../../store/ToDo";
import { fetchUserTasks } from "../../services/ToDoApiService";

const ToDoComponent = () => {
  const dispatch = useDispatch();
  
  const DATA = useSelector((state) => state.todo.tasks);
  const [tasks, setTasks] = useState(DATA);


  

  useEffect(() =>{
    // dispatch(fetch_initial_data(data));

    const fetchTasks = async () => {
      const data = await fetchUserTasks();
      // console.log(data)
      dispatch(fetch_initial_data(data));
    };
    fetchTasks()
  },[dispatch])

  
  const columns = [
    { id: "toDo", label: "ToDo", minWidth: 170, align: "center" },
    { id: "inProcess", label: "In Process", minWidth: 170, align: "center" },
    { id: "done", label: "Done", minWidth: 170, align: "center" },
  ];
  
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProcessTasks, setInProcessTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() =>{

    setTasks(DATA)
  },[DATA])

  useEffect(() =>{
    setToDoTasks(tasks.filter(task => task.status === 'TODO'));
    setInProcessTasks(tasks.filter(task => task.status === 'INPROCESS'));
    setCompletedTasks(tasks.filter(task => task.status === 'COMPLETED'));

  },[tasks])
  

//   setTimeout(()=>{

//     console.log(toDoTasks)
//   },3000)
  const addToDoHandler = (data) => {
    let newData = {
      id: toDoTasks.length + Math.floor(Math.random() * 10000),
      content: data,
    };

    setToDoTasks((prev) => [...prev, newData]);
  };

  return (
    <Paper sx={{ width: "100%", height: "90%",boxShadow:"none" }}>
      {/* <div>Hi {authData.username}</div> */}
      <AddTaskComponent addDataHandler={addToDoHandler} />
      
      <TableContainer sx={{ height: "90%" }}>
        <Table
          stickyHeader
          aria-label="stick table"
          sx={{ width: "100%", height: "90%" }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                TO DO TABLE
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <DragDropComponent
                toDoTasks={toDoTasks}
                setToDoTasks={setToDoTasks}
                setInProcessTasks={setInProcessTasks}
                inProcessTasks={inProcessTasks}
                completedTasks={completedTasks}
                setCompletedTasks={setCompletedTasks}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ToDoComponent;
