import { useEffect, useState, useCallback } from "react";
import { 
  Container, 
  Typography, 
  Box, 
  Skeleton, 
  Stack, 
  Paper, 
  TextField, 
  MenuItem, 
  Grid, 
  InputAdornment, 
  Button,
  Pagination
} from "@mui/material";
import { 
  Search as SearchIcon, 
  FileDownload as ExportIcon,
  FilterList as FilterIcon
} from "@mui/icons-material";
import UserTable from "../components/UserTable";
import DeleteModal from "../components/DeleteModal";
import API from "../api/userApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ListPage = ({ mode }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  // Filtering and Sorting States
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get(`/?page=${page}&limit=${limit}&search=${search}&gender=${gender}&status=${status}&sort=${sort}`);
      setUsers(response.data.users || []);
      setTotalPages(response.data.pages || 1);
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setLoading(false);
    }
  }, [page, search, gender, status, sort]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    
    setIsDeletingId(userToDelete);
    setDeleteModalOpen(false);
    try {
      await API.delete(`/${userToDelete}`);
      toast.success("Member deleted successfully");
      fetchUsers();
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setIsDeletingId(null);
      setUserToDelete(null);
    }
  };

  const handleExport = async () => {
    try {
      const response = await API.get("/export", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `users_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Exporting data...");
    } catch (error) {
      toast.error("Failed to export data");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 900,
              background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
              mb: 2,
              fontFamily: "'Times New Roman', serif",
            }}
          >
            Management Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, opacity: 0.8 }}>
            Manage your community members, track status, and analyze locations in one place.
          </Typography>
        </Box>
      </motion.div>

      {/* Controls Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: "24px", 
          border: "1px solid", 
          borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
          background: mode === "dark" ? "rgba(30, 41, 59, 0.4)" : "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)"
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: { borderRadius: "16px" }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setPage(1);
              }}
              InputProps={{ sx: { borderRadius: "16px" } }}
            >
              <MenuItem value="All">All Genders</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              InputProps={{ sx: { borderRadius: "16px" } }}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              select
              fullWidth
              label="Sort By"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              InputProps={{ sx: { borderRadius: "16px" } }}
            >
              <MenuItem value="new">Newest First</MenuItem>
              <MenuItem value="old">Oldest First</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<ExportIcon />}
              onClick={handleExport}
              sx={{ 
                height: "56px", 
                borderRadius: "16px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem"
              }}
            >
              Export CSV
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <Paper sx={{ p: 4, borderRadius: "24px", background: mode === "dark" ? "rgba(30, 41, 59, 0.7)" : "#ffffff" }}>
          <Stack spacing={2}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} variant="rounded" height={60} sx={{ borderRadius: "12px", bgcolor: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }} />
            ))}
          </Stack>
        </Paper>
      ) : (
        <>
          <UserTable 
            users={users} 
            onDelete={handleDeleteClick} 
            isDeletingId={isDeletingId} 
            mode={mode}
          />

          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            mode={mode}
          />
          {totalPages > 1 && (
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={(e, v) => setPage(v)}
                color="primary"
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "12px",
                    fontWeight: 700
                  }
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ListPage;
