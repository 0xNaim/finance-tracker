/* eslint-disable react/prop-types */
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import TransactionItem from "./TransactionItem";

const Transactions = ({
	transactions,
	deleteTransaction,
	handleOpenEdit,
	initialData,
}) => {
	return (
		<Box mt={4}>
			{transactions?.length === 0 && (
				<Typography>There are no transactions</Typography>
			)}

			{/* All transactions */}
			<Box sx={{ backgroundColor: "primary.light", p: 2 }}>
				<Stack>
					<Typography variant="h6">All Transactions</Typography>
				</Stack>
				<Divider sx={{ my: 1 }} />

				<Box>
					{transactions.map((transaction) => (
						<>
							<TransactionItem
								key={transaction.id}
								transaction={transaction}
								deleteTransaction={deleteTransaction}
								handleOpenEdit={handleOpenEdit}
							/>
							<Divider />
						</>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default Transactions;
