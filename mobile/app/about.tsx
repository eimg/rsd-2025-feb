import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function About() {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<View style={{ gap: 10 }}>
				<Text style={{ fontSize: 24, marginBottom: 20 }}>About</Text>
				<Link
					style={styles.link}
					href="/">
					Home
				</Link>
				<Link
					style={styles.link}
					href="/about">
					About
				</Link>
				<Link
					style={styles.link}
					href="/contact">
					Contact
				</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	link: {
		fontSize: 21,
		color: "blue",
	},
});
