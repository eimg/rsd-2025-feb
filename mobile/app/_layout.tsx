import { Stack } from "expo-router";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/components/auth-provider";

const queryClient = new QueryClient();

export default function Layout() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<Stack>
						<Stack.Screen
							name="(home)"
							options={{ headerShown: false, title: "Home" }}
						/>
						<Stack.Screen
							name="about"
							options={{ title: "About", headerShown: true }}
						/>
						<Stack.Screen
							name="contact"
							options={{ title: "Contact", headerShown: true }}
						/>
						<Stack.Screen
							name="add"
							options={{
								title: "Add Post",
								presentation: "modal",
							}}
						/>
						<Stack.Screen
							name="post/[id]"
							options={{
								title: "Post Details",
							}}
						/>
					</Stack>
				</QueryClientProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}
