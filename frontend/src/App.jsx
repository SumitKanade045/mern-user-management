import { useMemo, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { getTheme } from "./theme";
import ListPage from "./pages/ListPage";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ViewUser from "./pages/ViewUser";
import Navbar from "./components/Navbar";
import { AnimatePresence } from "framer-motion";

function AppContent({ mode, toggleColorMode }) {
  const location = useLocation();

  return (
    <Box
      className="animated-bg"
      sx={{
        minHeight: "100vh",
        background: mode === "dark" 
          ? "linear-gradient(-45deg, #0f172a, #1e293b, #334155, #1e1b4b)"
          : "linear-gradient(-45deg, #f8fafc, #f1f5f9, #e2e8f0, #f8fafc)",
        transition: "background 0.3s ease",
      }}
    >
      <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<ListPage mode={mode} />} />
          <Route path="/add" element={<AddUser mode={mode} />} />
          <Route path="/edit/:id" element={<EditUser mode={mode} />} />
          <Route path="/view/:id" element={<ViewUser mode={mode} />} />
        </Routes>
      </AnimatePresence>
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "dark";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent mode={mode} toggleColorMode={toggleColorMode} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
