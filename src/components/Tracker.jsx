import { AddOutlined, Search } from "@mui/icons-material";
import {
	Box,
	Button,
	Container,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { numberFormatter } from "../utils/number-formatter";
import CreateAndUpdateForm from "./CreateAndUpdateForm";
import Transactions from "./Transactions";

const Tracker = () => {
	const [mode, setMode] = useState("create");
	const [openDialog, setOpenDialog] = useState(false);

	const [initialData, setInitialData] = useState();

	// Use local storage hook
	const [transactions, setTransactions] = useLocalStorage("transactions", []);

	console.log("InitialData: ", initialData);

	// Handle form submit
	const handleCreate = (_, data, reset) => {
		setTransactions((prevTransaction) => [
			...prevTransaction,
			{ id: uuidV4(), ...data },
		]);
		setOpenDialog(false);
		reset();
	};

	// Open edit app drawer with initial data
	const handleOpenEdit = (id) => {
		const dataToEdit = transactions?.find(
			(transaction) => transaction.id === id
		);

		setMode("edit");
		setInitialData(dataToEdit);
		setOpenDialog(true);
	};

	// Handle update transaction
	const handleUpdate = (id, data, reset) => {
		setTransactions((prevTransaction) => {
			return prevTransaction.map((transaction) => {
				if (transaction.id === id) {
					return { ...transaction, ...data };
				} else {
					return transaction;
				}
			});
		});
		reset();
		setOpenDialog(false);
	};

	// Delete transaction
	const deleteTransaction = (id) => {
		setTransactions((prevTransaction) => {
			return prevTransaction.filter((transaction) => transaction.id !== id);
		});
	};

	// Calculate total income
	const calculatesTotalIncome = (transactions) => {
		let income = 0;

		transactions.forEach((transaction) => {
			if (transaction.type === "income") {
				income += Number(transaction.amount);
			}
		});

		return income;
	};

	// Calculate total expense
	const calculatesTotalExpense = (transactions) => {
		let expense = 0;

		transactions.forEach((transaction) => {
			if (transaction.type === "expense") {
				expense += Number(transaction.amount);
			}
		});

		return expense;
	};

	return (
		<Container maxWidth="md">
			<Box component={"section"} sx={{ p: { xs: 4, md: 6 } }}>
				<Stack
					direction={"row"}
					justifyContent={"space-between"}
					sx={{ backgroundColor: "primary.main", color: "white", p: 2, mb: 4 }}
				>
					<Box>
						<Typography variant="body2">Total Income</Typography>
						<Typography variant="h6" fontWeight={600}>
							BDT {numberFormatter.format(calculatesTotalIncome(transactions))}
						</Typography>
					</Box>
					<Box>
						<Typography variant="body2">Total Expense</Typography>
						<Typography variant="h6" fontWeight={600}>
							BDT {numberFormatter.format(calculatesTotalExpense(transactions))}
						</Typography>
					</Box>
				</Stack>
				<Stack
					direction={"row"}
					alignItems={"center"}
					justifyContent={"space-between"}
					sx={{ backgroundColor: "primary.light", p: 2 }}
				>
					<TextField
						sx={{ width: { xs: 180, md: "auto" } }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search fontSize="small" />
								</InputAdornment>
							),
						}}
						type="search"
						// onChange={handleSearch}
						placeholder="Search Transaction"
						size="small"
					/>

					<Button
						onClick={() => {
							setOpenDialog(true);
							setMode("create");
						}}
						variant="contained"
						startIcon={<AddOutlined />}
					>
						Add
					</Button>
				</Stack>
				<Transactions
					transactions={transactions}
					deleteTransaction={deleteTransaction}
					handleOpenEdit={handleOpenEdit}
					initialData={initialData}
				/>
			</Box>

			{/* Form modal */}
			<CreateAndUpdateForm
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				mode={mode}
				action={mode === "create" ? handleCreate : handleUpdate}
				initialData={initialData}
			/>
		</Container>
	);
};

export default Tracker;
