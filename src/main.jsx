import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@mui/material/styles";
import App from './App.jsx'
import './index.css'
import theme from './theme/index.jsx';
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
  </React.StrictMode>,
)
