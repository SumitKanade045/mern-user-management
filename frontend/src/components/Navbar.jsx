import { AppBar, Toolbar, Typography, Container, Button, Box, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { 
  PersonAdd as AddIcon, 
  Home as HomeIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Navbar = ({ mode, toggleColorMode }) => {
  const location = useLocation();
  const isAddPage = location.pathname === "/add";

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: mode === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        color: mode === "dark" ? "#f1f5f9" : "#0f172a",
        boxShadow: "none",
        borderBottom: mode === "dark" ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 70 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "primary.main",
              fontWeight: 800,
              fontSize: "1.5rem",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            <Box
              component={motion.span}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              sx={{ mr: 1 }}
            >
              🚀
            </Box>
            USERCORE
          </Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton 
              onClick={toggleColorMode} 
              color="inherit"
              component={motion.button}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              sx={{ 
                bgcolor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                "&:hover": { bgcolor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }
              }}
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {isAddPage ? (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                sx={{ 
                  borderRadius: "12px",
                  px: 3,
                  boxShadow: "0 4px 14px 0 rgba(139, 92, 246, 0.39)",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                }}
              >
                Home
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add"
                startIcon={<AddIcon />}
                sx={{ 
                  borderRadius: "12px",
                  px: 3,
                  boxShadow: "0 4px 14px 0 rgba(139, 92, 246, 0.39)",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                }}
              >
                Add Member
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
