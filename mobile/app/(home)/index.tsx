import { View, StyleSheet } from "react-native";
import Text from "@/components/text";

export default function Home() {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<View style={{ gap: 10 }}>
				<Text style={{ fontSize: 24, marginBottom: 20 }}>Home</Text>
			</View>
		</View>
	);
}
