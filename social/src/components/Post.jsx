import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";

import {
	ChatBubbleOutline as CommentIcon,
	FavoriteBorder as LikeIcon,
	Favorite as LikedIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";

import { green } from "@mui/material/colors";
import { formatRelative } from "date-fns";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../AppProvider";

export default function Post({ post }) {
	const navigate = useNavigate();
	const { user } = useApp();
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: async () => {
			const token = localStorage.getItem("token");
			const response = await fetch(`http://localhost:8080/posts/${post.id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to delete post");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});

	const likeMutation = useMutation({
		mutationFn: async () => {
			const token = localStorage.getItem("token");
			const response = await fetch(`http://localhost:8080/posts/${post.id}/like`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to like post");
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post"] });
		},
	});

	const unlikeMutation = useMutation({
		mutationFn: async () => {
			const token = localStorage.getItem("token");
			const response = await fetch(`http://localhost:8080/posts/${post.id}/unlike`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to unlike post");
			}
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post"] });
		},
	});

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			try {
				await deleteMutation.mutateAsync();
			} catch (error) {
				console.error("Error deleting post:", error);
			}
		}
	};

	const handleLike = async () => {
		try {
			await likeMutation.mutateAsync();
		} catch (error) {
			console.error("Error liking post:", error);
		}
	};

	const handleUnlike = async () => {
		try {
			await unlikeMutation.mutateAsync();
		} catch (error) {
			console.error("Error unliking post:", error);
		}
	};

	const isLiked = user && post.postLikes.some(like => like.userId === user.id);

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						mb: 1,
					}}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<Avatar />
						<Box>
							<Typography>{post.user.name}</Typography>
							<Typography sx={{ fontSize: 12, color: green[500] }}>
								{formatRelative(new Date(post.created), new Date())}
							</Typography>
						</Box>
					</Box>
					{user && user.id === post.user.id && (
						<IconButton
							color="error"
							onClick={handleDelete}
							disabled={deleteMutation.isPending}>
							<DeleteIcon />
						</IconButton>
					)}
				</Box>
				<Typography
					sx={{ cursor: "pointer" }}
					onClick={() => navigate(`/show/${post.id}`)}>
					{post.content}
				</Typography>
				<Box
					sx={{ display: "flex", justifyContent: "space-around", pt: 3, }}>
					<ButtonGroup>
						<IconButton
							onClick={isLiked ? handleUnlike : handleLike}
							disabled={!user || likeMutation.isPending || unlikeMutation.isPending}>
							{isLiked ? (
								<LikedIcon color="error" fontSize="18" />
							) : (
								<LikeIcon color="error" fontSize="18" />
							)}
						</IconButton>
						<Button variant="text" size="small">
							{post.postLikes.length}
						</Button>
					</ButtonGroup>

					<ButtonGroup onClick={() => navigate(`/show/${post.id}`)}>
						<IconButton>
							<CommentIcon color="success" fontSize="18" />
						</IconButton>
						<Button variant="text" size="small"> 
							{post.comments.length}
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
