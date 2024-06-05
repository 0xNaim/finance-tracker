import { ModeEditOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { numberFormatter } from "../utils/number-formatter";

const TransactionItem = ({
	transaction,
	deleteTransaction,
	handleOpenEdit,
}) => {
	// Handle delete transaction
	const handleDelete = () => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this transaction?"
		);
		if (confirmDelete) {
			deleteTransaction(transaction.id);
		}
	};

	return (
		<Stack
			direction={"row"}
			alignItems={"center"}
			justifyContent={"space-between"}
			my={1.5}
		>
			<Box>
				<Typography variant="body1">{transaction.name}</Typography>

				<Stack direction={"row"} alignItems={"center"} gap={1}>
					<Stack direction={"row"} alignItems={"center"} gap={0.5}>
						<Box
							sx={{
								width: 8,
								height: 8,
								backgroundColor:
									transaction.type === "expense" ? "#d32f2f" : "#39e56e",
							}}
						/>

						<Typography sx={{ fontSize: 12 }}>{transaction.type}</Typography>
					</Stack>

					<Typography sx={{ fontSize: 10 }}>
						BDT {numberFormatter.format(Number(transaction.amount))}
					</Typography>
				</Stack>
			</Box>

			<Stack direction={"row"} alignItems={"center"} gap={1}>
				<Button
					onClick={() => handleOpenEdit(transaction.id)}
					variant="contained"
					startIcon={<ModeEditOutlineOutlined sx={{ mt: -0.3 }} />}
					size="small"
				>
					Edit
				</Button>
				<Button
					onClick={handleDelete}
					variant="contained"
					color="error"
					size="small"
				>
					Delete
				</Button>
			</Stack>
		</Stack>
	);
};

export default TransactionItem;
