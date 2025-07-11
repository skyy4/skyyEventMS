import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  IconButton,
  CardActions,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchForm from "./SearchForm";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const apiUrl = import.meta.env.VITE_API_URL;

// Function to convert binary data to base64
const convertBinaryToBase64 = (binaryData, contentType) => {
  if (binaryData && binaryData instanceof Uint8Array) {
    const binaryString = Array.from(binaryData)
      .map((byte) => String.fromCharCode(byte))
      .join("");
    return `data:${contentType};base64,${btoa(binaryString)}`;
  } else {
    console.error("Invalid binary data provided:", binaryData);
    return null;
  }
};

export const Event = () => {
  const [listOfEvent, setListOfEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [register, setRegister] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Alert visibility state
  const [alert, setAlert] = useState("");
  const [message, setMessage] = useState("");
  var flagIsOpen = false;
  const location = useLocation();

  const navigate = useNavigate();
  // Function to handle closing the snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close the snackbar
  };

  //get user data from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const token = jwtDecode(user.token);
      setUserId(token._id);
      setUserRole(token.role);
      axios
        .get(`${apiUrl}/api/user/${token._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setFavorites(res.data.favourite_events || []);
          setRegister(res.data.registered_events || []);
        })
        .catch((err) => {
          console.error("Failed to fetch user data", err);
        });
    } else {
      console.log("User not logged in or invalid access token");
    }
  }, []);

  // Set the category from the location state
  useEffect(() => {
    const locationData = location.state || {};
    console.log("locationData useEffect");
    console.log(locationData.category);

    if (locationData && locationData.category) {
      setCategory(locationData.category);
      console.log("locationData");
      console.log(locationData.category);
      flagIsOpen = true;
    }
  }, [location.state]);

  // Fetch event data
  useEffect(() => {
    const fetchEventCategory = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          category
            ? `${apiUrl}/api/event/getCategory/?category=${category}`
            : `${apiUrl}/api/event/getEvent`
        );

        let res_data = response.data;
        console.log("res_data");
        console.log(res_data);

        // Process the event data
        const listOfEvents = res_data.map((event) => {
          if (event.cover_image) {
            const base64Image = convertBinaryToBase64(
              new Uint8Array(event.cover_image.data),
              event.cover_image.contentType
            );
            event.cover_image = base64Image;
          }
          return event;
        });

        setListOfEvent(listOfEvents);
        setError("");
      } catch (error) {
        if (error.response?.status === 404) {
          setListOfEvent([]);
          console.log("No events found (404)");
          return;
        }

        console.error("Failed to fetch data:", error);
        setError("Failed to fetch the event");
      } finally {
        setLoading(false);
      }
    };

    const fetchEvent = async () => {
      setLoading(true);

      try {
        // Only make the API call if category is not empty
        if (!category || category.trim() === "") {
          const response = await axios.get(`${apiUrl}/api/event/getEvent`);
          let res_data = response.data;
          console.log("res_data (all events)");
          console.log(res_data);

          // Process the event data
          const listOfEvents = res_data.map((event) => {
            if (event.cover_image) {
              const base64Image = convertBinaryToBase64(
                new Uint8Array(event.cover_image.data),
                event.cover_image.contentType
              );
              event.cover_image = base64Image;
            }
            return event;
          });

          setListOfEvent(listOfEvents);
          setError("");
        } else {
          const response = await axios.get(
            `${apiUrl}/api/event/getCategory/?category=${category}`
          );

          let res_data = response.data;
          console.log("res_data (filtered)");
          console.log(res_data);

          // Process the event data
          const listOfEvents = res_data.map((event) => {
            if (event.cover_image) {
              const base64Image = convertBinaryToBase64(
                new Uint8Array(event.cover_image.data),
                event.cover_image.contentType
              );
              event.cover_image = base64Image;
            }
            return event;
          });

          setListOfEvent(listOfEvents);
          setError("");
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setListOfEvent([]);
          console.log("No events found (404)");
          return;
        }

        console.error("Failed to fetch data:", error);
        setError("Failed to fetch the event");
      } finally {
        setLoading(false);
      }
    };

    if (!flagIsOpen) {
      fetchEventCategory();
    } else {
      fetchEvent();
      flagIsOpen = false;
    }
  }, [category]);

  // Handle category change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === "") {
      setCategory("");
      return;
    }
    setCategory(selectedCategory);
  };

  // Handle navigation to event details
  const handleNavigate = (event_id) => {
    navigate(`/event/${event_id}`);
  };

  // Handle favorite event
  const handleFav = async (event_id) => {
    const isFav = favorites.includes(event_id);
    const updatedFavorites = isFav
      ? favorites.filter((id) => id !== event_id)
      : [...favorites, event_id];

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      await axios
        .put(
          `${apiUrl}/api/user/edit/${userId}`,
          {
            favourite_events: updatedFavorites,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then(() => {
          setFavorites(updatedFavorites);
          isFav
            ? setMessage("Event removed from your favorites")
            : setMessage("Event added to favorites");
          isFav ? setAlert("info") : setAlert("success");
          console.log(isFav ? "Removed from favorites" : "Added to favorites");
          setSnackbarOpen(true);
        })
        .catch((err) => {
          setAlert("error");
          setMessage("Failed to add event to favorites");
          setSnackbarOpen(true);
          console.error(err);
        });
    } else {
      console.log("User not logged in or invalid access token");
    }
  };

  //Handle evet registere
  const handleRegister = async (event_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      try {
        // Fetch the latest participants for the event
        const eventResponse = await axios.get(
          `${apiUrl}/api/event/getEvent/${event_id}`
        );
        const currentParticipants = eventResponse.data.participants;

        const isReg = register.includes(event_id);
        const updatedRegister = isReg
          ? register.filter((id) => id !== event_id)
          : [...register, event_id];

        const updatedParticipants = isReg
          ? currentParticipants.filter((id) => id !== userId)
          : [...currentParticipants, userId];

        // First, update the user's registered events
        await axios.put(
          `${apiUrl}/api/user/edit/${userId}`,
          {
            registered_events: updatedRegister,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // Then, update the event's participants
        await axios.put(
          `${apiUrl}/api/event/edit/${event_id}`,
          {
            participants: updatedParticipants,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // Update the local state after both requests succeed
        setRegister(updatedRegister);
        isReg
          ? setMessage("Unegistered for event successfully")
          : setMessage("Registered for event successfully");
        isReg ? setAlert("info") : setAlert("success");
        setSnackbarOpen(true);
        console.log(isReg ? "Removed from Register" : "Added to Register");
      } catch (err) {
        setAlert("error");
        setMessage("Failed to register for event");
        setSnackbarOpen(true);
        console.error("Error while registering/unregistering", err);
      }
    } else {
      console.log("User not logged in or invalid access token");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      
      {/* Search form and category dropdown */}
      <Container maxWidth="lg">
        
        <Box sx={{
          display: "flex",
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: "center",
          background:"linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)",
          mt: 4,
          pt:5,
          pb:5,
          borderRadius: '50px'

        }}>
          <Typography variant="h4" sx={{
            color: 'white',
            m: 2
          }}>Search for your next memorable event.</Typography>
        <Box
          sx={{
            
            display: "flex",
            width:'100%',
            alignItems: 'center',
            justifyContent: "center",
            // bgcolor:'blue',
            // mt: 4,
            // pt:15,
            // pb:5
            
          }}
        >
          
          <FormControl
            
            sx={{
              // boxShadow: 4,
              maxWidth: 600,
              width: 200,
              m: 1,
              bgcolor:'white',
              borderRadius: 4,
              borderColor:'none',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'transparent', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent', // Remove blue border on focus
                },
              },
      
      
              
            }}
          >
            <Select
              displayEmpty
              labelId="category-select-label"
              id="category-select"
              value={category || ""}
              onChange={handleCategoryChange}
              renderValue={(selected) => {
                if (!selected) {
                  return <>Category</>; // Placeholder text
                }
                return selected;
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="event">Event</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="parties">Parties</MenuItem>
              <MenuItem value="communities">Communities</MenuItem>
              <MenuItem value="theaters">Theaters</MenuItem>
              <MenuItem value="concerts">Concerts</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ ml: 2, width: "100%", maxWidth: 500 }}>
            <SearchForm setListOfEvents={setListOfEvent} />
          </Box>
          <Button variant="contained" sx={{
            bgcolor: 'white',
            color: 'black',
            ml:2,
            width: 'auto',
            height: '60px',
            fontSize: '15px',
            borderRadius: '50%'

          }}
          onClick={() => navigate("/create-event")}
        
          ><AddIcon/></Button>
          </Box>





        </Box>
      </Container>

      {/* Event cards */}
      <Container maxWidth="xl" fixed sx={{ mt: 9 }}>
        <Grid container spacing={8} columns={20}>
          {listOfEvent.map((event) => (
            <Grid item key={event._id} xs={20} sm={12} md={8} lg={5}>
              <Card
                sx={{
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  position: "relative",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f0f0",
                  borderRadius: 3,
                  boxShadow: 10,
                  gap: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  sx={{ minHeight: 150 }}
                  image={
                    event.cover_image || "https://via.placeholder.com/345x140"
                  }
                  title={event.title}
                />
                <CardContent
                  sx={{
                    minHeight: 150,
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    mt: 0,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {event.start_date}
                  </Typography>
                  <Typography variant="body2">
                    {event.description.slice(0, 200)}
                  </Typography>
                  <Typography variant="body2">{event.venue}</Typography>
                </CardContent>
                <CardActions
                  sx={{
                    minHeight: 50,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 0,
                    pl: 1,
                    pr: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNavigate(event._id)}
                  >
                    More info
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleRegister(event._id, event.participants)
                    }
                  >
                    {register.includes(event._id) ? "Unregister" : "Register"}
                  </Button>
                  <Box>
                    <IconButton
                      variant="outlined"
                      color={
                        favorites.includes(event._id) ? "warning" : "neutral"
                      }
                      sx={{ mr: "auto" }}
                      onClick={() => handleFav(event._id)}
                    >
                      {favorites.includes(event._id) ? (
                        <FavoriteIcon sx={{ fontSize: 30 }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                      )}
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* alert  */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={alert}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
