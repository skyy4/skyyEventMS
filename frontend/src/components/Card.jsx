import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GradientOverlay = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(180deg, rgba(40,40,40,0.10) 40%, rgba(40,40,40,0.55) 100%)',
  borderRadius: '18px',
  zIndex: 1,
}));

const EventTitle = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '60%',
  transform: 'translate(-50%, -50%)',
  color: '#fff',
  fontWeight: 900,
  fontSize: '1.5rem',
  letterSpacing: 1.2,
  textShadow: '0 4px 24px rgba(0,0,0,0.25)',
  zIndex: 2,
  textAlign: 'center',
  width: '90%',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

export default function MediaCard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Convert binary data to base64
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
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      // Fetch events
      axios
        .get("http://localhost:3001/api/event/getEvent")
        .then((res) => {
          const eventsData = res.data;

          const formattedData = eventsData.map((event) => {
            const formattedEvent = {
              _id: event._id,
              title: event.title,
              description: event.description,
              cover_image: null,
            };

            if (event.cover_image) {
              const base64Image = convertBinaryToBase64(
                new Uint8Array(event.cover_image.data),
                event.cover_image.contentType
              );
              formattedEvent.cover_image = base64Image;
            }

            return formattedEvent;
          });

          setEvents(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    } else {
      console.error("No user token found.");
    }
  }, []);

  events.sort((a, b) => b.participants - a.participants);
  const topEvents = events.slice(0, 4);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} justifyContent="center">
      {topEvents.map((event, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.18)' }}
              style={{ borderRadius: 18, cursor: 'pointer' }}
              onClick={() => navigate(`/event/${event._id}`)}
            >
        <Card
          sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.10)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 340,
                  background: '#fff',
                  transition: 'box-shadow 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
          }}
                elevation={0}
              >
                <Box sx={{ position: 'relative', height: 180 }}>
          <CardMedia
                    component="img"
                    image={event.cover_image || 'https://via.placeholder.com/345x180'}
                    alt={event.title}
                    sx={{
                      height: 180,
                      width: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.92)',
                    }}
                  />
                  <GradientOverlay />
                  <EventTitle variant="h5">{event.title}</EventTitle>
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 120 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: 48 }}>
                    {event.description.length > 90 ? event.description.slice(0, 90) + '...' : event.description}
            </Typography>
                  <Typography variant="caption" color="primary" sx={{ fontWeight: 500, mb: 1 }}>
                    Click for full event details
            </Typography>
          </CardContent>
        </Card>
            </motion.div>
          </Grid>
      ))}
      </Grid>
    </Box>
  );
}
