import { View, ScrollView, StyleSheet } from "react-native";
import Text from "@/components/text";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type PostType = {
    id: number;
    content: string;
    created: string;
    user: {
        name: string;
        username: string;
        bio: string;
    }
}

async function fetchPosts(): Promise<PostType[]> {
	const res = await fetch("http://localhost:8080/posts");
	return res.json();
}

export default function Home() {
	const {
		error,
		isLoading,
		data: posts,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});

    const { colors } = useTheme();

	if (isLoading) {
		return (
			<View style={{ alignItems: "center" }}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ alignItems: "center" }}>
				<Text>Error loading posts</Text>
			</View>
		);
	}

    if (!posts) {
		return (
			<View style={{ alignItems: "center" }}>
				<Text>No posts vailable</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			{posts.map(post => {
				return (
					<View style={[styles.card, { borderColor: colors.border }]}>
						<View style={styles.cardBody}>
							<Ionicons
								name="person-circle"
								size={48}
								color={colors.text + "80"}
							/>
							<View style={{ gap: 6 }}>
                                <Text style={styles.time}>{post.created}</Text>
								<Text style={styles.content}>
									{post.content}
								</Text>
							</View>
						</View>
					</View>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderBottomWidth: 1,
    },
    cardBody: {
        flexDirection: "row",
        gap: 14,
    },
    content: {
        fontSize: 18,
    },
    time: {
        color: "green"
    }
});