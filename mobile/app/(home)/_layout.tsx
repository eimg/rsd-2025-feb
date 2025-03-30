import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/components/auth-provider";

export default function Layout() {
    const { colors } = useTheme();

    const { token, user } = useAuth();

	return (
		<Tabs screenOptions={{ tabBarShowLabel: false }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerRight: () => {
                        return (
							user &&
							token && (
								<TouchableOpacity
									onPress={() => router.push("/add")}>
									<Ionicons
										size={24}
										name="add-outline"
										color={colors.text}
										style={{ marginRight: 10 }}
									/>
								</TouchableOpacity>
							)
						);
                    },
					tabBarIcon: ({ color }) => (
						<Ionicons
							size={24}
							name="home-outline"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ color }) => (
						<Ionicons
							size={24}
							name="search-outline"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<Ionicons
							size={24}
							name="person-circle-outline"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => (
						<Ionicons
							size={24}
							name="settings-outline"
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
