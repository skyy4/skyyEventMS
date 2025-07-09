import { createTheme } from '@mui/material/styles';

const customPalette = {
  primary: {
    main: "#ff6f61", // Vibrant coral
    light: "#ffb199",
    dark: "#c43e2f",
    contrastText: "#fff8f0",
  },
  secondary: {
    main: "#6ec6ff", // Bright sky blue
    light: "#a6e3ff",
    dark: "#007bb2",
    contrastText: "#ffffff",
  },
  accent: {
    main: "#ffd166", // Warm yellow
    light: "#fff3b0",
    dark: "#c7a500",
    contrastText: "#3a3a3a",
  },
  background: {
    default: "#f9fafc",
    paper: "#ffffff",
  },
  text: {
    primary: "#22223b",
    secondary: "#4a4e69",
  },
};

const theme = createTheme({
  palette: customPalette,
  typography: {
    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;