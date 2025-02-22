import { Box, Drawer, } from "@mui/material";
import { useApp } from "../AppProvider";

export default function AppDrawer() {
	const { openDrawer, setOpenDrawer } = useApp();
	const toggleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};
	return (
		<Drawer
			anchor="left"
			open={openDrawer}
			onClose={toggleDrawer}>
			<Box sx={{ width: 300, }} onClick={toggleDrawer}>

            </Box>
		</Drawer>
	);
}
