import {
	Avatar,
	Box,
	Card,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Delete as DeleteIcon } from "@mui/icons-material";

import { formatRelative } from "date-fns";

async function deleteComment(id) {
	const api = `http://localhost:8080/comments/${id}`;
	const res = await fetch(api, { method: "DELETE" });

	return res.json();
}

export default function Post({ comment }) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteComment,
		onSuccess: () => {
			queryClient.invalidateQueries("post");
		},
	});

	return (
		<Card
			sx={{
				mb: 2,
				background: "transparent",
				border: `1px solid ${grey[700]}`,
			}}>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
                        alignItems: "flex-start",
						gap: 1,
						mb: 1,
					}}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<Avatar />
						<Box>
							<Typography>{comment.user.name}</Typography>
							<Typography sx={{ fontSize: 12, color: grey[500] }}>
								{formatRelative(
									new Date(comment.created),
									new Date()
								)}
							</Typography>
						</Box>
					</Box>
					<IconButton
                        size="small"
						color="error"
						onClick={() => mutation.mutate(comment.id)}>
						<DeleteIcon fontSize="inherit" />
					</IconButton>
				</Box>
				<Typography>{comment.content}</Typography>
			</CardContent>
		</Card>
	);
}
