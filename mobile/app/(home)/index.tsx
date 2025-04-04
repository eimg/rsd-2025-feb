import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Text from "@/components/text";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { config } from "@/libs/config";
import { formatDistanceToNow } from "date-fns";

import type { PostType } from "@/types/PostType";

async function fetchPosts(): Promise<PostType[]> {
	const res = await fetch(`${config.apiUrl}/posts`);
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
					<View
						key={post.id}
						style={[styles.card, { borderColor: colors.border }]}>
						<View style={styles.cardBody}>
							<Ionicons
								name="person-circle"
								size={48}
								color={colors.text + "80"}
							/>
							<View style={styles.cardContent}>
								<TouchableOpacity onPress={() => {
									router.push(`/post/${post.id}`);
								}}>
									<Text style={styles.time}>
										{formatDistanceToNow(new Date(post.created), { addSuffix: true })}
									</Text>
									<Text style={styles.content}>
										{post.content}
									</Text>
								</TouchableOpacity>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
										marginTop: 10,
									}}>
									<View
										style={{
											flexDirection: "row",
											gap: 10,
											alignItems: "center",
										}}>
										<TouchableOpacity>
											<Ionicons
												name="heart-outline"
												size={24}
												color="red"
											/>
										</TouchableOpacity>
										<Text>5</Text>
									</View>
									<View
										style={{
											flexDirection: "row",
											gap: 10,
											alignItems: "center",
										}}>
										<TouchableOpacity>
											<Ionicons
												name="chatbubble-outline"
												size={24}
												color="green"
											/>
										</TouchableOpacity>
										<Text>{post.comments.length}</Text>
									</View>
									<View>
										<TouchableOpacity>
											<Ionicons
												name="share-outline"
												size={24}
												color={colors.text + "80"}
											/>
										</TouchableOpacity>
									</View>
								</View>
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
	cardContent: {
		gap: 6,
		flex: 1,
	},
	content: {
		fontSize: 18,
	},
	time: {
		color: "green",
	},
});
