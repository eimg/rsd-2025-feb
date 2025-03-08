import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { useParams } from "react-router";

async function fetchPost(id) {
	const api = `http://localhost:8080/posts/${id}`;
	const res = await fetch(api);

	return res.json();
}

export default function Show() {
    const { id } = useParams();

	const {
		data: post,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => fetchPost(id),
	});

	if (error) {
		return <Typography>Error: {error.message}</Typography>;
	}

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<Box>
            <Post post={post} />
            
			{post.comments.map(comment => (
				<Comment
					key={comment.id}
					comment={comment}
				/>
			))}
		</Box>
	);
}
