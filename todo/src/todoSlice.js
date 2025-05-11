import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
		tasks: [
			{ id: 4, name: "Something to do", done: false },
			{ id: 3, name: "More to do", done: false },
			{ id: 2, name: "Yet another to do", done: true },
			{ id: 1, name: "Extra things to do", done: false },
		],
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
                if(item.id === action.payload) item.done = !item.done;
                return item;
            });
        },
	},
});

export const { add, del, toggle } = todoSlice.actions;
export default todoSlice.reducer;
