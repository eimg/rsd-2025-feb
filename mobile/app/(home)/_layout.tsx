import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
	return (
		<Tabs screenOptions={{ tabBarShowLabel: false }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
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
