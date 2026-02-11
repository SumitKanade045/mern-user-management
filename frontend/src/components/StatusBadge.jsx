import React from "react";
import { Box, Typography } from "@mui/material";
import { FiberManualRecord as StatusIcon } from "@mui/icons-material";

const StatusBadge = ({ status, mode }) => {
  const isActive = status === "Active";
  
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 2,
        py: 0.8,
        borderRadius: "12px",
        bgcolor: isActive 
          ? (mode === "dark" ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)") 
          : (mode === "dark" ? "rgba(239, 68, 68, 0.15)" : "rgba(239, 68, 68, 0.1)"),
        color: isActive ? "#10b981" : "#ef4444",
        border: "1px solid",
        borderColor: isActive 
          ? (mode === "dark" ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.2)")
          : (mode === "dark" ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.2)"),
      }}
    >
      <StatusIcon sx={{ fontSize: "8px !important", mr: 1 }} />
      <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.5px" }}>
        {status}
      </Typography>
    </Box>
  );
};

export default StatusBadge;
