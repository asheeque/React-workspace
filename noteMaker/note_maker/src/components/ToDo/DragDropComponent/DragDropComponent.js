import { DragDropContext } from "react-beautiful-dnd";

import {  TableCell } from "@mui/material";
import TaskListComponent from "../TaskListComponent/TaskListComponent";
import { Droppable } from "react-beautiful-dnd";
import classes from "./DragDropComponent.module.css";
import {  useDispatch } from "react-redux";
import { changeTaskStatus } from "../../../store/ToDo";

const DragDropComponent = ({
  toDoTasks,
  inProcessTasks,
  setToDoTasks,
  setInProcessTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  const dispatch = useDispatch();

  const transferTask = (result) => {
    const { source, destination } = result;
    let startTask;
    let endTask;
    let add;
    if (
      source.droppableId === "TodosList" &&
      destination.droppableId === "inProcessList"
    ) {
      startTask = toDoTasks;
      endTask = inProcessTasks;
      add = { ...startTask[source.index] };
      console.log(add);
      if (Object.keys(add).length > 1) {
        add["status"] = "INPROCESS";
      }
      startTask.splice(source.index, 1);
      endTask.splice(destination.index, 0, add);
      console.log(add);
      
      setToDoTasks(startTask);
      setInProcessTasks(endTask);
      dispatch(changeTaskStatus({task_id:add.task_id,status:"INPROCESS"}));
    } else if (
      source.droppableId === "TodosList" &&
      destination.droppableId === "completedList"
    ) {
      startTask = toDoTasks;
      endTask = completedTasks;
      add = { ...startTask[source.index] };
      if (Object.keys(add).length > 1) {
        add["status"] = "COMPLETED";
      }
      startTask.splice(source.index, 1);
      endTask.splice(destination.index, 0, add);
      setToDoTasks(startTask);
      setCompletedTasks(endTask);
      dispatch(changeTaskStatus({task_id:add.task_id,status:"COMPLETED"}));

    } else if (
      source.droppableId === "inProcessList" &&
      destination.droppableId === "TodosList"
    ) {
      startTask = inProcessTasks;
      endTask = toDoTasks;
      add = { ...startTask[source.index] };
      if (Object.keys(add).length > 1) {
        add["status"] = "TODO";
      }
      startTask.splice(source.index, 1);
      endTask.splice(destination.index, 0, add);
      setToDoTasks(endTask);
      setInProcessTasks(startTask);
      dispatch(changeTaskStatus({task_id:add.task_id,status:"TODO"}));
    } else if (
      source.droppableId === "inProcessList" &&
      destination.droppableId === "completedList"
    ) {
      startTask = inProcessTasks;
      endTask = completedTasks;
      add = { ...startTask[source.index] };
      if (Object.keys(add).length > 1) {
        add["status"] = "COMPLETED";
      }
      startTask.splice(source.index, 1);
      endTask.splice(destination.index, 0, add);
      setCompletedTasks(endTask);
      setInProcessTasks(startTask);
      dispatch(changeTaskStatus({task_id:add.task_id,status:"COMPLETED"}));

    } else if (
      source.droppableId === "completedList" &&
      destination.droppableId === "inProcessList"
    ) {
      startTask = completedTasks;
      endTask = inProcessTasks;
      add = { ...startTask[source.index] };
      if (Object.keys(add).length > 1) {
        add["status"] = "INPROCESS";
      }
      startTask.splice(source.index, 1);
      endTask.splice(destination.index, 0, add);
      setCompletedTasks(startTask);
      setInProcessTasks(endTask);
      dispatch(changeTaskStatus({task_id:add.task_id,status:"INPROCESS"}));
    } else if (
      source.droppableId === "completedList" &&
      destination.droppableId === "TodosList"
    ) {
      startTask = completedTasks;
      endTask = toDoTasks;
      add = { ...startTask[source.index] };
      if (Object.keys(add).length > 1) {
        add["status"] = "TODO";
      }
      startTask.splice(source.index, 1);
      endTask.splice(destination.index, 0, add);
      setCompletedTasks(startTask);
      setToDoTasks(endTask);
      dispatch(changeTaskStatus({task_id:add.task_id,status:"TODO"}));
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      transferTask(result);
    } else {
      let start;
      if (source.droppableId === "TodosList") {
        start = toDoTasks;
      } else if (source.droppableId === "inProcessList") {
        start = inProcessTasks;
      } else if (source.droppableId === "completedList") {
        start = completedTasks;
      }
      const itemToMove = start[source.index];
      start.splice(source.index, 1);
      start.splice(destination.index, 0, itemToMove);
      if (source.droppableId === "TodosList") {
        setToDoTasks(start);
      } else if (source.droppableId === "inProcessList") {
        setInProcessTasks(start);
      } else if (source.droppableId === "completedList") {
        setCompletedTasks(start);
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <TableCell
            ref={provided.innerRef}
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
