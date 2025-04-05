import {
	ScrollView,
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from "react-native";
import Text from "@/components/text";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "@/libs/config";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import type { PostType } from "@/types/PostType";

async function fetchPost(id: string): Promise<PostType> {
	const res = await fetch(`${config.apiUrl}/posts/${id}`);
	return res.json();
}

async function createComment(postId: string, content: string, token: string) {
	const res = await fetch(`${config.apiUrl}/comments`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ postId, content }),
	});
	return res.json();
}

async function deleteComment(commentId: string, token: string) {
	const res = await fetch(`${config.apiUrl}/comments/${commentId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.json();
}

export default function Post() {
	const { id } = useLocalSearchParams();
	const { colors } = useTheme();
	const queryClient = useQueryClient();
	const [newComment, setNewComment] = useState("");
	const { user, token } = useAuth();

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => fetchPost(id as string),
	});

	const createCommentMutation = useMutation({
		mutationFn: (content: string) =>
			createComment(id as string, content, token!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["post", id] });
			setNewComment("");
		},
	});

	const deleteCommentMutation = useMutation({
		mutationFn: (commentId: string) => deleteComment(commentId, token!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["post", id] });
		},
	});

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (error) {
		return <Text>Error loading post</Text>;
	}

	if (!post) {
		return <Text>No post found</Text>;
	}

	const handleSubmitComment = () => {
		if (newComment.trim()) {
			createCommentMutation.mutate(newComment.trim());
		}
	};

	return (
		<ScrollView>
			<View style={[styles.card, { borderColor: colors.border }]}>
				<View style={styles.cardBody}>
					<Ionicons
						name="person-circle"
						size={48}
						color={colors.text + "80"}
					/>
					<View style={styles.cardContent}>
						<Text style={styles.time}>
							{formatDistanceToNow(new Date(post.created), {
								addSuffix: true,
							})}
						</Text>
						<Text style={styles.content}>{post.content}</Text>
						<View style={styles.actions}>
							<View style={styles.actionGroup}>
								<TouchableOpacity>
									<Ionicons
										name="heart-outline"
										size={24}
										color="red"
									/>
								</TouchableOpacity>
								<Text>5</Text>
							</View>
							<View style={styles.actionGroup}>
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

			<View style={styles.commentsSection}>
				<Text style={styles.commentsTitle}>Comments</Text>

				{user && (
					<View
						style={[
							styles.newCommentContainer,
							{ borderColor: colors.border },
						]}>
						<TextInput
							style={[
								styles.commentInput,
								{ color: colors.text },
							]}
							placeholder="Write a comment..."
							placeholderTextColor={colors.text + "80"}
							value={newComment}
							onChangeText={setNewComment}
							multiline
						/>
						<TouchableOpacity
							style={[
								styles.submitButton,
								{ backgroundColor: colors.primary },
							]}
							onPress={handleSubmitComment}
							disabled={
								!newComment.trim() ||
								createCommentMutation.isPending
							}>
							<Text style={styles.submitButtonText}>Post</Text>
						</TouchableOpacity>
					</View>
				)}

				{post.comments.map(comment => (
					<View
						key={comment.id}
						style={[
							styles.commentCard,
							{ borderColor: colors.border },
						]}>
						<View style={styles.cardBody}>
							<Ionicons
								name="person-circle"
								size={36}
								color={colors.text + "80"}
							/>
							<View style={styles.cardContent}>
								<View style={styles.commentHeader}>
									<Text style={styles.time}>
										{formatDistanceToNow(
											new Date(comment.created),
											{ addSuffix: true }
										)}
									</Text>
									{user && (
										<TouchableOpacity
											onPress={() =>
												deleteCommentMutation.mutate(
													comment.id.toString()
												)
											}
											disabled={
												deleteCommentMutation.isPending
											}>
											<Ionicons
												name="trash-outline"
												size={20}
												color={colors.text + "80"}
											/>
										</TouchableOpacity>
									)}
								</View>
								<Text style={styles.commentContent}>
									{comment.content}
								</Text>
								<View style={styles.actions}>
									<View style={styles.actionGroup}>
										<TouchableOpacity>
											<Ionicons
												name="heart-outline"
												size={20}
												color="red"
											/>
										</TouchableOpacity>
										<Text>2</Text>
									</View>
									<View>
										<TouchableOpacity>
											<Ionicons
												name="share-outline"
												size={20}
												color={colors.text + "80"}
											/>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</View>
					</View>
				))}
			</View>
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
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	actionGroup: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
	commentsSection: {
		padding: 16,
	},
	commentsTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 16,
	},
	commentCard: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
	},
	commentContent: {
		fontSize: 16,
	},
	newCommentContainer: {
		marginBottom: 20,
		borderWidth: 1,
		borderRadius: 8,
		overflow: "hidden",
	},
	commentInput: {
		padding: 12,
		minHeight: 80,
		fontSize: 16,
	},
	submitButton: {
		padding: 12,
		alignItems: "center",
	},
	submitButtonText: {
		color: "white",
		fontWeight: "bold",
	},
	commentHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
