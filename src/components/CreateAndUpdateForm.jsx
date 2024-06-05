import { CloseOutlined } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const CreateAndUpdateForm = ({ open, onClose, mode, initialData, action }) => {
	// Initialize form handling with react-hook-form
	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		formState: { errors },
	} = useForm({ defaultValues: { name: "", type: "", amount: "" } });

	// Populate form fields in edit mode
	useEffect(() => {
		if (mode === "edit" && initialData) {
			setValue("name", initialData.name);
			setValue("type", initialData.type);
			setValue("amount", String(initialData.amount));
		} else {
			reset();
		}
	}, [mode, initialData, reset]);

	// Handle form submit
	const handleFormSubmit = (formData) =>
		action(initialData?.id, formData, reset);

	return (
		<Dialog
			open={open}
			onClose={() => {
				onClose();
				setValue("name", "");
				setValue("type", "");
				setValue("amount", "");
			}}
			component={"form"}
			onSubmit={handleSubmit(handleFormSubmit)}
			fullWidth
		>
			<DialogTitle>
				<Stack
					direction={"row"}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<Typography variant="h6">
						{mode === "create" ? "Create" : "Edit"} Transaction
					</Typography>
					<IconButton onClick={onClose} size="small">
						<CloseOutlined />
					</IconButton>
				</Stack>
			</DialogTitle>

			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<FormControl fullWidth sx={{ pt: 1 }}>
							<TextField
								label="Name*"
								{...register("name", { required: "Name is required" })}
								error={Boolean(errors.name && errors.name.message)}
								size="small"
							/>
							{errors?.name && (
								<FormHelperText error>Name is required</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<FormControl fullWidth>
							<Controller
								name="type"
								control={control}
								rules={{ required: "Type is required" }}
								render={({ field }) => (
									<FormControl
										fullWidth
										size="small"
										error={Boolean(errors.type && errors.type.message)}
									>
										<InputLabel id="type-label">Select Type</InputLabel>
										<Select {...field} labelId="type-label" label="Select Type">
											{["Income", "Expense"].map((type) => (
												<MenuItem key={type} value={type?.toLowerCase()}>
													{type}
												</MenuItem>
											))}
										</Select>
										{errors?.type && (
											<FormHelperText error>Type is required</FormHelperText>
										)}
									</FormControl>
								)}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								type="number"
								label="Amount*"
								{...register("amount", { required: "Amount is required" })}
								error={Boolean(errors.amount && errors.amount.message)}
								size="small"
							/>
							{errors?.amount && (
								<FormHelperText error>Amount is required</FormHelperText>
							)}
						</FormControl>
					</Grid>
				</Grid>
			</DialogContent>

			<DialogActions sx={{ pr: 3, pb: 3 }}>
				<Button onClick={onClose} variant="outlined" color="primary">
					Cancel
				</Button>
				<Button type="submit" variant="contained">
					{mode === "create" ? "Create" : "Edit"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreateAndUpdateForm;
