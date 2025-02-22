import { Link } from "react-router";
import ModeSwitch from "./ModeSwitch";

export default function Header() {
	return (
		<div>
			<div
				style={{
					padding: "20px 0",
					display: "flex",
					justifyContent: "space-between",
				}}>
				<h1 style={{ margin: 0 }}>Hello React</h1>
				<ModeSwitch />
			</div>
            <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
		</div>
	);
}
