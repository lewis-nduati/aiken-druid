import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4caf50',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#45a049',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f7f9',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h6: {
      fontWeight: 'bold',
    },
    button: {
      textTransform: 'none', // Prevent ALL CAPS on buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '0.6rem 1.2rem',
          transition: 'background-color 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#45a049',
          },
          '&:focus': {
            outline: '2px solid #007acc',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#f5f7f9',
          color: '#333',
        },
      },
    },
  },
});

export default theme;
