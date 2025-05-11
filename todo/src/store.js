import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import { fetchTasks } from "./todoSlice";

export const store = configureStore({
	reducer: {
		todo: todoReducer,
	},
});

store.dispatch(fetchTasks());
