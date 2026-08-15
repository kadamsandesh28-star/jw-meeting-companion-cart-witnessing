import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1976d2",
    },

    secondary: {
      main: "#2e7d32",
    },

    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },

    text: {
      primary: "#1c1c1c",
      secondary: "#555555",
    },
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },
  },
});

export default theme;