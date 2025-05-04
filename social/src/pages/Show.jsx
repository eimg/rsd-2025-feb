import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { useParams } from "react-router";
import { useApp } from "../AppProvider";

async function fetchPost(id) {
	const token = localStorage.getItem("token");
	const response = await fetch(`http://localhost:8080/posts/${id}`, {
		headers: token ? {
			Authorization: `Bearer ${token}`,
		} : {},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch post");
	}

	return response.json();
}

export default function Show() {
    const { id } = useParams();
    const { user } = useApp();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

	const {
		data: post,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => fetchPost(id),
	});

    const commentMutation = useMutation({
        mutationFn: async (data) => {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    content: data.content,
                    postId: parseInt(id),
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to create comment");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", id] });
            reset();
        },
    });

    const onSubmit = async (data) => {
        try {
            await commentMutation.mutateAsync(data);
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

	if (error) {
		return <Typography>Error: {error.message}</Typography>;
	}

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<Box>
            <Post post={post} />
            
            {user && (
                <Box sx={{ p: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Add a comment"
                            {...register("content", { required: "Comment is required" })}
                            error={!!errors.content}
                            helperText={errors.content?.message}
                            sx={{ mb: 1 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={commentMutation.isPending}
                        >
                            {commentMutation.isPending ? (
                                <CircularProgress size={24} />
                            ) : (
                                "Comment"
                            )}
                        </Button>
                    </form>
                </Box>
            )}

            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Comments ({post.comments.length})
                </Typography>
                {post.comments.map(comment => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                    />
                ))}
            </Box>
		</Box>
	);
}
