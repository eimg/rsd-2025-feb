export default function Badge({ text }) {
	return (
		<span
			style={{
				background: "green",
				padding: "1px 5px",
				borderRadius: 5,
				fontSize: 12,
				color: "white",
			}}>
			{text}
		</span>
	);
}
