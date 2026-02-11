import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#8b5cf6", // Purple
        light: "#a78bfa",
        dark: "#6d28d9",
      },
      secondary: {
        main: "#3b82f6", // Blue
        light: "#60a5fa",
        dark: "#1d4ed8",
      },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f8fafc",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#FFFFFF" : "#0f172a",
        secondary: mode === "dark" ? "#cbd5e1" : "#475569",
      },
    },
    typography: {
      fontFamily: "'Times New Roman', serif",
      h4: {
        fontWeight: 800,
        letterSpacing: "-0.02em",
      },
      h6: {
        fontWeight: 700,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === "dark" ? "#0f172a" : "#f8fafc",
            fontFamily: "'Times New Roman', serif",
            transition: "background-color 0.3s ease",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            padding: "10px 24px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: mode === "dark" 
                ? "0 0 20px rgba(139, 92, 246, 0.4)"
                : "0 4px 15px rgba(139, 92, 246, 0.2)",
            },
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
            color: "#FFFFFF",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: mode === "dark" ? "rgba(30, 41, 59, 0.7)" : "#ffffff",
            backdropFilter: mode === "dark" ? "blur(12px)" : "none",
            border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
            boxShadow: mode === "dark" 
              ? "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
              : "0 4px 20px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              transition: "all 0.3s ease",
              "& fieldset": {
                borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              },
              "&:hover fieldset": {
                borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8b5cf6",
                boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)",
              },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)",
          },
          head: {
            backgroundColor: mode === "dark" ? "rgba(15, 23, 42, 0.9)" : "#f1f5f9",
            color: mode === "dark" ? "#cbd5e1" : "#475569",
            fontWeight: 700,
          },
        },
      },
    },
  });
