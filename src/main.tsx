import ReactDOM from "react-dom/client";

import { ThemeProvider, createTheme } from "@mui/material";

import App from "./App.tsx";
import "./main.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(0, 0, 0, 0.54)",
    },
    secondary: {
      main: "rgba(255, 172, 215, 0.5)",
      contrastText: "rgba(0, 0, 0, 0.54)",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
