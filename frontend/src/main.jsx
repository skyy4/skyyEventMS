import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import getTheme from "./style/theme.jsx";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SnackbarProvider } from 'notistack';

const theme = getTheme('light');

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
    </SnackbarProvider>
  </ThemeProvider>
);
