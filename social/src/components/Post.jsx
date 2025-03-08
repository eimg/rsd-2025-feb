import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function Post({ post }) {
	const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, }}>
					<Avatar />
					<Typography>{post.user.name}</Typography>
				</Box>
				<Typography
					sx={{ cursor: "pointer" }}
					onClick={() => navigate(`/show/${post.id}`)}>
					{post.content}
				</Typography>
			</CardContent>
		</Card>
	);
}
