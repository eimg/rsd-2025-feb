import { View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import Text from "@/components/text";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/components/auth-provider";

const API_URL = "http://192.168.100.169:8080";

type PostFormData = {
	content: string;
};

export default function Add() {
	const { colors } = useTheme();
	const { token, user } = useAuth();
	const [error, setError] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<PostFormData>({
		defaultValues: {
			content: "",
		},
	});

	// Create post mutation
	const createPostMutation = useMutation({
		mutationFn: async (data: PostFormData) => {
			if (!token) {
				throw new Error("You must be logged in to create a post");
			}

			const response = await fetch(`${API_URL}/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
					content: data.content,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to create post");
			}

			return response.json();
		},
		onSuccess: () => {
			// Clear form and navigate back to home screen
			reset();
			router.replace("/");
		},
		onError: (error: Error) => {
			setError(error.message);
		},
	});

	const onSubmit = (data: PostFormData) => {
		setError(null);
		createPostMutation.mutate(data);
	};

	// Check if user is not logged in
	if (!user) {
		return (
			<View style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ fontSize: 18, textAlign: "center", marginBottom: 20 }}>
					You need to be logged in to create a post
				</Text>
				<TouchableOpacity
					onPress={() => router.replace("/(home)/profile")}
					style={{
						paddingVertical: 14,
						paddingHorizontal: 30,
						borderRadius: 20,
						backgroundColor: colors.primary,
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Text style={{ fontSize: 18, color: "#fff" }}>Go to Login</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				padding: 20,
			}}>
			{error && (
				<View
					style={{
						marginBottom: 15,
						padding: 10,
						backgroundColor: "#ffebee",
						borderRadius: 10,
					}}>
					<Text style={{ color: "#c62828", fontSize: 14 }}>{error}</Text>
				</View>
			)}

			<Controller
				control={control}
				rules={{
					required: "Content is required",
					minLength: {
						value: 3,
						message: "Post content must be at least 3 characters",
					},
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						multiline
						placeholder="What's on your mind?"
						placeholderTextColor={colors.text + "80"}
						value={value}
						onChangeText={onChange}
						style={{
							color: colors.text,
							height: 150,
							padding: 15,
							fontSize: 18,
							borderWidth: 1,
							borderColor: colors.border,
							width: "100%",
							borderRadius: 10,
							textAlignVertical: "top",
						}}
					/>
				)}
				name="content"
			/>
			{errors.content && (
				<View style={{ marginTop: 10 }}>
					<Text style={{ color: "red", fontSize: 14 }}>
						{errors.content.message}
					</Text>
				</View>
			)}

			<View style={{ marginTop: 20, flexDirection: "row", gap: 10 }}>
				<TouchableOpacity
					onPress={() => router.back()}
					style={{
						paddingVertical: 14,
						flex: 1,
						borderRadius: 20,
						backgroundColor: colors.card,
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Text style={{ fontSize: 18 }}>Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handleSubmit(onSubmit)}
					disabled={createPostMutation.isPending}
					style={{
						paddingVertical: 14,
						flex: 1,
						borderRadius: 20,
						backgroundColor: colors.primary,
						alignItems: "center",
						justifyContent: "center",
						opacity: createPostMutation.isPending ? 0.7 : 1,
					}}>
					{createPostMutation.isPending ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={{ fontSize: 18, color: "#fff" }}>Post</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
}
