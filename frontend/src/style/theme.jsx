import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#ff6f61' : '#6ec6ff',
      light: mode === 'light' ? '#ffb199' : '#a6e3ff',
      dark: mode === 'light' ? '#c43e2f' : '#007bb2',
      contrastText: '#fff8f0',
    },
    secondary: {
      main: mode === 'light' ? '#6ec6ff' : '#ff6f61',
      light: mode === 'light' ? '#a6e3ff' : '#ffb199',
      dark: mode === 'light' ? '#007bb2' : '#c43e2f',
      contrastText: '#ffffff',
    },
    accent: {
      main: '#ffd166',
      light: '#fff3b0',
      dark: '#c7a500',
      contrastText: '#3a3a3a',
    },
    background: {
      default: mode === 'light' ? '#f9fafc' : '#181a20',
      paper: mode === 'light' ? '#ffffff' : '#23263a',
    },
    text: {
      primary: mode === 'light' ? '#22223b' : '#f9fafc',
      secondary: mode === 'light' ? '#4a4e69' : '#bfc6d1',
    },
  },
  typography: {
    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: mode === 'light' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(35, 38, 58, 0.85)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          backdropFilter: 'blur(8px)',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === 'light' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(35, 38, 58, 0.85)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0 0 18px 18px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: mode === 'light' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(35, 38, 58, 0.85)',
          boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.10)',
          backdropFilter: 'blur(6px)',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

const getTheme = (mode = 'light') => createTheme(getDesignTokens(mode));

export default getTheme; 