import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#8B4513" }, // Nâu đất
    secondary: { main: "#D2B48C" }, // Màu beige nhạt
    background: { default: "#F5F5DC", paper: "#EEE8AA" }, // Màu nền be nhạt
    text: { primary: "#5C4033", secondary: "#8B4513" }, // Chữ nâu sẫm
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8B4513" },
    secondary: { main: "#D2B48C" },
    background: { default: "#3E2723", paper: "#4E342E" }, // Nền nâu đậm
    text: { primary: "#F5F5DC", secondary: "#D2B48C" }, // Chữ màu beige
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});
