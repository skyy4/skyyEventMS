import { Grid, Box, Typography, IconButton, Link, Paper } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import '../App.css'

export const Footer = () => {
  const theme = useTheme();
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ width: '100%' }}
    >
      <Paper
        elevation={6}
        sx={{
      width: '100%',
          background: 'linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 64,
      display: 'flex',
      alignItems: 'center',
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
      boxShadow: '0 -4px 24px 0 rgba(103, 58, 183, 0.10)',
          mt: 8,
          p: 0,
        }}
      >
        <Box
          sx={{
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        height: 64,
        position: 'relative',
        background: 'rgba(30, 34, 44, 0.45)',
        boxShadow: '0 2px 12px rgba(30,34,44,0.08)',
          }}
        >
          <Box
            sx={{
          display: 'inline-flex',
          alignItems: 'center',
          animation: 'marquee 12s linear infinite',
              px: 4,
            }}
          >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#fff', letterSpacing: 1.5, mx: 2, fontFamily: 'Poppins, Roboto, Arial, sans-serif' }}>
            Eventify &nbsp;|&nbsp; Skyy, Lucknow, India
          </Typography>
            <IconButton href="https://github.com/" target="_blank" rel="noopener" sx={{ color: '#fff', mx: 1, '&:hover': { color: theme.palette.primary.light, background: 'rgba(255,255,255,0.10)' } }}>
            <GitHubIcon fontSize="medium" />
          </IconButton>
            <IconButton href="https://instagram.com/" target="_blank" rel="noopener" sx={{ color: '#fff', mx: 1, '&:hover': { color: theme.palette.secondary.main, background: 'rgba(255,255,255,0.10)' } }}>
            <InstagramIcon fontSize="medium" />
          </IconButton>
            <IconButton href="https://linkedin.com/" target="_blank" rel="noopener" sx={{ color: '#fff', mx: 1, '&:hover': { color: theme.palette.primary.light, background: 'rgba(255,255,255,0.10)' } }}>
            <LinkedInIcon fontSize="medium" />
          </IconButton>
          </Box>
        </Box>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
      </Paper>
    </motion.footer>
  );
};
