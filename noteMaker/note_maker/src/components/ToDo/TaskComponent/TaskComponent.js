import { Card, CardContent, Chip } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import { Draggable } from "react-beautiful-dnd";
import classes from "./TaskComponent.module.css";
import { useState } from "react";
import SubtaskComponent from "../SubtaskComponent/SubtaskComponent";
import { format } from "date-fns";
import EditTaskModal from "../EditTaskComponent/EditTaskModal";

const TaskComponent = ({ task, index }) => {
  const [taskName, setTaskName] = useState("");
  const formattedDueDate = format(new Date(task.due_date), "MMM dd");
  React.useEffect(() => {
    setTaskName(task.task_name);
  }, [task.task_name]);

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const displaySubtasks = () => {
    const numberOfSubtasks = 3;
    return (
      <ul className={classes.SubtaskList}>
        {task.subtasks.slice(0, numberOfSubtasks).map((st, idx) => (
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

 

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSave = () => {
    // Implement the logic to save the updated task and subtasks
    setModalOpen(false);
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
                <div className={classes.CardHeader}>{Capitalize(taskName)}</div>
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
                <div>{displaySubtasks()}</div>
              </div>
              <div
                className={classes.ButtonContainer}
                style={{
                  bottom: "-18px",
                  right: "-4px",
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.Button}
                  onClick={handleModalOpen}
                >
                  Edit
                </Button>

                <EditTaskModal
                  open={modalOpen}
                  handleClose={handleModalClose}
                  task={task}
                  handleSave={handleModalSave}
                />
              
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
