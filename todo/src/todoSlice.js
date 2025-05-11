import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("todo/fetchTasks", async () => {
	const response = await fetch("http://localhost:8888/tasks");
	const data = await response.json();
	return data;
});

export const addTask = createAsyncThunk("todo/addTask", async name => {
	const response = await fetch("http://localhost:8888/tasks", {
		method: "POST",
		body: JSON.stringify({ name }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
});

export const toggleTask = createAsyncThunk("todo/toggleTask", async id => {
	const response = await fetch(`http://localhost:8888/tasks/${id}/toggle`, {
		method: "PUT",
	});
	const data = await response.json();
	return data;
});

export const deleteTask = createAsyncThunk("todo/deleteTask", async id => {
	const response = await fetch(`http://localhost:8888/tasks/${id}`, {
		method: "DELETE",
	});
	const data = await response.json();
	return data;
});

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		tasks: [],
	},
	reducers: {
		add: (state, action) => {
			const id = state.tasks[0].id + 1;
			state.tasks.unshift({ id, name: action.payload, done: false });
		},
		del: (state, action) => {
			state.tasks = state.tasks.filter(
				item => item.id !== action.payload
			);
		},
		toggle: (state, action) => {
			state.tasks = state.tasks.map(item => {
				if (item.id === action.payload) item.done = !item.done;
				return item;
			});
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchTasks.fulfilled, (state, action) => {
			state.tasks = action.payload;
		});
		builder.addCase(addTask.fulfilled, (state, action) => {
			state.tasks.push(action.payload);
		});
		builder.addCase(toggleTask.fulfilled, (state, action) => {
			state.tasks = state.tasks.map(item => {
				if (item.id === action.payload.id) item.done = !item.done;
				return item;
			});
		});
		builder.addCase(deleteTask.fulfilled, (state, action) => {
			state.tasks = state.tasks.filter(
				item => item.id !== action.payload.id
			);
		});
	},
});

export const { add, del, toggle } = todoSlice.actions;
export default todoSlice.reducer;
