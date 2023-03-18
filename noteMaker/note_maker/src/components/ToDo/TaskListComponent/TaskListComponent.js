import TaskComponent from "../TaskComponent/TaskComponent";
const TaskListComponent = ({ data, provided }) => {

  return (
    <>
      {data.map((val, idx) => {
        return <TaskComponent task={val} index={idx} key={val.task_id} />;
      })}
    </>
  );
};

export default TaskListComponent;
