import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StatusBadge from "./StatusBadge";

const UserTable = ({ users, onDelete, isDeletingId, mode }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "24px",
        overflow: "hidden",
        background: mode === "dark" ? "rgba(30, 41, 59, 0.6)" : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        border: "1px solid",
        borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
        boxShadow: mode === "dark" ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Table stickyHeader sx={{ "& .MuiTableCell-stickyHeader": { bgcolor: mode === "dark" ? "#1e293b" : "#f8fafc" } }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 4, fontWeight: 700, color: mode === "dark" ? "#94a3b8" : "#64748b" }}>Member</TableCell>
            <TableCell sx={{ fontWeight: 700, color: mode === "dark" ? "#94a3b8" : "#64748b" }}>Contact Info</TableCell>
            <TableCell sx={{ fontWeight: 700, color: mode === "dark" ? "#94a3b8" : "#64748b" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700, color: mode === "dark" ? "#94a3b8" : "#64748b" }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: 700, color: mode === "dark" ? "#94a3b8" : "#64748b" }}>Address</TableCell>
            <TableCell align="right" sx={{ pr: 4, fontWeight: 700, color: mode === "dark" ? "#94a3b8" : "#64748b" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AnimatePresence>
            {users.map((user, index) => (
              <TableRow
                key={user._id}
                component={motion.tr}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                hover
                sx={{
                  "&.MuiTableRow-hover:hover": {
                    bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                  },
                }}
              >
                <TableCell sx={{ pl: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        fontWeight: 700,
                        boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                      }}
                    >
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: mode === "dark" ? "#f1f5f9" : "#1e293b" }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: mode === "dark" ? "#64748b" : "#94a3b8" }}>
                        ID: {user._id.slice(-6).toUpperCase()}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: mode === "dark" ? "#cbd5e1" : "#475569" }}>{user.email}</Typography>
                  <Typography variant="caption" sx={{ color: mode === "dark" ? "#64748b" : "#94a3b8" }}>{user.mobile}</Typography>
                </TableCell>
                <TableCell>
                  <StatusBadge status={user.status} mode={mode} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: mode === "dark" ? "#cbd5e1" : "#475569" }}>{user.gender}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: mode === "dark" ? "#cbd5e1" : "#475569", maxWidth: "150px", noWrap: true }}>
                    {user.location}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ pr: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Tooltip title="View Details">
                      <IconButton component={Link} to={`/view/${user._id}`} sx={{ color: "primary.main" }}>
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Member">
                      <IconButton component={Link} to={`/edit/${user._id}`} sx={{ color: "#10b981" }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Member">
                      <IconButton 
                        onClick={() => onDelete(user._id)} 
                        disabled={isDeletingId === user._id}
                        sx={{ color: "#ef4444" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
