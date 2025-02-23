import { Box, Drawer, List, ListItem, ListItemText, ListItemButton, } from "@mui/material";
import { useApp } from "../AppProvider";

import { useNavigate } from "react-router";

export default function AppDrawer() {
	const { openDrawer, setOpenDrawer } = useApp();

	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	const navigate = useNavigate();

	return (
		<Drawer
			anchor="left"
			open={openDrawer}
			onClose={toggleDrawer}>
			<Box
				sx={{ width: 300 }}
				onClick={toggleDrawer}>
				<Box sx={{ height: 200, background: "grey" }}></Box>
				<List>
					<ListItem>
						<ListItemButton onClick={() => navigate("/")}>
							<ListItemText primary="Home" />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton onClick={() => navigate("/login")}>
							<ListItemText primary="Login" />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton onClick={() => navigate("/register")}>
							<ListItemText primary="Register" />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton onClick={() => navigate("/profile")}>
							<ListItemText primary="Profile" />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
}
