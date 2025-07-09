import * as React from "react";
import { Stack, Typography, Button, TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import ButtonBaseDemo from "./Category";
import MediaCard from "./Card";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Avatar, CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import echop from '../asset/poster/echop.jpg';
import rangrezp from '../asset/poster/rangrezp.jpg';
import masterchefp from '../asset/poster/masterchefp.jpg';
import abhivyaktip from '../asset/poster/abhivyaktip.jpg';
import shutterp from '../asset/poster/shutterp.jpg';
import kavyap from '../asset/poster/kavyap.jpg';
import dancep from '../asset/poster/dancep.jpg';
import photoboothp from '../asset/poster/photoboothp.jpg';


export const Home = ({ token }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Rotating banner state
  const bannerMessages = [
    'Tickets will be out soon!',
    'Early booking discount!',
    'Don’t miss the headline event!',
    'Limited seats available!',
    'Free goodies for first 50!'
  ];
  const [bannerIdx, setBannerIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIdx((prev) => (prev + 1) % bannerMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const posters = [
    { src: echop, alt: "Echo Poster" },
    { src: rangrezp, alt: "Rangrez Poster" },
    { src: masterchefp, alt: "Masterchef Poster" },
    { src: abhivyaktip, alt: "Abhivyakti Poster" },
    { src: shutterp, alt: "Shutter Poster" },
    { src: kavyap, alt: "Kavya Poster" },
    { src: dancep, alt: "Dance Poster" },
    { src: photoboothp, alt: "Photobooth Poster" },
  ];

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
    <>
      {/* Main continuous background */}
      <div style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(120deg, #ede7f6 0%, #e3f2fd 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Hero Section with wider overlay and simplified, larger animation */}
      <div style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(120deg, #ede7f6 0%, #e3f2fd 100%)',
      }}>
        {/* Animated background gradient (subtle) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 70% 30%, #b39ddb33 0%, transparent 70%), radial-gradient(circle at 20% 80%, #90caf933 0%, transparent 70%)',
            animation: 'moveBg 10s linear infinite alternate',
          }}
        />
        {/* Glassmorphism overlay for main text (wider) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            zIndex: 2,
            padding: '64px 40px',
            borderRadius: '32px',
            background: 'rgba(255,255,255,0.7)',
            boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.10)',
            backdropFilter: 'blur(8px)',
            maxWidth: 900,
            width: '100%',
            textAlign: 'center',
            margin: '0 16px',
          }}
        >
          {/* Single, large, simple animated paper plane */}
          <motion.svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 24 }}>
            <motion.path
              d="M20 80 Q 110 10, 200 80"
              stroke="#512da8"
              strokeDasharray="10 10"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
            />
            {/* Large plane */}
            <motion.polygon
              points="20,80 40,90 20,100 28,90"
              fill="#fff"
              stroke="#512da8"
              strokeWidth="2.5"
              initial={{ x: 0, y: 0 }}
              animate={{ x: [0, 160], y: [0, -18, 0, 18, 0] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              style={{ filter: 'drop-shadow(0 2px 8px #b39ddb88)' }}
            />
          </motion.svg>
          <motion.h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              margin: 0,
              color: '#222',
              letterSpacing: '-2px',
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Effortless <br />
            <span style={{
              background: 'linear-gradient(45deg, #673ab7, #3f51b5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
            }}>
              Event Planning for Every Occasion.
            </span>
          </motion.h1>
          <motion.p
            style={{
              fontSize: '1.3rem',
              color: '#333',
              margin: '24px 0 0 0',
              fontWeight: 500,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Plan it. Hype it. Rock it.<br />
            <span style={{ color: '#512da8', fontWeight: 600 }}>
              Eventify: Where campus events go from “meh” to “memorable.”
            </span>
          </motion.p>
          {/* CTA Button */}
          <motion.div
            style={{ marginTop: 36, display: 'flex', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: '0 0 16px #7b1fa2' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '16px 36px',
                fontSize: '1.2rem',
                fontWeight: 700,
                borderRadius: 30,
                border: 'none',
                background: 'linear-gradient(45deg, #ff8a65 30%, #ff5252 90%)',
                color: '#fff',
                boxShadow: '0 4px 24px 0 rgba(255, 82, 82, 0.10)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onClick={() => window.location.href = '/create-event'}
            >
              CREATE YOUR OWN EVENT
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

        {/* Wavy Divider */}
        <div style={{ width: '100%', margin: '-24px auto 0 auto', zIndex: 2, position: 'relative' }}>
          <svg viewBox="0 0 1440 64" width="100%" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32 Q 360 64 720 32 T 1440 32 V64 H0 V32Z" fill="#fff" />
          </svg>
        </div>

      {/* Rotating Banner above Upcoming Events */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 8,
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={bannerIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              minWidth: 260,
              maxWidth: 420,
              padding: '10px 32px',
              borderRadius: 18,
              background: 'linear-gradient(90deg, #ede7f6 60%, #b39ddb 100%)',
              boxShadow: '0 2px 12px 0 rgba(103, 58, 183, 0.10)',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#512da8',
              textAlign: 'center',
              letterSpacing: 0.2,
              textShadow: '0 2px 8px #ede7f6',
              backdropFilter: 'blur(4px)',
              border: '1.5px solid #b39ddb',
              margin: '0 auto',
              zIndex: 3,
              position: 'relative',
            }}
          >
            {bannerMessages[bannerIdx]}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* UPCOMING EVENTS Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginTop: 24, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}
      >
        <div className="art-div" style={{ marginRight: 16 }}></div>
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          letterSpacing: '-1px',
          color: '#512da8',
          margin: 0,
          textAlign: 'center',
          textShadow: '0 2px 12px rgba(103,58,183,0.08)'
        }}>
          UPCOMING EVENTS
        </h2>
      </motion.div>

      {/* Card Panel for Upcoming Events */}
      <div style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.08)',
        padding: '24px 12px',
        maxWidth: 1100,
        margin: '0 auto',
        marginBottom: 24,
        position: 'relative',
      }}>
        {/* Aesthetic Description */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <div style={{
            maxWidth: 600,
            width: '100%',
            padding: '16px 24px',
            borderRadius: 18,
            background: 'rgba(245,245,255,0.7)',
            boxShadow: '0 2px 12px 0 rgba(103, 58, 183, 0.06)',
            backdropFilter: 'blur(6px)',
            fontSize: '1.18rem',
            color: '#4a148c',
            fontWeight: 700,
            textAlign: 'center',
            letterSpacing: 0.1,
            lineHeight: 1.6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontWeight: 700, fontSize: '1.18rem', color: '#512da8' }}>
              Swipe right for epic events!
            </span>
          </div>
        </div>
        {/* Horizontal Scroll Posters with Snap and Gradient Fade */}
        <div style={{
          position: 'relative',
        }}>
          {/* Left Gradient Overlay */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 40,
            zIndex: 2,
            pointerEvents: 'none',
            background: 'linear-gradient(90deg, #fff 60%, rgba(255,255,255,0) 100%)',
          }} />
          {/* Right Gradient Overlay */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 40,
            zIndex: 2,
            pointerEvents: 'none',
            background: 'linear-gradient(270deg, #fff 60%, rgba(255,255,255,0) 100%)',
          }} />
          <div className="image-section-upcoming" style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            gap: 24,
            paddingBottom: 8,
            scrollbarWidth: 'thin',
            scrollbarColor: '#7b1fa2 #ede7f6',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            cursor: 'grab',
            minWidth: 960,
          }}>
            {posters.map((poster, idx) => (
              <div
                className="image-section-img"
                key={poster.alt}
                style={{
                  minWidth: 220,
                  maxWidth: 240,
                  flex: '0 0 auto',
                  scrollSnapAlign: 'start',
                  transition: 'transform 0.2s',
                }}
              >
                <img src={poster.src} alt={poster.alt} />
              </div>
            ))}
          </div>
          {/* Custom Scrollbar for Webkit Browsers */}
          <style>{`
            .image-section-upcoming::-webkit-scrollbar {
              height: 8px;
            }
            .image-section-upcoming::-webkit-scrollbar-thumb {
              background: #b39ddb;
              border-radius: 4px;
            }
            .image-section-upcoming::-webkit-scrollbar-track {
              background: #ede7f6;
              border-radius: 4px;
            }
          `}</style>
        </div>
      </div>

      {/* Wavy Divider */}
        <div style={{ width: '100%', margin: '-24px auto 0 auto', zIndex: 2, position: 'relative' }}>
          <svg viewBox="0 0 1440 64" width="100%" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32 Q 360 0 720 32 T 1440 32 V64 H0 V32Z" fill="#ede7f6" />
        </svg>
      </div>

      {/* EVENTS BY CATEGORIES Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
          style={{ marginTop: 24, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}
      >
        <div className="art-div" style={{ marginRight: 16 }}></div>
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          letterSpacing: '-1px',
          color: '#512da8',
          margin: 0,
          textAlign: 'center',
          textShadow: '0 2px 12px rgba(103,58,183,0.08)'
        }}>
          EVENTS BY CATEGORIES
        </h2>
      </motion.div>

      {/* Card Panel for Categories */}
      <div style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.08)',
        padding: '24px 12px',
        maxWidth: 1100,
        margin: '0 auto',
        marginBottom: 24,
      }}>
        <div className="categories-component">
          <ButtonBaseDemo />
        </div>
      </div>

      {/* Wavy Divider */}
        <div style={{ width: '100%', margin: '-24px auto 0 auto', zIndex: 2, position: 'relative' }}>
          <svg viewBox="0 0 1440 64" width="100%" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32 Q 360 64 720 32 T 1440 32 V64 H0 V32Z" fill="#fff" />
        </svg>
      </div>

      {/* TOP EVENTS Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ marginTop: 24, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}
      >
        <div className="art-div" style={{ marginRight: 16 }}></div>
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          letterSpacing: '-1px',
          color: '#512da8',
          margin: 0,
          textAlign: 'center',
          textShadow: '0 2px 12px rgba(103,58,183,0.08)'
        }}>
          TOP EVENTS
        </h2>
      </motion.div>

      {/* Card Panel for Top Events */}
      <div style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.08)',
        padding: '24px 12px',
        maxWidth: 1100,
        margin: '0 auto',
        marginBottom: 24,
      }}>
        <div className="card-component">
          <MediaCard />
        </div>
      </div>

        {/* Wavy Divider */}
        <div style={{ width: '100%', margin: '-24px auto 0 auto', zIndex: 2, position: 'relative' }}>
          <svg viewBox="0 0 1440 64" width="100%" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32 Q 360 0 720 32 T 1440 32 V64 H0 V32Z" fill="#ede7f6" />
          </svg>
        </div>

        {/* Share Experience Section */}
      <div className="Banner-div">
        <Box
          className="box-meetOurTeam"
          sx={{
            display: "flex",
              flexDirection: { xs: 'column', md: 'row' },
              width: '100%',
              maxWidth: 1000,
              minHeight: 220,
            justifyContent: "center",
            alignItems: "center",
              position: 'relative',
              overflow: 'hidden',
            backgroundImage:
              "url(/src/asset/abstract-contour-green-background_1032986-186909.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              boxShadow: '0 8px 32px 0 rgba(103, 58, 183, 0.10)',
              borderRadius: 6,
              mx: 'auto',
              my: 6,
              p: { xs: 3, md: 6 },
            }}
          >
            {/* Gradient overlay for vibrancy */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(120deg, rgba(103,58,183,0.18) 0%, rgba(255,255,255,0.18) 100%)',
                zIndex: 1,
                pointerEvents: 'none',
                borderRadius: 6,
                backdropFilter: 'blur(6px)',
              }}
            />
            {/* Glassmorphism card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                background: 'rgba(255,255,255,0.75)',
                borderRadius: 24,
                boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.10)',
                padding: '32px 40px',
                maxWidth: 520,
                width: '100%',
                marginRight: 32,
                marginBottom: 0,
            }}
          >
              <Typography variant="h4" sx={{ color: '#512da8', fontWeight: 900, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <span role="img" aria-label="share">💬</span> Share experiences with Us
            </Typography>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 500, mb: 3 }}>
                Your experiences are valuable to us! Let's create a meaningful connection together.
            </Typography>
          <Button
                variant="contained"
            sx={{
              bgcolor: "#b39ddb",
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  boxShadow: '0 2px 12px 0 rgba(103, 58, 183, 0.10)',
                  textTransform: 'none',
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: "#ede7f6",
                    color: '#512da8',
                    boxShadow: '0 4px 24px 0 rgba(103, 58, 183, 0.18)',
                  },
                }}
                endIcon={<span role="img" aria-label="rocket">🚀</span>}
                onClick={() => navigate('/contact')}
          >
                Share Now
          </Button>
            </motion.div>
        </Box>
        </div>
      </div>
    </>
  );
};

// export default Home;
