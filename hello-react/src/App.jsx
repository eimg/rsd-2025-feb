import { useContext } from "react";
import { AppContext } from "./AppProvider";

import Header from "./Header";
import { Outlet } from "react-router";

export default function App() {
    const { mode } = useContext(AppContext);

	return (
		<div
			style={{
				background: mode == "dark" ? "#222" : "#efefef",
                color: mode == "dark" ? "white" : "black",
				minHeight: 2000,
			}}>
			<div style={{ maxWidth: 600, margin: "auto" }}>
				<Header />

				<Outlet />
			</div>
		</div>
	);
}
