import { Outlet } from "react-router";

import { Container } from "@mui/material";

import Header from "./components/Header";
import AppDrawer from "./components/AppDrawer";

export default function Layout() {
    return <>
        <Header />
        <AppDrawer />
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Outlet />
        </Container>
    </>
}
