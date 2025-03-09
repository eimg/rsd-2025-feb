import { useForm } from "react-hook-form";
import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

    const onSubmit = data => {
        const api = "http://localhost:8080/users/register";
        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate("/login");
        });
    }

	return (
		<Box>
			<Typography
				variant="h3"
				sx={{ mb: 3 }}>
				Register
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<OutlinedInput
					{...register("name", { required: true })}
					placeholder="Name"
					fullWidth
					sx={{ mt: 2 }}
				/>
				{errors.name && (
					<Typography color="error">Name is required</Typography>
				)}

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
					{...register("bio")}
					placeholder="Bio"
					multiline
					fullWidth
					sx={{ mt: 2 }}
				/>

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
					Register
				</Button>
			</form>
		</Box>
	);
}
