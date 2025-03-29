import { View, TextInput, TouchableOpacity } from "react-native";
import Text from "@/components/text";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

import { useForm, Controller } from "react-hook-form";

export default function Add() {
	const { colors } = useTheme();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<{ content: string }>({
		defaultValues: {
			content: "",
		},
	});

	const onSubmit = (data: { content: string }) => console.log(data);

	return (
		<View
			style={{
				flex: 1,
				padding: 20,
			}}>
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange } }) => (
					<TextInput
						multiline
						onChangeText={onChange}
						style={{
							color: colors.text,
							height: 100,
							padding: 10,
							fontSize: 18,
							borderWidth: 1,
							borderColor: colors.border,
							width: "100%",
						}}
					/>
				)}
				name="content"
			/>
			{errors.content && (
				<View style={{ marginTop: 10 }}>
					<Text style={{ color: "red", fontSize: 18 }}>
						This is required.
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
					<Text style={{ fontSize: 21 }}>Close</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handleSubmit(onSubmit)}
					style={{
						paddingVertical: 14,
						flex: 1,
						borderRadius: 20,
						backgroundColor: colors.primary,
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Text style={{ fontSize: 21 }}>Submit</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
