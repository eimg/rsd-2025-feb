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
} from "@mui/icons-material";

import { green } from "@mui/material/colors";
import { formatRelative } from "date-fns";
import { useNavigate } from "react-router";

export default function Post({ post }) {
	const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
						mb: 1,
					}}>
					<Avatar />
					<Box>
						<Typography>{post.user.name}</Typography>
						<Typography sx={{ fontSize: 12, color: green[500] }}>
                            {formatRelative(new Date(post.created), new Date())}
						</Typography>
					</Box>
				</Box>
				<Typography
					sx={{ cursor: "pointer" }}
					onClick={() => navigate(`/show/${post.id}`)}>
					{post.content}
				</Typography>
				<Box
					sx={{ display: "flex", justifyContent: "space-around", pt: 3, }}>
					<ButtonGroup>
						<IconButton>
							<LikeIcon color="error" fontSize="18" />
						</IconButton>
						<Button variant="text" size="small">0</Button>
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
