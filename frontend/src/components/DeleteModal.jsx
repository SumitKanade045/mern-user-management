import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Close as CloseIcon,
  DeleteForever as DeleteIcon,
  WarningAmber as WarningIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const DeleteModal = ({ open, onClose, onConfirm, title = "Delete User", message = "Are you sure you want to delete this user?", mode = "dark" }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={(props) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Box
            {...props}
            sx={{
              borderRadius: "28px",
              bgcolor: mode === "dark" ? "#0f172a" : "#ffffff",
              backgroundImage: "none",
              border: "1px solid",
              borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
              boxShadow: mode === "dark" 
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(239, 68, 68, 0.1)" 
                : "0 20px 40px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              position: "relative",
            }}
          />
        </motion.div>
      )}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: mode === "dark" ? "rgba(2, 6, 23, 0.85)" : "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      {/* Header with Icon */}
      <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: mode === "dark" ? "rgba(239, 68, 68, 0.15)" : "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
            }}
          >
            <WarningIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: mode === "dark" ? "#f1f5f9" : "#1e293b" }}>
            {title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: mode === "dark" ? "#64748b" : "#94a3b8" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, pb: 4 }}>
        <Typography sx={{ color: mode === "dark" ? "#94a3b8" : "#64748b", fontSize: "1rem", lineHeight: 1.6 }}>
          {message}
          <br />
          <Typography component="span" sx={{ fontSize: "0.85rem", color: "#ef4444", fontWeight: 600, mt: 1, display: "block" }}>
            This action cannot be undone.
          </Typography>
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", gap: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            flex: 1,
            py: 1.5,
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 700,
            color: mode === "dark" ? "#94a3b8" : "#64748b",
            "&:hover": { bgcolor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            flex: 1,
            py: 1.5,
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 700,
            bgcolor: "#ef4444",
            boxShadow: "0 8px 20px -6px rgba(239, 68, 68, 0.5)",
            "&:hover": {
              bgcolor: "#dc2626",
              boxShadow: "0 12px 24px -6px rgba(239, 68, 68, 0.6)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease",
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
