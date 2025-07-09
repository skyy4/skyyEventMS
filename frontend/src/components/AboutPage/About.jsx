import React from 'react';
import './Abouts.css'; 
import introImage from '../../asset/Event/10.jpg';
import introImage2 from '../../asset/Event/11.jpg'; 
import { useState, useEffect } from 'react';
import { Avatar, CircularProgress, Fade, Zoom, Paper, Container, Grid, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack, Typography, Button, TextField } from "@mui/material";
import logo from '../../asset/logoOriginal.png';
import { motion } from 'framer-motion';



export const About = () => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Set loading to false when component mounts
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },1000);
  }, []);  // Empty dependency array means this runs only once on mount

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
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Introduction Section */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 4, background: theme.palette.background.paper }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <motion.img
                src={introImage2}
                alt="Mission Image"
                style={{ width: '100%', borderRadius: 18, boxShadow: '0 4px 24px 0 rgba(110,198,255,0.18)' }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>Introduction</Typography>
              <Typography variant="body1" color="text.primary">
                Eventify is your go-to tool for planning and managing university events. From campus activities to student gatherings, our app makes it easy to organize, track, and execute events smoothly. With Eventify, you can handle everything in one place and ensure your events are a success.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Developer Section (with animated About/Details Card) */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, background: theme.palette.background.paper, textAlign: 'center' }}>
        <Fade in={true} timeout={1200}>
            <Typography variant="h4" fontWeight={700} color="secondary" sx={{ mb: 3, letterSpacing: 2, textShadow: '0 2px 12px rgba(110,198,255,0.18)' }}>
            The Developer
            </Typography>
        </Fade>
        <Zoom in={true} style={{ transitionDelay: '400ms' }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Box display="flex" flexDirection="column" alignItems="center" sx={{ background: 'rgba(255,255,255,0.7)', borderRadius: 4, boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.10)', p: 4, minWidth: 260 }}>
              <img src={logo} alt="Logo Placeholder" style={{ width: '120px', height: '120px', objectFit: 'contain', borderRadius: '50%', background: '#f3f3f3', padding: '12px', marginBottom: 18, boxShadow: '0 2px 12px rgba(110,198,255,0.12)' }} />
                  <Typography variant="h6" fontWeight={600} color="text.primary">Shashi Kumar Yadav</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>Developer</Typography>
                </Box>
              </motion.div>
            </Box>
        </Zoom>
        {/* Animated About/Details Card */}
        <RandomizedAnimatedDetailsCard />
        </Paper>
      </motion.div>
    </Container>
  );
};

// Helper for random color themes
const cardThemes = [
  {
    background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
    border: '2px solid #b39ddb',
    shadow: '0 4px 24px 0 rgba(103, 58, 183, 0.10)'
  },
  {
    background: 'linear-gradient(120deg, #fffbe7 60%, #ffe0e3 100%)',
    border: '2px solid #ffb6b9',
    shadow: '0 4px 24px 0 rgba(255, 182, 185, 0.10)'
  },
  {
    background: 'linear-gradient(120deg, #e0f7fa 60%, #b2ebf2 100%)',
    border: '2px solid #4dd0e1',
    shadow: '0 4px 24px 0 rgba(77, 208, 225, 0.10)'
  },
  {
    background: 'linear-gradient(120deg, #f3e8ff 60%, #ede7f6 100%)',
    border: '2px solid #b39ddb',
    shadow: '0 4px 24px 0 rgba(179, 157, 219, 0.10)'
  },
];

function getRandomTheme() {
  return cardThemes[Math.floor(Math.random() * cardThemes.length)];
}

const RandomizedAnimatedDetailsCard = () => {
  const [theme, setTheme] = useState(cardThemes[0]);
  useEffect(() => {
    setTheme(getRandomTheme());
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      whileHover={{ scale: 1.03, boxShadow: theme.shadow }}
      style={{ marginTop: 32, marginBottom: 8, display: 'flex', justifyContent: 'center' }}
    >
      <Box
        sx={{
          background: theme.background,
          border: theme.border,
          boxShadow: theme.shadow,
          borderRadius: 4,
          p: 4,
          minWidth: 260,
          maxWidth: 400,
          mx: 'auto',
          textAlign: 'left',
        }}
      >
        <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb: 2 }}>
          About Me
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <b>Address:</b> 221B Baker Street, Lucknow, UP, India
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <b>Email:</b> sky593499@gmail.com
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <b>Phone:</b> 98xxxxxx12
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <b>Bio:</b> Passionate about building beautiful web experiences. Loves React, Node.js, and all things tech. Always learning, always curious.
        </Typography>
      </Box>
    </motion.div>
  );
};
