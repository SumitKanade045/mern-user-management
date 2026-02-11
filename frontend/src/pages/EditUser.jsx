import { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import UserForm from "../components/UserForm";
import API from "../api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/${id}`);
        setUser(response.data);
      } catch (error) {
        // Error handled by interceptor or 404
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleUpdateUser = async (data) => {
    try {
      await API.put(`/${id}`, data);
      toast.success("Member updated successfully!");
      navigate("/");
    } catch (error) {
      // Error handled by interceptor
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: "calc(100vh - 80px)", 
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
          Update Member
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
            fontWeight: 500
          }}
        >
          Modify profile details for {user?.firstName} {user?.lastName}.
        </Typography>
      </Box>
      <UserForm onSubmit={handleUpdateUser} defaultValues={user} mode={mode} />
    </Box>
  );
};

export default EditUser;
