import { DragDropContext } from "react-beautiful-dnd";

import {  TableCell } from "@mui/material";
import TaskListComponent from "../TaskListComponent/TaskListComponent";
import { Droppable } from "react-beautiful-dnd";
import classes from "./DragDropComponent.module.css";
import {  useDispatch } from "react-redux";
import { changeTaskStatus } from "../../../store/ToDo";
import { changeTaskStatusOnDB } from "../../../services/ToDoApiService";

const DragDropComponent = ({
  toDoTasks,
  inProcessTasks,
  setToDoTasks,
  setInProcessTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  const dispatch = useDispatch();

  const changeTaskStatusAPI = (taskId, newStatus) => {
    // Implement API call here to update the task status
    console.log(taskId,newStatus,'aas')
    changeTaskStatusOnDB(taskId,newStatus)

  };

  const updateTask = (source, destination) => {
    const tasks = ["TodosList", "inProcessList", "completedList"];
    const states = [toDoTasks, inProcessTasks, completedTasks];
    const setStates = [setToDoTasks, setInProcessTasks, setCompletedTasks];
    const statuses = ["TODO", "INPROCESS", "COMPLETED"];

    const sourceIndex = tasks.indexOf(source.droppableId);
    const destIndex = tasks.indexOf(destination.droppableId);

    const add = { ...states[sourceIndex][source.index], status: statuses[destIndex] };
    states[sourceIndex].splice(source.index, 1);
    states[destIndex].splice(destination.index, 0, add);

    setStates[sourceIndex](states[sourceIndex]);
    setStates[destIndex](states[destIndex]);

    dispatch(changeTaskStatus({ task_id: add.task_id, status: statuses[destIndex] }));
    changeTaskStatusAPI(add.task_id, statuses[destIndex]);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      updateTask(source, destination);
    } else {
      const taskLists = {
        TodosList: [toDoTasks, setToDoTasks],
        inProcessList: [inProcessTasks, setInProcessTasks],
        completedList: [completedTasks, setCompletedTasks],
      };

      const [start, setStart] = taskLists[source.droppableId];
      const itemToMove = start[source.index];
      start.splice(source.index, 1);
      start.splice(destination.index, 0, itemToMove);
      setStart(start);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <TableCell
            ref={provided.innerRef}
            align="center"
            {...provided.droppableProps}
            className={`${classes.ToDo} ${
              snapshot.isDraggingOver ? classes.DragToDo : ""
            }`}
            sx={{ border: "none", width: "30%",background: "#e0e4ff87" }}
          >
            <TaskListComponent data={toDoTasks} provided={provided} />
            {provided.placeholder}
          </TableCell>
        )}
      </Droppable>
      <Droppable droppableId="inProcessList">
        {(provided, snapshot) => (
          <TableCell
            align="center"
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ border: "none", width: "30%",background: "#96adff87" }}
            className={`${classes.ToDo} $ ${
              snapshot.isDraggingOver ? classes.DragInProcess : ""
            }`}
          >
            <TaskListComponent data={inProcessTasks} provided={provided} />
            {provided.placeholder}
          </TableCell>
        )}
      </Droppable>
      <Droppable droppableId="completedList">
        {(provided, snapshot) => (
          <TableCell
            align="center"
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ border: "none", width: "30%" ,background: "#e3f1bdcc"}}
            className={`${classes.ToDo} $ ${
              snapshot.isDraggingOver ? classes.DragCompleted : ""
            }`}
          >
            <TaskListComponent data={completedTasks} provided={provided} />
            {provided.placeholder}
          </TableCell>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropComponent;
