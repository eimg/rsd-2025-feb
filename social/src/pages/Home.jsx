import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

async function fetchPosts() {
    const api = "http://localhost:8080/posts";
    const res = await fetch(api);

    return await res.json();
}

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts().then((data) => {
            setPosts(data);
            setIsLoading(false);
        }).catch((err) => {
            setError(err);
            setIsLoading(false);
        });
    }, []);

	return (
		<Box>
			<Typography variant="h1">Home</Typography>

            {isLoading && <Typography>Loading...</Typography>}

            {error && <Typography>Error: {error.message}</Typography>}

			{posts.map(post => (
				<Card key={post.id} sx={{ mb: 2 }}>
					<CardContent>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1,
                                mb: 1
							}}>
							<Avatar />
							<Typography>{post.user.name}</Typography>
						</Box>
						<Typography>{post.content}</Typography>
					</CardContent>
				</Card>
			))}
		</Box>
	);
}
