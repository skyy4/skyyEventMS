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
  CalendarToday,
  AccessTime,
  Room,
  People,
  Description,
  AddPhotoAlternate,
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
    const file = e.target.files[0];
    if (file) {
      setCoverImg(file);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Update event Id in user collection
  const updateUser = async (eventData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      try {
        const userData = await axios.get(
          `http://localhost:3001/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const currentEvents = userData.data.created_event || [];

        await axios.put(
          `http://localhost:3001/api/user/edit/${userId}`,
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
    } else {
      console.log("User not logged in or invalid access token");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    if (user && user.token) {
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
        setTimeout(() => {
          navigate("/event");
        }, 3000);
      } catch (error) {
        console.log("Error uploading event:", error);
      }
    } else {
      console.log("User not logged in or invalid access token");
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close the snackbar
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ minHeight: '100vh', width: '100%' }}
    >
      <motion.div
        initial={{ background: 'linear-gradient(120deg, #f3e8ff 60%, #ede7f6 100%)' }}
        animate={{ background: [
          'linear-gradient(120deg, #f3e8ff 60%, #ede7f6 100%)',
          'linear-gradient(120deg, #ede7f6 60%, #f3e8ff 100%)',
          'linear-gradient(120deg, #f3e8ff 60%, #ede7f6 100%)',
        ] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}
      >
        <motion.div
          whileHover={{ scale: 1.025, boxShadow: '0 12px 40px 0 rgba(103, 58, 183, 0.18)' }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{ width: '100%', maxWidth: 600 }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 6,
              p: { xs: 2, md: 5 },
              background: 'rgba(255,255,255,0.75)',
              boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.10)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                textAlign="center"
                gutterBottom
                sx={{ fontWeight: 700, color: '#512da8', mb: 3 }}
              >
                Create New Event
              </Typography>
              <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  variant="filled"
                  label="Event Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  InputProps={{ style: { fontSize: "18px", fontWeight: "bold" } }}
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                />
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
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.start_date}
                  helperText={errors.start_date}
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                />
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
                        <AccessTime />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.start_time}
                  helperText={errors.start_time}
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                />
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
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.end_date}
                  helperText={errors.end_date}
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                />
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
                        <AccessTime />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.end_time}
                  helperText={errors.end_time}
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                />
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
                        <Room />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.venue}
                  helperText={errors.venue}
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                />
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
                        <Description />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                />
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
                        <People />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.capacity}
                  helperText={errors.capacity}
                  sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                />
                <FormControl variant="filled" fullWidth required sx={{ backgroundColor: "#fff", borderRadius: 2 }}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    error={!!errors.category}
                  >
                    <MenuItem value={"sports"}>Sports</MenuItem>
                    <MenuItem value={"parties"}>Parties</MenuItem>
                    <MenuItem value={"communities"}>Communities</MenuItem>
                    <MenuItem value={"theaters"}>Theaters</MenuItem>
                    <MenuItem value={"concerts"}>Concerts</MenuItem>
                    <MenuItem value={"event"}>Event</MenuItem>
                  </Select>
                </FormControl>
                {/* Image Upload Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <label htmlFor="cover-image-upload">
                    <Input
                      accept="image/*"
                      id="cover-image-upload"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<AddPhotoAlternate />}
                      sx={{ mb: 1 }}
                    >
                      Upload Cover Image
                    </Button>
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
