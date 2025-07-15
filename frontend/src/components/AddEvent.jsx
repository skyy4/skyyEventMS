import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Celebration,
  SportsSoccer,
  Group,
  TheaterComedy,
  MusicNote,
  LocalBar,
  CalendarToday,
  AccessTime,
  Room,
  People,
  Description,
  AddPhotoAlternate,
  CheckCircleOutline
} from "@mui/icons-material";

import addImg from "../asset/addImage.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useNavigate } from "react-router-dom";
import Ceatlogo from "../asset/Icon/colombo.png";
import Maxxislogo from "../asset/Icon/compsoc.jpg";
import Bridgestonelogo from "../asset/Icon/IEEE.jpg";
import Dunloplogo from "../asset/Icon/images (1).jpg";
import Michelinlogo from "../asset/Icon/Systemlogo2.jpg";
import Federallogo from "../asset/Icon/rotaract.jpg";
import { motion, AnimatePresence } from 'framer-motion';

const apiUrl = import.meta.env.VITE_API_URL;

const Input = styled("input")({
  display: "none",
});

export const AddEvent = () => {
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState(""); // For event category
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [createdEvent, setCreatedEvent] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const jwStr = jwtDecode(token);
    const user_id = jwStr._id;
    setUserId(user_id);
  }, []);

  const [coverImg, setCoverImg] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    venue: "",
    description: "",
    capacity: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    if (!e || !e.target || !e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      setCoverImg(file);
    }
  };

  const handleCategoryChange = (e) => {
    if (!e || !e.target) return;
    setCategory(e.target.value);
  };

  // Update event Id in user collection
  const updateUser = async (eventData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      setAlertMessage("User not logged in or invalid access token");
      setSnackbarOpen(true);
      return;
    }
    try {
      const userData = await axios.get(
        `${apiUrl}/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const currentEvents = userData.data.created_event || [];

      await axios.put(
        `${apiUrl}/api/user/edit/${userId}`,
        {
          created_event: [...currentEvents, eventData._id],
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccess(false);

    const newErrors = {};
    if (!formData.title) newErrors.title = "Event title is required";
    if (!formData.start_date) newErrors.start_date = "Start Date is required";
    if (!formData.start_time) newErrors.start_time = "Start Time is required";
    if (!formData.end_date) newErrors.end_date = "End Date is required";
    if (!formData.end_time) newErrors.end_time = "End Time is required";
    if (!formData.venue) newErrors.venue = "Venue is required";
    if (!formData.capacity) newErrors.capacity = "Capacity is required";
    if (!category) newErrors.category = "Event category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (coverImg) {
      formDataToSend.append("cover_image", coverImg, coverImg.name);
    } else {
      setAlertMessage("No image selected. Please choose an image to upload.");
      setSnackbarOpen(true);
      return;
    }
    formDataToSend.append("created_by", userId);
    const created_at = new Date().toISOString();
    formDataToSend.append("created_at", created_at);
    formDataToSend.append("category", category);
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      setAlertMessage("User not logged in or invalid access token");
      setSnackbarOpen(true);
      return;
    }
    try {
      const result = await axios.post(
        `${apiUrl}/api/event/createEvent`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCreatedEvent(result.data);
      updateUser(result.data);
      setAlertMessage("Event created successfully!");
      setSnackbarOpen(true);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/event");
      }, 2000);
    } catch (error) {
      console.log("Error uploading event:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close the snackbar
  };

  // Helper for category icons
  const categoryOptions = [
    { value: 'sports', label: 'Sports', icon: <SportsSoccer sx={{ color: '#43a047' }} /> },
    { value: 'parties', label: 'Parties', icon: <LocalBar sx={{ color: '#f06292' }} /> },
    { value: 'communities', label: 'Communities', icon: <Group sx={{ color: '#1976d2' }} /> },
    { value: 'theaters', label: 'Theaters', icon: <TheaterComedy sx={{ color: '#ffb300' }} /> },
    { value: 'concerts', label: 'Concerts', icon: <MusicNote sx={{ color: '#7e57c2' }} /> },
    { value: 'event', label: 'Event', icon: <Celebration sx={{ color: '#512da8' }} /> },
  ];

  // Animation variants for staggered field entrance
  const fieldVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } })
  };
  // Success animation state
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ minHeight: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle background shapes */}
      <Box sx={{
        position: 'absolute',
        top: -120,
        left: -120,
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, #a259ff33 0%, #fff0 80%)',
        filter: 'blur(32px)',
        zIndex: 0,
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -100,
        right: -100,
        width: 320,
        height: 320,
        background: 'radial-gradient(circle, #6ec6ff33 0%, #fff0 80%)',
        filter: 'blur(32px)',
        zIndex: 0,
      }} />
      <motion.div
        initial={{ background: 'linear-gradient(120deg, #f3e8ff 60%, #ede7f6 100%)' }}
        animate={{ background: [
          'linear-gradient(120deg, #f3e8ff 60%, #ede7f6 100%)',
          'linear-gradient(120deg, #ede7f6 60%, #f3e8ff 100%)',
          'linear-gradient(120deg, #f3e8ff 60%, #ede7f6 100%)',
        ] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0', zIndex: 1 }}
      >
        <motion.div
          whileHover={{ scale: 1.025, boxShadow: '0 12px 40px 0 rgba(103, 58, 183, 0.18)' }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{ width: '100%', maxWidth: 600 }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 8,
              p: { xs: 2, md: 5 },
              background: 'rgba(255,255,255,0.55)',
              boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.18)',
              backdropFilter: 'blur(24px)',
              border: '1.5px solid #e0e0e0',
              zIndex: 2,
            }}
          >
            <CardContent>
              {/* Engaging header */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Celebration sx={{ fontSize: 56, color: '#a259ff', mb: 1, filter: 'drop-shadow(0 2px 8px #a259ff44)' }} />
                <Typography
                  variant="h4"
                  textAlign="center"
                  gutterBottom
                  sx={{ fontWeight: 800, color: '#512da8', mb: 1, letterSpacing: 1 }}
                >
                  Create New Event
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#6e6e6e', fontWeight: 400, mb: 1 }}>
                  Make your event stand out! Fill in the details below.
                </Typography>
              </Box>
              <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                noValidate
                autoComplete="off"
              >
                <AnimatePresence>
                  {[{
                    key: 'title',
                    field: (
                      <TextField
                        variant="filled"
                        label="Event Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        InputProps={{
                          style: { fontSize: "18px", fontWeight: "bold" },
                          startAdornment: (
                            <InputAdornment position="start">
                              <Celebration sx={{ color: '#a259ff' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          boxShadow: errors.title ? '0 0 0 2px #f44336' : '0 1px 8px 0 #a259ff11',
                          transition: 'box-shadow 0.2s',
                        }}
                        autoFocus
                      />
                    )
                  }, {
                    key: 'start_date',
                    field: (
                      <TextField
                        variant="filled"
                        fullWidth
                        label="Start Date"
                        name="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarToday sx={{ color: '#43a047' }} />
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.start_date}
                        helperText={errors.start_date}
                        sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: errors.start_date ? '0 0 0 2px #f44336' : '0 1px 8px 0 #43a04711', transition: 'box-shadow 0.2s' }}
                      />
                    )
                  }, {
                    key: 'start_time',
                    field: (
                      <TextField
                        variant="filled"
                        fullWidth
                        label="Start Time"
                        name="start_time"
                        type="time"
                        value={formData.start_time}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTime sx={{ color: '#43a047' }} />
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.start_time}
                        helperText={errors.start_time}
                        sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: errors.start_time ? '0 0 0 2px #f44336' : '0 1px 8px 0 #43a04711', transition: 'box-shadow 0.2s' }}
                      />
                    )
                  }, {
                    key: 'end_date',
                    field: (
                      <TextField
                        variant="filled"
                        fullWidth
                        label="End Date"
                        name="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarToday sx={{ color: '#f06292' }} />
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.end_date}
                        helperText={errors.end_date}
                        sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: errors.end_date ? '0 0 0 2px #f44336' : '0 1px 8px 0 #f0629211', transition: 'box-shadow 0.2s' }}
                      />
                    )
                  }, {
                    key: 'end_time',
                    field: (
                      <TextField
                        variant="filled"
                        fullWidth
                        label="End Time"
                        name="end_time"
                        type="time"
                        value={formData.end_time}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccessTime sx={{ color: '#f06292' }} />
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.end_time}
                        helperText={errors.end_time}
                        sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: errors.end_time ? '0 0 0 2px #f44336' : '0 1px 8px 0 #f0629211', transition: 'box-shadow 0.2s' }}
                      />
                    )
                  }, {
                    key: 'venue',
                    field: (
                      <TextField
                        variant="filled"
                        fullWidth
                        label="Venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Room sx={{ color: '#1976d2' }} />
                            </InputAdornment>
                          ),
                        }}
                        error={!!errors.venue}
                        helperText={errors.venue}
                        sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: errors.venue ? '0 0 0 2px #f44336' : '0 1px 8px 0 #1976d211', transition: 'box-shadow 0.2s' }}
                      />
                    )
                  }, {
                    key: 'description',
                    field: (
                      <TextField
                        variant="filled"
                        fullWidth
                        label="Description (*Max 200 characters)"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        inputProps={{ maxLength: 200 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Description sx={{ color: '#7e57c2' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: '0 1px 8px 0 #7e57c211', transition: 'box-shadow 0.2s' }}
                      />
                    )
                  }, {
                    key: 'capacity',
                    field: (
                      <TextField
                        variant="filled"
                        fullWidth
                        label="Capacity"
                        name="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <People sx={{ color: '#512da8' }} />
                            </InputAdornment>
                          ),
                        }}
                        error={!!errors.capacity}
                        helperText={errors.capacity}
                        sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: errors.capacity ? '0 0 0 2px #f44336' : '0 1px 8px 0 #512da811', transition: 'box-shadow 0.2s' }}
                      />
                    )
                  }].map((item, i) => (
                    <motion.div
                      key={item.key}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={fieldVariants}
                    >
                      {item.field}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {/* Category with icons */}
                <FormControl variant="filled" fullWidth required sx={{ backgroundColor: "#fff", borderRadius: 2 }}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    error={!!errors.category}
                    renderValue={(selected) => {
                      const opt = categoryOptions.find(o => o.value === selected);
                      return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {opt?.icon}
                          <span>{opt?.label}</span>
                        </Box>
                      );
                    }}
                  >
                    {categoryOptions.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {opt.icon}
                          <span>{opt.label}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* Animated error messages for category */}
                <AnimatePresence>
                  {errors.category && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      style={{ color: '#f44336', fontSize: 14, marginTop: -20, marginBottom: 8 }}
                    >
                      {errors.category}
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Image Upload Section - drag & drop style */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <label htmlFor="cover-image-upload" style={{ width: '100%' }}>
                    <Input
                      accept="image/*"
                      id="cover-image-upload"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <Box
                      sx={{
                        border: '2px dashed #a259ff',
                        borderRadius: 4,
                        p: 2,
                        width: '100%',
                        minHeight: 120,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: coverImg ? '#f3e8ff44' : '#fafaff',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        mb: 1,
                      }}
                    >
                      <AddPhotoAlternate sx={{ fontSize: 36, color: '#a259ff' }} />
                      <Typography variant="body2" sx={{ color: '#a259ff', mt: 1 }}>
                        {coverImg ? 'Change Cover Image' : 'Drag & drop or click to upload cover image'}
                      </Typography>
                    </Box>
                  </label>
                  {coverImg && (
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <img
                        src={URL.createObjectURL(coverImg)}
                        alt="Cover Preview"
                        style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8, boxShadow: '0 2px 8px rgba(80,80,80,0.12)' }}
                      />
                    </Box>
                  )}
                </Box>
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: '0 6px 24px 0 rgba(103, 58, 183, 0.18)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{ width: '100%' }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{
                      height: "54px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      textTransform: "none",
                      borderRadius: "16px",
                      transition: "background-color 0.3s",
                      boxShadow: '0 4px 16px 0 rgba(103, 58, 183, 0.10)',
                      mt: 2,
                      '&:hover': {
                        backgroundColor: "#512da8",
                      },
                    }}
                  >
                    Create Event
                  </Button>
                </motion.div>
                {/* Success animation */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}
                    >
                      <CheckCircleOutline sx={{ color: '#43a047', fontSize: 48, mr: 1 }} />
                      <Typography variant="h6" sx={{ color: '#43a047', fontWeight: 700 }}>
                        Event Created!
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            alertMessage ===
            "No image selected. Please choose an image to upload."
              ? "error"
              : "success"
          }
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};
