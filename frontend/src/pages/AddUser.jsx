import { Container, Typography, Box } from "@mui/material";
import UserForm from "../components/UserForm";
import API from "../api/userApi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddUser = ({ mode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddUser = async (data) => {
    try {
      await API.post("/", data);
      toast.success("Member added successfully!");
      navigate(`/${location.search || ""}`, { replace: true });
    } catch (error) {
      // Error handled by interceptor
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: "calc(100vh - 80px)", // Adjusted for Navbar height
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        py: 8,
        px: 2,
        background: mode === "dark" 
          ? "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)" 
          : "transparent"
      }}
    >
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography 
          variant="h3" 
          gutterBottom
          sx={{
            fontWeight: 900,
            letterSpacing: "-1px",
            background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Add New Member
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
            fontWeight: 500
          }}
        >
          Create a premium profile for your new team member.
        </Typography>
      </Box>
      <UserForm onSubmit={handleAddUser} mode={mode} />
    </Box>
  );
};

export default AddUser;
