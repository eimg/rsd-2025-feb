import { Box, Typography } from "@mui/material";
import { useState } from "react";

function fetchPosts() {
    
}

export default function Home() {
    const [posts, setPosts] = useState([]);

	return (
		<Box>
			<Typography variant="h1">Home</Typography>
		</Box>
	);
}
