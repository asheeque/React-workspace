import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    fetch_initial_data(state, action) {
      state.tasks = action.payload.tasks;
    },

    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    addSubtask: (state, action) => {
      const payload = action.payload;
      const taskId = payload.task_id;
      const subTask = payload.subtask;
      const taskIndex = state.tasks.findIndex(
        (task) => task.task_id === taskId
      );
      state.tasks[taskIndex].subtasks.push(...subTask);
    },
    deleteTask(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.task_id === action.payload.task_id
      );
      state.tasks.splice(taskIndex, 1);
    },
    changeTaskStatus(state, action) {
      const { task_id, status } = action.payload;
      const taskIndex = state.tasks.findIndex(
        (task) => task.task_id === task_id
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = status;
      }
      
    },
    deleteSubtask: (state, action) => {
      const { task_id, subtask_id } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.task_id === task_id);
      if (taskIndex !== -1) {
        const subtaskIndex = state.tasks[taskIndex].subtasks.findIndex((subtask) => subtask.subtask_id === subtask_id);
        if (subtaskIndex !== -1) {
          state.tasks[taskIndex].subtasks.splice(subtaskIndex, 1);
        }
      }
    },
    
  },
});

export const {
  fetch_initial_data,
  addTask,
  addSubtask,
  deleteTask,
  changeTaskStatus,
  deleteSubtask
} = todoSlice.actions;

export default todoSlice.reducer;
