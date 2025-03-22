import AppRouter from "./AppRouter";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppContext = createContext();

const queryClient = new QueryClient();

export const useApp = () => {
	return useContext(AppContext);
};

export default function AppProvider() {
	const [mode, setMode] = useState("dark");
	const [openDrawer, setOpenDrawer] = useState(false);
	const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            fetch("http://localhost:8080/users/verify", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response =>
                    response
                        .json()
                        .then(data => ({ status: response.status, body: data }))
                )
                .then(({ status, body }) => {
                    if(status === 200) {
                        setUser(body);
                    } else {
                        localStorage.removeItem("token");
                    }
                });
        }
    }, []);

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
					value={{
						mode,
						setMode,
						openDrawer,
						setOpenDrawer,
						user,
						setUser,
					}}>
					<CssBaseline />
					<AppRouter />
				</AppContext.Provider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
