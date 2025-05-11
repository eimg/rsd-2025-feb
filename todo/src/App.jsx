import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTask, deleteTask } from "./todoSlice";

export default function App() {
    const nameRef = useRef();

    const data = useSelector(state => state.todo.tasks);
    const tasks = data.filter(item => !item.done);
    const done = data.filter(item => item.done);

    const dispatch = useDispatch();

    return (
		<div>
			<h1>Todo</h1>
			<form
				onSubmit={e => {
					e.preventDefault();
					const name = nameRef.current.value;
					if (name == "") return false;

					dispatch(addTask(name));

					e.currentTarget.reset();
				}}>
				<input
					type="text"
					ref={nameRef}
					placeholder="Name"
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{tasks.map(task => {
					return (
						<li key={task.id}>
							<a
								onClick={() => dispatch(deleteTask(task.id))}
								href="#"
								style={{
									marginRight: 10,
									textDecoration: "none",
								}}>
								&times;
							</a>
							<a
								onClick={() => dispatch(toggleTask(task.id))}
								href="#"
								style={{
									marginRight: 20,
									textDecoration: "none",
								}}>
								▢
							</a>
							{task.name}
						</li>
					);
				})}
			</ul>
			
			<ul style={{ marginTop: 40, opacity: 0.6 }}>
				{done.map(task => {
					return (
						<li key={task.id}>
							<a
								onClick={() => dispatch(deleteTask(task.id))}
								href="#"
								style={{
									marginRight: 10,
									textDecoration: "none",
								}}>
								&times;
							</a>
							<a
								onClick={() => dispatch(toggleTask(task.id))}
								href="#"
								style={{
									marginRight: 20,
									textDecoration: "none",
									color: "green",
								}}>
								✔
							</a>
							{task.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
