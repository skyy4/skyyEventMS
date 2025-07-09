import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import ContactForm from './contactForm';
import './Contact.css';
import image from '../../asset/contactImage2.jpg';
import { useState, useEffect } from 'react';
import { Avatar, CircularProgress } from "@mui/material";
import { motion } from 'framer-motion';
import RoomIcon from '@mui/icons-material/Room';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

export const Contact = () => {
  const [loading, setLoading] = useState(false);

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
    <Container className="contact-container">
      <Typography variant="h4" component="h1" className="contact-title" sx={{ fontWeight: 900, mb: 1, letterSpacing: 1 }}>
        Get in touch
      </Typography>
      <Typography variant="body1" className="contact-subtitle" sx={{ mb: 3, color: '#7b1fa2', fontWeight: 500 }}>
        Want to get in touch? We'd love to hear from you. Here's how you can reach us... (We don't bite, promise!)
      </Typography>
      <Box className="circle-image-container" sx={{ mb: 3 }}>
        <motion.img
          src={image}
          alt="Contact Us"
          className="circle-image"
          initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          style={{ border: '6px dashed #b39ddb', background: '#fff', padding: 8 }}
        />
      </Box>
      <Grid container spacing={4} className="contact-grid" sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'stretch' }}>
        <Grid item xs={12} md={4}>
          <motion.div
            whileHover={{ scale: 1.07, rotate: -2 }}
            whileTap={{ scale: 0.97, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Box className={`contact-box talk-to-team`} sx={{ background: 'linear-gradient(135deg, #f3e8ff 60%, #ede7f6 100%)', borderRadius: 4, boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.10)', p: 3, textAlign: 'center', minWidth: 0, maxWidth: 360, mx: 'auto', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
              <EmojiPeopleIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight={700}>
                Talk to Team
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 16 }}>
                Want to chat? Our team is friendlier than your neighbor's dog!
              </Typography>
              <Typography variant="h6" className="contact-number" sx={{ mt: 1, fontWeight: 700, letterSpacing: 1 }}>
                98xxxxxx12
              </Typography>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div
            whileHover={{ scale: 1.07, rotate: 2 }}
            whileTap={{ scale: 0.97, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Box className={`contact-box contact-support`} sx={{ background: 'linear-gradient(120deg, #e0f7fa 60%, #b2ebf2 100%)', borderRadius: 4, boxShadow: '0 4px 24px 0 rgba(77, 208, 225, 0.10)', p: 3, textAlign: 'center', minWidth: 0, maxWidth: 360, mx: 'auto', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
              <SupportAgentIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight={700}>
                Customer Support
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 16 }}>
                Stuck? Our support team is faster than your morning chai!
              </Typography>
              <Typography variant="h6" className="contact-email" sx={{ mt: 1, fontWeight: 700, letterSpacing: 1 }}>
                sky593499@gmail.com
              </Typography>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div
            whileHover={{ scale: 1.07, rotate: -3 }}
            whileTap={{ scale: 0.97, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Box className={`contact-box visit-us`} sx={{ background: 'linear-gradient(120deg, #fffbe7 60%, #ffe0e3 100%)', borderRadius: 4, boxShadow: '0 4px 24px 0 rgba(255, 182, 185, 0.10)', p: 3, textAlign: 'center', minWidth: 0, maxWidth: 360, mx: 'auto', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
              <RoomIcon color="error" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" gutterBottom fontWeight={700}>
                Visit Us
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 16 }}>
                Drop by for chai & code! (We have samosas too)
              </Typography>
              <Typography variant="h6" className="contact-address" sx={{ mt: 1, fontWeight: 700, letterSpacing: 1 }}>
                221B Baker Street, Lucknow, UP, India
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
      <Box className="contact-form-container" sx={{ mt: 5 }}>
        <ContactForm />
      </Box>
    </Container>
  );
};
