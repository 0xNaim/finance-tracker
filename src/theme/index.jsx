// src/theme.ts

import { createTheme } from "@mui/material/styles";

const themeOptions = {
	palette: {
		primary: {
			main: "#4845d2",
			light: "#f1f5f9",
		},
		secondary: {
			main: "#dc004e",
			light: "#f1f5f9",
		},
	},
	typography: {
		fontFamily: "Roboto, sans-serif",
	},
};

const theme = createTheme(themeOptions);

export default theme;
