import { Box, Typography } from "@mui/material";
import Tracker from "./components/Tracker";

const App = () => {
	return (
		<Box>
			<Box
				sx={{
					backgroundColor: "primary.main",
					color: "white",
					p: 2,
					textAlign: "center",
				}}
			>
				<Typography variant="h5" fontWeight={600}>
					Finance Tracker
				</Typography>
			</Box>

			{/* Tracker */}
			<Tracker />
		</Box>
	);
};

export default App;
