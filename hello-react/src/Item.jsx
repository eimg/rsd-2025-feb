import Badge from "./Badge";

export default function Item({ item, del }) {
	return (
		<div>
			<button
				style={{ marginRight: 10 }}
				onClick={() => del(item.id)}>
				Del
			</button>
			{item.content} - <Badge text={item.date} />
		</div>
	);
}
