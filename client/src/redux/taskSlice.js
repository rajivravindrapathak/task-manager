import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch tasks from API
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await fetch('http://localhost:5000/tasks');
    return response.json();
});

// Add task to API
export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
});

// Delete task from API
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    return id;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                return state.filter(task => task._id !== action.payload);
            });
    },
});

export default taskSlice.reducer;
