import ModeSwitch from "./ModeSwitch";

export default function Header() {
	return (
		<div
			style={{
				padding: "20px 0",
				display: "flex",
				justifyContent: "space-between",
			}}>
			<h1 style={{ margin: 0 }}>
                Hello React
            </h1>
			<ModeSwitch />
		</div>
	);
}
