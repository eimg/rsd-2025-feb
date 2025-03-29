import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { LightTheme, DarkTheme } from "../constants/themes";
import { StatusBar } from "expo-status-bar";

type ThemeContextType = {
	isDark: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isDark, setisDark] = useState(true);

	const toggleTheme = async () => {
		setisDark(!isDark);
	};

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			<NavigationThemeProvider value={isDark ? DarkTheme : LightTheme}>
				{children}
                <StatusBar style={isDark ? "light" : "dark"} />
			</NavigationThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within an ThemeProvider");
	}

	return context;
};
