import TaskComponent from "../TaskComponent/TaskComponent";
const TaskListComponent = ({ data, provided }) => {
  console.log(data);

  return (
    <>
      {data.map((val, idx) => {
        return <TaskComponent task={val} index={idx} key={val.task_id} />;
      })}
    </>
  );
};

export default TaskListComponent;
