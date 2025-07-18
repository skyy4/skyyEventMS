import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  Box,
  IconButton,
  CardActions,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useSnackbar } from 'notistack';

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

function EventGrids({ listOfEvent, setListOfEvent, category }) {
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [registeredList, setRegisteredList] = useState([]);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  console.log(category);

  // Fetch user data from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const jwtToken = jwtDecode(user.token);
      setUserId(jwtToken._id);
      setUserRole(jwtToken.role);
      axios
        .get(`${apiUrl}/api/user/${jwtToken._id}`)
        .then((res) => {
          setFavorites(res.data.favourite_events || []);
        })
        .catch((err) => {
          console.error("Failed to fetch user data", err);
        });
    }
  }, []);

  //useEffect to fetch events based on category
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // if (category) {
        const response = await axios.get(
          `${apiUrl}/api/event/getCategory/?category=${category}`
        );
        setResponseData(response.data);
        // } else {
        //   const response = await axios.get(
        //     "http://localhost:3001/api/event/getEvent"
        //   );
        //   setResponseData(response.data);
        //   console.log(responseData);
        // }

        // if (response.state === 404) {
        //   console.log("No events found");
        //   return;
        // }

        let res_data = responseData;
        // Process the event dataa
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

        if (listOfEvents.length === 0) {
          setListOfEvent([]);
          console.log("No events found");
          console.log(listOfEvents);
        } else {
          setListOfEvent(listOfEvents);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to fetch the event");
      }
    };
    fetchEvent();
  }, [category]);

  const navigate = useNavigate();

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleNavigate = (event) => {
    navigate(`/event/${event._id}`);
  };

  const handleRegister = (event_id) => {
    console.log(event_id);

    axios
      .put(`${apiUrl}/api/user/edit/${userId}`, {
        registered_events: [...registeredList, event_id],
      })
      .then(() => {
        setRegisteredList([...registeredList, event_id]);
        enqueueSnackbar('Event registered successfully!', { variant: 'success' });
        console.log("Event registered successfully");
      })
      .catch((err) => {
        enqueueSnackbar('An error occurred during registration.', { variant: 'error' });
        alert("An error occurred. Please check the console");
        console.error(err);
      });
  };

  const handleFav = (event_id) => {
    const isFav = favorites.includes(event_id);
    const updatedFavorites = isFav
      ? favorites.filter((id) => id !== event_id)
      : [...favorites, event_id];

    axios
      .put(`${apiUrl}/api/user/edit/${userId}`, {
        favourite_events: updatedFavorites,
      })
      .then(() => {
        setFavorites(updatedFavorites);
        enqueueSnackbar(isFav ? 'Removed from favorites.' : 'Added to favorites!', { variant: isFav ? 'info' : 'success' });
        setSnackbarOpen(true);
      })
      .catch((err) => {
        enqueueSnackbar('An error occurred updating favorites.', { variant: 'error' });
        alert("An error occurred. Please check the console");
        console.error(err);
      });
  };

  const gridItemProps = {
    xs: 20,
    sm: 12,
    md: 8,
    lg: 5,
    sx: {
      mt: 1,
      pl: 8,
      display: "flex",
      flexDirection: "column",
      gutterBottom: 2,
    },
  };

  return (
    <div>
      <Container maxWidth="xl" fixed sx={{ mt: 9 }}>
        <Grid container spacing={8} columns={20}>
          {listOfEvent.map((event, idx) => (
            <Grid item key={event._id} {...gridItemProps}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
                style={{ height: '100%' }}
              >
              <Card
                sx={{
                  height: 450,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  position: "relative",
                  justifyContent: "space-between",
                    backgroundColor: theme.palette.background.paper,
                  borderRadius: 3,
                  boxShadow: 10,
                  gap: 1,
                    transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                }}
              >
                <CardMedia
                  sx={{
                    minHeight: 150,
                  }}
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
                    onClick={() => handleNavigate(event)}
                  >
                    More info
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRegister(event._id)}
                  >
                    Register
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
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default EventGrids;
