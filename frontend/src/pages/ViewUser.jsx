import { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, Grid, Button, CircularProgress, Chip, Divider, Stack } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/userApi";
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  ArrowBack as BackIcon,
  Edit as EditIcon,
  FiberManualRecord as StatusIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";
import ImageLightbox from "../components/ImageLightbox";

import StatusBadge from "../components/StatusBadge";

const ViewUser = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Button 
          component={Link} 
          to="/" 
          startIcon={<BackIcon />}
          sx={{ mb: 4, color: "text.secondary" }}
        >
          Back to Dashboard
        </Button>

        <Paper 
          sx={{ 
            borderRadius: "32px", 
            overflow: "hidden",
            background: mode === "dark" ? "rgba(30, 41, 59, 0.7)" : "#ffffff",
            backdropFilter: mode === "dark" ? "blur(20px)" : "none",
            border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Header/Banner Area */}
          <Box sx={{ height: "140px", background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)", position: "relative" }} />
          
          <Box sx={{ p: { xs: 3, md: 6 }, mt: -10 }}>
            <Grid container spacing={4} alignItems="flex-end">
              <Grid item>
                {user?.profileImage && !imgError ? (
                  <div className="view-avatar">
                    <img
                      className="profile-image"
                      src={`http://localhost:5000${user.profileImage}`}
                      alt={`${user?.firstName || ""} ${user?.lastName || ""}`}
                      onError={() => setImgError(true)}
                      onClick={() => setLightboxOpen(true)}
                    />
                  </div>
                ) : (
                  <div className="profile-image-fallback">
                    {(user?.firstName?.[0] || "").toUpperCase()}
                    {(user?.lastName?.[0] || "").toUpperCase()}
                  </div>
                )}
              </Grid>
              <Grid item xs>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: mode === "dark" ? "#FFFFFF" : "#0f172a", mb: 1, fontFamily: "'Times New Roman', serif" }}>
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <StatusBadge status={user?.status} mode={mode} />
                    <Chip 
                      label={user?.gender} 
                      size="small"
                      sx={{ 
                        bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                        color: mode === "dark" ? "#94a3b8" : "#64748b",
                        fontWeight: 600
                      }} 
                    />
                  </Stack>
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/edit/${user?._id}`}
                  startIcon={<EditIcon />}
                  sx={{ borderRadius: "12px", px: 4, mb: 2 }}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ my: 5, borderColor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }} />

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <InfoItem icon={<EmailIcon />} label="Email Address" value={user?.email} mode={mode} />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem icon={<PhoneIcon />} label="Mobile Number" value={user?.mobile} mode={mode} />
              </Grid>
              <Grid item xs={12}>
                <InfoItem icon={<LocationIcon />} label="Location / Address" value={user?.location} mode={mode} />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </motion.div>
      <ImageLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={
          user?.profileImage
            ? [{ src: `http://localhost:5000${user.profileImage}`, alt: `${user?.firstName || ""} ${user?.lastName || ""}` }]
            : []
        }
      />
    </Container>
  );
};

const InfoItem = ({ icon, label, value, mode }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
    <Box 
      sx={{ 
        p: 1.5, 
        borderRadius: "12px", 
        bgcolor: "rgba(139, 92, 246, 0.1)", 
        color: "primary.main" 
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography variant="h6" sx={{ color: mode === "dark" ? "#FFFFFF" : "#0f172a", mt: 0.5, fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

export default ViewUser;
