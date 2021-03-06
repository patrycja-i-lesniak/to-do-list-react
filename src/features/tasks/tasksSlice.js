import { createSlice } from "@reduxjs/toolkit";
import { getTasksFromLocalStorage } from "./tasksLocalStorage";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: getTasksFromLocalStorage(),
        hideDone: false,
        loading: false,
    },

    reducers: {
        addTask: ({ tasks }, { payload: task }) => {
            tasks.push(task);
        },

        toggleHideDone: state => {
            state.hideDone = !state.hideDone;
        },

        toggleTaskDone: ({ tasks }, { payload: taskId }) => {
            const index = tasks.findIndex(({ id }) => id === taskId);
            tasks[index].done = !tasks[index].done;
        },

        removeTask: ({ tasks }, { payload }) => {
            const index = tasks.findIndex(({ id }) => id === payload);
            tasks.splice(index, 1);
        },

        setAllDone: ({ tasks }) => {
            for (const task of tasks) {
                task.done = true;
            }
        },

        setAllUndone: ({ tasks }) => {
            for (const task of tasks) {
                task.done = false;
            }
        },

        deleteAllTasks: state => {
           state.tasks = [];
        },

        fetchExampleTasks: state => {
            state.loading = true;
        },

        fetchExampleTasksSuccess: (state, { payload: tasks }) => {
            state.tasks = tasks;
            state.loading = false;
        },

        fetchExampleTasksError: state => {
            state.loading = false;
        },
    },
});

export const {
    addTask,
    toggleHideDone,
    toggleTaskDone,
    removeTask,
    setAllDone,
    setAllUndone,
    deleteAllTasks,
    fetchExampleTasks,
    fetchExampleTasksSuccess,
    fetchExampleTasksError,
} = tasksSlice.actions;

const selectTasksState = state => state.tasks;

export const selectLoading = state => selectTasksState(state).loading;
export const selectTasks = state => selectTasksState(state).tasks;
export const selectHideDone = state => selectTasksState(state).hideDone;
export const selectAreTasksEmpty = state => selectTasks(state).lenght === 0;
export const selectIsEveryTaskDone = state => selectTasks(state).every(({ done }) => done);
export const selectIsEveryTaskUndone = state => selectTasks(state).every(({ done }) => !done);


export const getTaskById = (state, taskId) =>
    selectTasks(state).find(({ id }) => id === taskId);

export const selectTasksByQuery = (state, query) => {
    const tasks = selectTasks(state);

    if (!query || query.trim()) {
        return tasks;
    }
    return (
        tasks.filter(({ content }) =>
            content.toUpperCase().includes(query.trim().toUpperCase()))
    );
};

export default tasksSlice.reducer;