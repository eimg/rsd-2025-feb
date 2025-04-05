import {
	ScrollView,
	View,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import Text from "@/components/text";
import { useTheme } from "@react-navigation/native";
import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/components/auth-provider";

// api = http://192.168.100.169:8080/
// login route -> /users/login
// register route -> /users/register

const API_URL = "http://192.168.100.169:8080";

type LoginFormData = {
	username: string;
	password: string;
};

type RegisterFormData = {
	name: string;
	username: string;
	bio: string;
	password: string;
};

type LoginResponse = {
	token: string;
	user: {
		id: string;
		name: string;
		username: string;
		bio: string;
	};
};

export default function Profile() {
	const { colors } = useTheme();
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { user, login, logout, isLoading: authLoading } = useAuth();

	// Create refs for register form fields
	const nameInputRef = useRef<TextInput>(null);
	const usernameInputRef = useRef<TextInput>(null);
	const bioInputRef = useRef<TextInput>(null);
	const passwordInputRef = useRef<TextInput>(null);

	// Form values for register
	const [registerValues, setRegisterValues] = useState({
		name: "",
		username: "",
		bio: "",
		password: "",
	});

	// Login form
	const {
		control: loginControl,
		handleSubmit: handleLoginSubmit,
		formState: { errors: loginErrors },
	} = useForm<LoginFormData>({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	// Login mutation
	const loginMutation = useMutation({
		mutationFn: async (data: LoginFormData) => {
			const response = await fetch(`${API_URL}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: data.username,
					password: data.password,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Login failed");
			}

			return response.json() as Promise<LoginResponse>;
		},
		onSuccess: data => {
			// Use the auth context to store token and user data
			login(data.token, data.user);
		},
		onError: (error: Error) => {
			setError(error.message);
		},
	});

	// Register mutation
	const registerMutation = useMutation({
		mutationFn: async (data: RegisterFormData) => {
			const response = await fetch(`${API_URL}/users/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: data.name,
					username: data.username,
					bio: data.bio || "",
					password: data.password,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Registration failed");
			}

			return response.json();
		},
		onSuccess: userData => {
			// After successful registration, switch to login mode
			setIsLoginMode(true);
			setError(null);
			// Clear register form
			setRegisterValues({
				name: "",
				username: "",
				bio: "",
				password: "",
			});
		},
		onError: (error: Error) => {
			setError(error.message);
		},
	});

	// Submit handlers
	const onSubmitLogin = (data: LoginFormData) => {
		setError(null);
		loginMutation.mutate(data);
	};

	const onSubmitRegister = () => {
		setError(null);

		// Validation
		if (!registerValues.name) {
			setError("Name is required");
			return;
		}

		if (registerValues.name.length < 2) {
			setError("Name must be at least 2 characters");
			return;
		}

		if (!registerValues.username) {
			setError("Username is required");
			return;
		}

		if (!/^[a-zA-Z0-9]+$/.test(registerValues.username)) {
			setError("Username must be alphanumeric");
			return;
		}

		if (!registerValues.password) {
			setError("Password is required");
			return;
		}

		if (registerValues.password.length < 8) {
			setError("Password must be at least 8 characters");
			return;
		}

		registerMutation.mutate(registerValues);
	};

	// Mode switch handler
	const handleModeSwitch = () => {
		setIsLoginMode(!isLoginMode);
		setError(null);
	};

	// Handle register form input changes
	const handleRegisterChange = (
		field: keyof RegisterFormData,
		value: string
	) => {
		setRegisterValues(prev => ({
			...prev,
			[field]: value,
		}));
	};

	const handleLogout = () => {
		logout();
	};

	// Show loading state while checking authentication
	if (authLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<ActivityIndicator
					size="large"
					color={colors.primary}
				/>
			</View>
		);
	}

	// If user is authenticated, show profile screen
	if (user) {
		return (
			<ScrollView style={{ padding: 20 }}>
				<View style={{ alignItems: "center", marginBottom: 30 }}>
					<View
						style={{
							width: 100,
							height: 100,
							borderRadius: 50,
							backgroundColor: colors.card,
							justifyContent: "center",
							alignItems: "center",
							marginBottom: 15,
						}}>
						<Text style={{ fontSize: 36 }}>
							{user.name.charAt(0)}
						</Text>
					</View>
					<Text style={{ fontSize: 24, fontWeight: "bold" }}>
						{user.name}
					</Text>
					<Text
						style={{
							fontSize: 16,
							color: colors.text + "80",
							marginTop: 4,
						}}>
						@{user.username}
					</Text>
				</View>

				<View
					style={{
						backgroundColor: colors.card,
						borderRadius: 10,
						padding: 15,
						marginBottom: 20,
					}}>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							marginBottom: 10,
						}}>
						Bio
					</Text>
					<Text style={{ fontSize: 16, lineHeight: 22 }}>
						{user.bio || "No bio provided"}
					</Text>
				</View>

				<TouchableOpacity
					onPress={handleLogout}
					style={{
						paddingVertical: 15,
						borderRadius: 20,
						backgroundColor: "#f44336",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Text style={{ fontSize: 18, color: "#fff" }}>Logout</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}

	// If user is not authenticated, show login/register form
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				style={{ padding: 20 }}>
				<View style={{ gap: 10, marginBottom: 20 }}>
					<Text style={{ fontSize: 24, textAlign: "center" }}>
						{isLoginMode ? "Login" : "Register"}
					</Text>
					<TouchableOpacity
						onPress={handleModeSwitch}
						style={{
							paddingVertical: 10,
							borderRadius: 20,
							backgroundColor: colors.card,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Text style={{ fontSize: 16 }}>
							{isLoginMode
								? "Need an account? Register"
								: "Already have an account? Login"}
						</Text>
					</TouchableOpacity>
				</View>

				{error && (
					<View
						style={{
							marginBottom: 15,
							padding: 10,
							backgroundColor: "#ffebee",
							borderRadius: 10,
						}}>
						<Text style={{ color: "#c62828", fontSize: 14 }}>
							{error}
						</Text>
					</View>
				)}

				{isLoginMode ? (
					// LOGIN FORM
					<View style={{ gap: 15 }}>
						<Controller
							control={loginControl}
							name="username"
							rules={{
								required: "Username is required",
								pattern: {
									value: /^[a-zA-Z0-9]+$/,
									message: "Username must be alphanumeric",
								},
							}}
							render={({ field }) => (
								<TextInput
									autoCapitalize="none"
									placeholder="Username"
									placeholderTextColor={colors.text + "80"}
									value={field.value}
									onChangeText={field.onChange}
									style={{
										color: colors.text,
										padding: 15,
										fontSize: 16,
										borderWidth: 1,
										borderColor: colors.border,
										borderRadius: 10,
									}}
								/>
							)}
						/>
						{loginErrors.username && (
							<Text style={{ color: "red", fontSize: 14 }}>
								{loginErrors.username.message}
							</Text>
						)}

						<Controller
							control={loginControl}
							name="password"
							rules={{
								required: "Password is required",
								minLength: {
									value: 8,
									message:
										"Password must be at least 8 characters",
								},
							}}
							render={({ field }) => (
								<TextInput
									placeholder="Password"
									placeholderTextColor={colors.text + "80"}
									value={field.value}
									onChangeText={field.onChange}
									secureTextEntry
									style={{
										color: colors.text,
										padding: 15,
										fontSize: 16,
										borderWidth: 1,
										borderColor: colors.border,
										borderRadius: 10,
									}}
								/>
							)}
						/>
						{loginErrors.password && (
							<Text style={{ color: "red", fontSize: 14 }}>
								{loginErrors.password.message}
							</Text>
						)}

						<TouchableOpacity
							onPress={handleLoginSubmit(onSubmitLogin)}
							disabled={loginMutation.isPending}
							style={{
								paddingVertical: 15,
								borderRadius: 20,
								backgroundColor: colors.primary,
								alignItems: "center",
								justifyContent: "center",
								marginTop: 10,
								opacity: loginMutation.isPending ? 0.7 : 1,
							}}>
							{loginMutation.isPending ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text style={{ fontSize: 18, color: "#fff" }}>
									Login
								</Text>
							)}
						</TouchableOpacity>
					</View>
				) : (
					// REGISTER FORM - Using direct state management instead of react-hook-form for the register form
					<View style={{ gap: 15 }}>
						<TextInput
							ref={nameInputRef}
							placeholder="Full Name"
							placeholderTextColor={colors.text + "80"}
							value={registerValues.name}
							onChangeText={text =>
								handleRegisterChange("name", text)
							}
							style={{
								color: colors.text,
								padding: 15,
								fontSize: 16,
								borderWidth: 1,
								borderColor: colors.border,
								borderRadius: 10,
							}}
						/>

						<TextInput
							ref={usernameInputRef}
							placeholder="Username"
							placeholderTextColor={colors.text + "80"}
							value={registerValues.username}
							onChangeText={text =>
								handleRegisterChange("username", text)
							}
							style={{
								color: colors.text,
								padding: 15,
								fontSize: 16,
								borderWidth: 1,
								borderColor: colors.border,
								borderRadius: 10,
							}}
						/>

						<TextInput
							ref={bioInputRef}
							placeholder="Bio (Optional)"
							placeholderTextColor={colors.text + "80"}
							value={registerValues.bio}
							onChangeText={text =>
								handleRegisterChange("bio", text)
							}
							multiline
							numberOfLines={3}
							style={{
								color: colors.text,
								padding: 15,
								fontSize: 16,
								borderWidth: 1,
								borderColor: colors.border,
								borderRadius: 10,
								height: 100,
								textAlignVertical: "top",
							}}
						/>

						<TextInput
							ref={passwordInputRef}
							placeholder="Password"
							placeholderTextColor={colors.text + "80"}
							value={registerValues.password}
							onChangeText={text =>
								handleRegisterChange("password", text)
							}
							secureTextEntry
							style={{
								color: colors.text,
								padding: 15,
								fontSize: 16,
								borderWidth: 1,
								borderColor: colors.border,
								borderRadius: 10,
							}}
						/>

						<TouchableOpacity
							onPress={onSubmitRegister}
							disabled={registerMutation.isPending}
							style={{
								paddingVertical: 15,
								borderRadius: 20,
								backgroundColor: colors.primary,
								alignItems: "center",
								justifyContent: "center",
								marginTop: 10,
								opacity: registerMutation.isPending ? 0.7 : 1,
							}}>
							{registerMutation.isPending ? (
								<ActivityIndicator color="#fff" />
							) : (
								<Text style={{ fontSize: 18, color: "#fff" }}>
									Register
								</Text>
							)}
						</TouchableOpacity>
					</View>
				)}
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
