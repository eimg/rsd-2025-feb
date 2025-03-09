import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
	ArrowBack as BackIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";

import { useLocation } from "react-router";

export default function Header() {
	const { mode, setMode, setOpenDrawer } = useApp();
	const location = useLocation();

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
