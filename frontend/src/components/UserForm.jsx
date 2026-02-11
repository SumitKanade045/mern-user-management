import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Grid,
  Paper,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  InputLabel,
  Typography,
} from "@mui/material";
import {
  Save as SaveIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required").min(2),
  lastName: yup.string().required("Last name is required").min(2),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Invalid email format"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Mobile number must be 10 digits and start with 6-9"),
  gender: yup.string().required("Gender is required"),
  status: yup.string().required("Status is required"),
  location: yup.string().required("Location is required"),
});

const UserForm = ({ onSubmit, defaultValues, mode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      gender: "",
      status: "Active",
      location: "",
    },
  });

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      await onSubmit(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ width: "100%", maxWidth: "900px" }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 8 },
          borderRadius: "40px",
          background: mode === "dark" 
            ? "rgba(15, 23, 42, 0.8)" 
            : "#ffffff",
          backdropFilter: "blur(24px)",
          border: "1px solid",
          borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
          boxShadow: mode === "dark" 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.05)" 
            : "0 20px 40px rgba(0, 0, 0, 0.03)",
        }}
      >
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <Grid container spacing={5}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: mode === "dark" ? "#94a3b8" : "#64748b" }}>
                    Full Name
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4.5}>
                  <TextField
                    fullWidth
                    placeholder="First Name"
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        bgcolor: mode === "dark" ? "rgba(30, 41, 59, 0.5)" : "#f8fafc",
                        "&:hover": { bgcolor: mode === "dark" ? "rgba(30, 41, 59, 0.8)" : "#f1f5f9" },
                        "& fieldset": { borderColor: "transparent" },
                        "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: "2px" },
                      },
                      "& .MuiInputBase-input": { color: mode === "dark" ? "#f1f5f9" : "#1e293b", px: 3, py: 2 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4.5}>
                  <TextField
                    fullWidth
                    placeholder="Last Name"
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        bgcolor: mode === "dark" ? "rgba(30, 41, 59, 0.5)" : "#f8fafc",
                        "&:hover": { bgcolor: mode === "dark" ? "rgba(30, 41, 59, 0.8)" : "#f1f5f9" },
                        "& fieldset": { borderColor: "transparent" },
                        "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: "2px" },
                      },
                      "& .MuiInputBase-input": { color: mode === "dark" ? "#f1f5f9" : "#1e293b", px: 3, py: 2 },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Contact Details */}
            <Grid item xs={12}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: mode === "dark" ? "#94a3b8" : "#64748b" }}>
                    Contact
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4.5}>
                  <TextField
                    fullWidth
                    placeholder="Email Address"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        bgcolor: mode === "dark" ? "rgba(30, 41, 59, 0.5)" : "#f8fafc",
                        "& fieldset": { borderColor: "transparent" },
                        "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: "2px" },
                      },
                      "& .MuiInputBase-input": { color: mode === "dark" ? "#f1f5f9" : "#1e293b", px: 3, py: 2 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4.5}>
                  <TextField
                    fullWidth
                    placeholder="Mobile Number"
                    {...register("mobile")}
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        bgcolor: mode === "dark" ? "rgba(30, 41, 59, 0.5)" : "#f8fafc",
                        "& fieldset": { borderColor: "transparent" },
                        "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: "2px" },
                      },
                      "& .MuiInputBase-input": { color: mode === "dark" ? "#f1f5f9" : "#1e293b", px: 3, py: 2 },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Profile Photo */}
            <Grid item xs={12}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: mode === "dark" ? "#94a3b8" : "#64748b" }}>
                    Profile Photo
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={8}>
                      <Button
                        component="label"
                        variant="outlined"
                        sx={{
                          borderRadius: "16px",
                          textTransform: "none",
                          fontWeight: 700,
                          color: mode === "dark" ? "#94a3b8" : "#64748b",
                          borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                          "&:hover": {
                            borderColor: "primary.main",
                            bgcolor: mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                          },
                        }}
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setAvatarFile(file);
                            setAvatarPreview(file ? URL.createObjectURL(file) : null);
                          }}
                        />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      {avatarPreview && (
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: "16px",
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                          }}
                        >
                          <img src={avatarPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Gender Section - PREMIUM UI */}
            <Grid item xs={12}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: mode === "dark" ? "#94a3b8" : "#64748b" }}>
                    Gender
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Box
                    sx={{
                      position: "relative",
                      p: "2px",
                      borderRadius: "24px",
                      background: mode === "dark" 
                        ? "linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.4) 100%)" 
                        : "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
                      boxShadow: mode === "dark" 
                        ? "0 0 25px rgba(139, 92, 246, 0.15), inset 0 0 10px rgba(139, 92, 246, 0.05)" 
                        : "0 4px 12px rgba(0,0,0,0.03)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        boxShadow: mode === "dark" 
                          ? "0 0 35px rgba(139, 92, 246, 0.25)" 
                          : "0 6px 16px rgba(0,0,0,0.05)",
                      }
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: mode === "dark" ? "#0f172a" : "#ffffff",
                        borderRadius: "22px",
                        px: { xs: 2, sm: 4 },
                        py: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup 
                            row 
                            {...field} 
                            sx={{ 
                              width: "100%",
                              display: "grid",
                              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
                              gap: 2,
                            }}
                          >
                            {["Male", "Female", "Other"].map((option) => {
                              const isSelected = field.value === option;
                              return (
                                <Box
                                  key={option}
                                  onClick={() => field.onChange(option)}
                                  sx={{
                                    cursor: "pointer",
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1.5,
                                    transition: "all 0.3s ease",
                                    bgcolor: isSelected 
                                      ? (mode === "dark" ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.05)")
                                      : "transparent",
                                    border: "2px solid",
                                    borderColor: isSelected 
                                      ? "primary.main" 
                                      : "transparent",
                                    "&:hover": {
                                      bgcolor: isSelected 
                                        ? (mode === "dark" ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.08)")
                                        : (mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"),
                                    }
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      borderRadius: "50%",
                                      border: "2px solid",
                                      borderColor: isSelected ? "primary.main" : (mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"),
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      transition: "all 0.3s ease",
                                    }}
                                  >
                                    {isSelected && (
                                      <Box
                                        sx={{
                                          width: 10,
                                          height: 10,
                                          borderRadius: "50%",
                                          bgcolor: "primary.main",
                                          boxShadow: "0 0 8px rgba(139, 92, 246, 0.8)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Typography 
                                    sx={{ 
                                      fontWeight: isSelected ? 700 : 500,
                                      fontSize: "0.9rem",
                                      color: isSelected 
                                        ? (mode === "dark" ? "#f1f5f9" : "primary.main")
                                        : (mode === "dark" ? "#94a3b8" : "#64748b"),
                                      transition: "all 0.3s ease",
                                    }}
                                  >
                                    {option}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </RadioGroup>
                        )}
                      />
                    </Box>
                  </Box>
                  {errors.gender && (
                    <FormHelperText error sx={{ ml: 2, mt: 1 }}>{errors.gender.message}</FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* Status Section */}
            <Grid item xs={12}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: mode === "dark" ? "#94a3b8" : "#64748b" }}>
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup row {...field} sx={{ gap: 4 }}>
                        {["Active", "Inactive"].map((option) => (
                          <Box
                            key={option}
                            onClick={() => field.onChange(option)}
                            sx={{
                              px: 4,
                              py: 1.5,
                              borderRadius: "16px",
                              cursor: "pointer",
                              border: "2px solid",
                              borderColor: field.value === option 
                                ? (option === "Active" ? "#10b981" : "#ef4444")
                                : (mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"),
                              bgcolor: field.value === option 
                                ? (option === "Active" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)")
                                : "transparent",
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Box sx={{ 
                              width: 10, 
                              height: 10, 
                              borderRadius: "50%", 
                              bgcolor: option === "Active" ? "#10b981" : "#ef4444",
                              boxShadow: field.value === option ? `0 0 10px ${option === "Active" ? "#10b981" : "#ef4444"}` : "none"
                            }} />
                            <Typography sx={{ 
                              fontWeight: 700, 
                              color: field.value === option 
                                ? (option === "Active" ? "#10b981" : "#ef4444")
                                : (mode === "dark" ? "#64748b" : "#94a3b8")
                            }}>
                              {option}
                            </Typography>
                          </Box>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Location Section */}
            <Grid item xs={12}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: mode === "dark" ? "#94a3b8" : "#64748b" }}>
                    Address
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    fullWidth
                    placeholder="Enter permanent address..."
                    {...register("location")}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        bgcolor: mode === "dark" ? "rgba(30, 41, 59, 0.5)" : "#f8fafc",
                        "& fieldset": { borderColor: "transparent" },
                        "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: "2px" },
                      },
                      "& .MuiInputBase-input": { color: mode === "dark" ? "#f1f5f9" : "#1e293b", px: 3, py: 2 },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Form Footer - Special Line for Save Button */}
            <Grid item xs={12}>
              <Box sx={{ 
                mt: 6, 
                pt: 6, 
                borderTop: "1px solid", 
                borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                display: "flex", 
                justifyContent: "center" 
              }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    px: 8,
                    py: 2.2,
                    borderRadius: "20px",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    textTransform: "none",
                    background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                    boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.5)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 40px -10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.3)",
                      background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
                    },
                    "&.Mui-disabled": {
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "rgba(255, 255, 255, 0.3)",
                    }
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>
                      <SaveIcon sx={{ mr: 1.5 }} />
                      Save Member Details
                    </>
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default UserForm;
