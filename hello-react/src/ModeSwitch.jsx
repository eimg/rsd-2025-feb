import { useContext } from "react";
import { AppContext } from "./AppProvider";

export default function ModeSwitch() {
    const { mode, setMode } = useContext(AppContext);

	return (
		<button
			onClick={() => {
				if (mode == "dark") setMode("light");
				else setMode("dark");
			}}>
			{mode == "dark" ? "Light" : "Dark"}
		</button>
	);
}
