import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton,
	Badge,
} from "@mui/material";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
	ArrowBack as BackIcon,
	Add as AddIcon,
	Notifications as NotificationsIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";
import { useLocation, useNavigate } from "react-router";

import { useQuery } from "@tanstack/react-query";

export default function Header() {
	const { mode, setMode, setOpenDrawer, user } = useApp();
	const location = useLocation();
	const navigate = useNavigate();

	const { data: notis } = useQuery({
		queryKey: ["notis"],
		queryFn: async () => {
			const res = await fetch("http://localhost:8080/notis", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			return res.json();
		},
		enabled: !!user,
        refetchInterval: 2000,
	});

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{location.pathname == "/" ? (
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							sx={{ mr: 2 }}
							onClick={() => {
								setOpenDrawer(true);
							}}>
							<MenuIcon />
						</IconButton>
					) : (
						<IconButton
							edge="start"
							color="inherit"
							sx={{ mr: 2 }}
							onClick={() => window.history.back()}>
							<BackIcon />
						</IconButton>
					)}

					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}>
						News
					</Typography>
					{user && location.pathname === "/" && (
						<IconButton
							color="inherit"
							onClick={() => navigate("/add")}
							sx={{ mr: 1 }}>
							<AddIcon />
						</IconButton>
					)}

					{user && (
						<IconButton
							sx={{ mr: 1 }}
							color="inherit"
							onClick={() => navigate("/notis")}>
							<Badge
								badgeContent={
									notis?.filter(noti => !noti.read).length
								}
								color="error">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					)}

					{mode == "dark" ? (
						<IconButton
							color="inherit"
							onClick={() => setMode("light")}>
							<LightModeIcon />
						</IconButton>
					) : (
						<IconButton
							color="inherit"
							onClick={() => setMode("dark")}>
							<DarkModeIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
