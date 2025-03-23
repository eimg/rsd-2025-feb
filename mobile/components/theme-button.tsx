import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "./theme-provider";

export const ThemeButton = () => {
	const { isDark, toggleTheme } = useTheme();

	return (
		<TouchableOpacity onPress={toggleTheme}>
			{isDark ? (
				<Ionicons name="sunny-outline" size={32} color="white" />
			) : (
				<Ionicons name="moon-outline" size={24} />
			)}
		</TouchableOpacity>
	);
};
