import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";

export default function AddPost() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: async (data) => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to create post");
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            navigate("/");
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await mutation.mutateAsync(data);
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Create New Post
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Content"
                    {...register("content", { required: "Content is required" })}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                    sx={{ mb: 2 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                >
                    {isSubmitting ? <CircularProgress size={24} /> : "Create Post"}
                </Button>
            </form>
        </Box>
    );
} 