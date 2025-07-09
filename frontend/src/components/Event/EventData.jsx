import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardMedia,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
  Stack,
  ButtonGroup,
  Divider,
  Badge,
} from "@mui/material";
import { Reviews } from "../Reviews";
import { EventParticipant } from "./EventParticipant";
import FormDialogDelete from "./EventDeleteDialog";
import { EventEdit } from "./EventEdit";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

function getTimeRemaining(eventDate, eventTime) {
  const eventDateTime = new Date(`${eventDate}T${eventTime}`);
  const now = new Date();
  const diff = eventDateTime - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function EventData() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [eventCreatedId, setEventCreatedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [register, setRegister] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category;

  useEffect(() => {
    if (event && event.created_by) {
      setEventCreatedId(event.created_by);
    }
  }, [event]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      const token = jwtDecode(user.token);
      setUserId(token._id);
      setUserRole(token.role);
      axios
        .get(`http://localhost:3001/api/user/${token._id}`, {
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
      navigate("/login");
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!event) return;
    const updateCountdown = () => {
      setCountdown(getTimeRemaining(event.start_date, event.start_time));
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleFav = async (event_id) => {
    const isFav = favorites.includes(event_id);
    const updatedFavorites = isFav
      ? favorites.filter((id) => id !== event_id)
      : [...favorites, event_id];
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      await axios
        .put(
          `http://localhost:3001/api/user/edit/${userId}`,
          { favourite_events: updatedFavorites },
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        .then(() => {
          setFavorites(updatedFavorites);
          setMessage(isFav ? "Event removed from your favorites" : "Event added to favorites");
          setAlert(isFav ? "info" : "success");
          setShowConfetti(!isFav);
          setSnackbarOpen(true);
        })
        .catch((err) => {
          setAlert("error");
          setMessage("Failed to add event to favorites");
          setSnackbarOpen(true);
        });
    }
  };

  const handleRegister = async (event_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      try {
        const eventResponse = await axios.get(
          `http://localhost:3001/api/event/getEvent/${event_id}`
        );
        const currentParticipants = eventResponse.data.participants;
        const isReg = register.includes(event_id);
        const updatedRegister = isReg
          ? register.filter((id) => id !== event_id)
          : [...register, event_id];
        const updatedParticipants = isReg
          ? currentParticipants.filter((id) => id !== userId)
          : [...currentParticipants, userId];
        await axios.put(
          `http://localhost:3001/api/user/edit/${userId}`,
          { registered_events: updatedRegister },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        await axios.put(
          `http://localhost:3001/api/event/edit/${event_id}`,
          { participants: updatedParticipants },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setRegister(updatedRegister);
        setMessage(isReg ? "Unregistered for event successfully" : "Registered for event successfully");
        setAlert(isReg ? "info" : "success");
        setShowConfetti(!isReg);
        setSnackbarOpen(true);
      } catch (err) {
        setAlert("error");
        setMessage("Failed to register for event");
        setSnackbarOpen(true);
      }
    }
  };

  // Fetch the event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/event/getEvent/${eventId}`
        );
        let eventData = response.data;
        if (eventData.cover_image) {
          const base64Image = convertBinaryToBase64(
            new Uint8Array(eventData.cover_image.data),
            eventData.cover_image.contentType
          );
          eventData.cover_image = base64Image;
        }
        setEvent(eventData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch the event");
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  // Share event link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setSnackbarOpen(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Confetti reset
  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => setShowConfetti(false), 1800);
    }
  }, [showConfetti]);

  if (loading || !event) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <>{error}</>;
  }

  // Calculate progress
  const capacity = event.capacity || 1;
  const participants = event.participants ? event.participants.length : 0;
  const percentFilled = Math.min(100, Math.round((participants / capacity) * 100));

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={180} />}
      {/* Back to Events Button */}
      <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', mt: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          sx={{ borderRadius: 3, fontWeight: 700, color: '#512da8', borderColor: '#b39ddb', mr: 2, '&:hover': { bgcolor: '#ede7f6', borderColor: '#512da8' } }}
          onClick={() => navigate('/event')}
        >
          Back to Events
        </Button>
      </Box>
      <Box sx={{
        width: '100%',
        minHeight: 320,
        position: 'relative',
        mb: { xs: 0, md: 0 },
        zIndex: 2,
      }}>
        {/* Hero Banner */}
        <Box
          sx={{
            backgroundImage: `linear-gradient(120deg, rgba(80,80,80,0.18) 0%, rgba(80,80,80,0.38) 100%), url(${event.cover_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: { xs: '0 0 32px 32px', md: 6 },
            minHeight: 320,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            position: 'relative',
            boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.18)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{
            p: 4,
            zIndex: 2,
            background: 'rgba(255,255,255,0.80)',
            borderTopRightRadius: 32,
            borderBottomLeftRadius: 12,
            boxShadow: '0 2px 12px 0 rgba(103, 58, 183, 0.10)',
            m: 3,
            minWidth: 320,
          }}>
            <Typography variant="h2" fontWeight={900} color="#512da8" sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.8rem' } }}>{event.title}</Typography>
            <Typography variant="h6" color="#333" sx={{ mb: 1 }}>{event.start_date} {event.start_time && `| ${event.start_time}`}</Typography>
            {countdown && (
              <Typography variant="body1" color="#7b1fa2" fontWeight={700}>
                Starts in: {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
              </Typography>
            )}
          </Box>
          <Box sx={{ position: 'absolute', top: 24, right: 36, display: 'flex', gap: 2, zIndex: 3 }}>
            <Tooltip title={favorites.includes(event._id) ? 'Remove from favorites' : 'Add to favorites'}>
              <IconButton onClick={() => handleFav(event._id)} sx={{ bgcolor: 'rgba(255,255,255,0.85)', mr: 1, borderRadius: 99, boxShadow: '0 2px 8px 0 rgba(103, 58, 183, 0.10)' }}>
                {favorites.includes(event._id) ? <FavoriteIcon color="error" sx={{ fontSize: 32 }} /> : <FavoriteBorderIcon sx={{ fontSize: 32 }} />}
              </IconButton>
            </Tooltip>
            <Tooltip title={copied ? 'Link copied!' : 'Share event'}>
              <IconButton onClick={handleShare} sx={{ bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 99, boxShadow: '0 2px 8px 0 rgba(103, 58, 183, 0.10)' }}>
                <ShareIcon color={copied ? 'success' : 'primary'} sx={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      {/* Overlapping Cards Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, mt: { xs: -8, md: -12 }, mb: 4 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <Grid container spacing={4} alignItems="flex-start" justifyContent="center" sx={{
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 0 },
          }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{
                background: 'rgba(255,255,255,0.65)',
                borderRadius: 6,
                boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.12)',
                p: 4,
                minWidth: 320,
                maxWidth: 420,
                width: '100%',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid #ede7f6',
                mt: { xs: 0, md: 8 },
              }}>
                <List>
                  <ListItem>
                    <ListItemIcon><EventIcon /></ListItemIcon>
                    <ListItemText primary={<b>Start:</b>} secondary={`${event.start_date} ${event.start_time}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><EventIcon /></ListItemIcon>
                    <ListItemText primary={<b>End:</b>} secondary={`${event.end_date} ${event.end_time}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><LocationOnIcon /></ListItemIcon>
                    <ListItemText primary={<b>Venue:</b>} secondary={event.venue} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary={<b>Capacity:</b>} secondary={event.capacity} />
                  </ListItem>
                </List>
                {/* Animated Progress Bar */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="primary" fontWeight={700} sx={{ mb: 1 }}>
                    {percentFilled}% seats filled
                  </Typography>
                  <LinearProgress variant="determinate" value={percentFilled} sx={{ height: 10, borderRadius: 5, background: '#ede7f6', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #512da8 60%, #b39ddb 100%)' } }} />
                </Box>
                {/* Participants Avatars */}
                {event.participants && event.participants.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>Participants:</Typography>
                    <Stack direction="row" spacing={-1}>
                      {event.participants.slice(0, 5).map((p, idx) => (
                        <Avatar key={idx} sx={{ width: 36, height: 36, border: '2px solid #fff', boxShadow: '0 2px 8px rgba(103,58,183,0.10)', bgcolor: '#ede7f6', color: '#512da8', fontWeight: 700 }}>{p[0]?.toUpperCase() || '?'}</Avatar>
                      ))}
                      {event.participants.length > 5 && (
                        <Badge badgeContent={`+${event.participants.length - 5}`} color="secondary" sx={{ '& .MuiBadge-badge': { right: -8, top: 8, fontWeight: 700, fontSize: 13, bgcolor: '#b39ddb', color: '#fff' } }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: '#b39ddb', color: '#fff', fontWeight: 700 }}>...</Avatar>
                        </Badge>
                      )}
                    </Stack>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              {/* Description card removed as per user request */}
            </Grid>
          </Grid>
        </motion.div>
      </Container>
      {/* Reviews Section */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 6 }}>
          <Reviews />
        </Box>
      </motion.div>

      {/* Sticky Action Bar - only for non-admin users */}
      {userRole !== 'admin' && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 1300, pointerEvents: 'none' }}
        >
          <Box
            sx={{
              maxWidth: 480,
              mx: 'auto',
              mb: { xs: 2, md: 4 },
              borderRadius: 6,
              boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.18)',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              py: 1.5,
              px: 2,
              pointerEvents: 'auto',
            }}
          >
            <Button
              variant={register.includes(event._id) ? 'contained' : 'outlined'}
              color={register.includes(event._id) ? 'success' : 'primary'}
              size="large"
              sx={{
                borderRadius: 4,
                fontWeight: 700,
                minWidth: 120,
                boxShadow: register.includes(event._id) ? '0 2px 8px 0 rgba(76, 175, 80, 0.12)' : 'none',
                textTransform: 'none',
                fontSize: 18,
              }}
              onClick={() => handleRegister(event._id)}
            >
              {register.includes(event._id) ? 'Unregister' : 'Register'}
            </Button>
            <Tooltip title={favorites.includes(event._id) ? 'Remove from favorites' : 'Add to favorites'}>
              <IconButton onClick={() => handleFav(event._id)} sx={{ bgcolor: 'rgba(255,255,255,0.95)', borderRadius: 99, boxShadow: '0 2px 8px 0 rgba(103, 58, 183, 0.10)', fontSize: 28 }}>
                {favorites.includes(event._id) ? <FavoriteIcon color="error" sx={{ fontSize: 32 }} /> : <FavoriteBorderIcon sx={{ fontSize: 32 }} />}
              </IconButton>
            </Tooltip>
            <Tooltip title={copied ? 'Link copied!' : 'Share event'}>
              <IconButton onClick={handleShare} sx={{ bgcolor: 'rgba(255,255,255,0.95)', borderRadius: 99, boxShadow: '0 2px 8px 0 rgba(103, 58, 183, 0.10)', fontSize: 28 }}>
                <ShareIcon color={copied ? 'success' : 'primary'} sx={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </motion.div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={alert} sx={{ width: "100%" }}>
          {copied ? "Event link copied to clipboard!" : message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
}
