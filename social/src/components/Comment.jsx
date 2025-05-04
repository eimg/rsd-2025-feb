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
import { useApp } from "../AppProvider";
import { formatRelative } from "date-fns";

export default function Comment({ comment }) {
	const { user } = useApp();
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			const token = localStorage.getItem("token");
			const response = await fetch(`http://localhost:8080/comments/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to delete comment");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["post"] });
		},
	});

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this comment?")) {
			try {
				await deleteMutation.mutateAsync(comment.id);
			} catch (error) {
				console.error("Error deleting comment:", error);
			}
		}
	};

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
					{user && user.id === comment.user.id && (
						<IconButton
							size="small"
							color="error"
							onClick={handleDelete}
							disabled={deleteMutation.isPending}>
							<DeleteIcon fontSize="inherit" />
						</IconButton>
					)}
				</Box>
				<Typography>{comment.content}</Typography>
			</CardContent>
		</Card>
	);
}
