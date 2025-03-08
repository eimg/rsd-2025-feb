import AppRouter from "./AppRouter";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState } from "react";

import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";

const AppContext = createContext();

const queryClient = new QueryClient();

export const useApp = () => {
    return useContext(AppContext);
}

export default function AppProvider() {
    const [mode, setMode] = useState("dark");
    const [openDrawer, setOpenDrawer] = useState(false);

    const theme = useMemo(() => {
        return createTheme({
			palette: {
				mode,
			},
		});
    }, [mode]);

	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<AppContext.Provider
					value={{ mode, setMode, openDrawer, setOpenDrawer }}>
					<CssBaseline />
					<AppRouter />
				</AppContext.Provider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
