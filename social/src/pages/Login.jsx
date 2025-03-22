import { useForm } from "react-hook-form";
import { Box, Button, OutlinedInput, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useApp } from "../AppProvider";

export default function Login() {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");

	const { setUser } = useApp();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		const api = "http://localhost:8080/users/login";
		fetch(api, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then(response =>
				response
					.json()
					.then(data => ({ status: response.status, body: data }))
			)
			.then(({ status, body }) => {
				if (status === 200) {
					setUser(body.user);
                    localStorage.setItem("token", body.token);
					navigate("/");
				} else {
					setErrorMessage(body.message || "An error occurred");
				}
			});
	};

	return (
		<Box>
			<Typography
				variant="h3"
				sx={{ mb: 3 }}>
				Login
			</Typography>
			{errorMessage && (
				<Alert
					severity="error"
					sx={{ mb: 2 }}>
					{errorMessage}
				</Alert>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<OutlinedInput
					{...register("username", { required: true })}
					placeholder="Username"
					fullWidth
					sx={{ mt: 2 }}
				/>
				{errors.username && (
					<Typography color="error">Username is required</Typography>
				)}

				<OutlinedInput
					{...register("password", { required: true })}
					type="password"
					placeholder="Password"
					fullWidth
					sx={{ mt: 2 }}
				/>
				{errors.password && (
					<Typography color="error">Password is required</Typography>
				)}

				<Button
					sx={{ mt: 2 }}
					type="submit"
					variant="contained"
					fullWidth>
					Login
				</Button>
			</form>
		</Box>
	);
}
