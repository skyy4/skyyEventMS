import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Popper,
  Grow,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Paper,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../asset/logoOriginal.png";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { motion } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(103, 58, 183, 0.85)',
  boxShadow: '0 3px 24px 0 rgba(103, 58, 183, 0.18)',
  backdropFilter: 'blur(12px)',
  borderBottom: '3px solid #a259ff',
  minHeight: 90,
  height: 100,
  display: 'flex',
  justifyContent: 'center',
}));

const StyledToolbar = styled(Toolbar)({
  // display: "flex",
  // justifyContent: "space-between",
});

const LogoTypography = styled(Typography)({
  "& img": {
    width: "80px",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
});

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  margin: theme.spacing(0, 1),
  fontWeight: 600,
  fontFamily: 'Poppins, Roboto, Arial, sans-serif',
  fontSize: '1.08rem',
  borderRadius: 14,
  background: 'linear-gradient(90deg, #ff6f61 0%, #6ec6ff 100%)',
  boxShadow: '0 2px 8px 0 rgba(103, 58, 183, 0.10)',
  textTransform: 'none',
  letterSpacing: 1,
  transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
  '&:hover': {
    background: 'linear-gradient(90deg, #6ec6ff 0%, #ff6f61 100%)',
    color: '#fff',
    transform: 'translateY(-2px) scale(1.07)',
    boxShadow: '0 4px 16px 0 rgba(103, 58, 183, 0.18)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const StyledMenuList = styled(MenuList)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const NavBar = ({ logout, userId, userRole, token }) => {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const apiUrl = import.meta.env.VITE_API_URL;
    if (user && user.token) {
      axios
        .get(`${apiUrl}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setUserName(`${res.data.username}`);
        })
        .catch((err) => {
          console.log("Error fetching user name:", err);
        });
    } else {
      console.log("User not logged in or invalid access token");
    }
  }, [userId]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab" || event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });
    logout();
    handleClose();
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 0,
              minWidth: 160,
              pl: 2,
              pr: 4,
            }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box
                sx={{
                  borderRadius: '50%',
                  boxShadow: '0 0 0 5px #a259ff, 0 0 24px 4px #a259ff',
                  p: 0.5,
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1,
                }}
              >
                <img
                  src={logo}
                  style={{ width: 70, height: 70, objectFit: 'contain', display: 'block' }}
                  alt="Logo"
                />
              </Box>
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1, fontFamily: 'Poppins, Roboto, Arial, sans-serif', ml: 1, display: { xs: 'none', md: 'block' }, textShadow: '0 2px 12px #a259ff' }}>
                Eventify
              </Typography>
              </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 50,
            }}
          >
            {[
              { to: '/', label: 'Home', icon: <HomeRoundedIcon /> },
              { to: '/event', label: 'Events', icon: <EventAvailableRoundedIcon /> },
              { to: '/about', label: 'About', icon: <InfoRoundedIcon /> },
              { to: '/contact', label: 'Contact Me', icon: <ContactMailIcon /> },
            ].map((item) => {
              const isActive = location.pathname === item.to || (item.to === '/event' && location.pathname.startsWith('/event'));
              return (
                <motion.div
                  key={item.to}
                  whileHover={{ scale: 1.08, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  style={{ display: 'inline-block' }}
                >
                  <NavButton
                    component={Link}
                    to={item.to}
                    startIcon={item.icon}
                    sx={{
                      position: 'relative',
                      background: isActive ? 'linear-gradient(90deg, #6ec6ff 0%, #ff6f61 100%)' : 'linear-gradient(90deg, #ff6f61 0%, #6ec6ff 100%)',
                      color: '#fff',
                      boxShadow: isActive ? '0 4px 16px 0 rgba(110,198,255,0.18)' : '0 2px 8px 0 rgba(103, 58, 183, 0.10)',
                      '&:after': {
                        content: '""',
                        display: isActive ? 'block' : 'none',
                        position: 'absolute',
                        left: 12,
                        right: 12,
                        bottom: -6,
                        height: 4,
                        borderRadius: 2,
                        background: 'linear-gradient(90deg, #6ec6ff 0%, #ff6f61 100%)',
                        boxShadow: '0 2px 12px rgba(110,198,255,0.18)',
                      },
                    }}
                  >
                    <Typography variant="body1">{item.label}</Typography>
            </NavButton>
                </motion.div>
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "right",
              alignItems: "center",
              flexGrow: 0,
            }}
          >
            {userId ? (
              <>
                <Typography variant="body1" sx={{ color: "white" }}>
                  {" "}
                  Welcome, {userName}
                </Typography>
                <Tooltip title={userId ? "Profile" : "Login"}>
                  <StyledIconButton ref={anchorRef} onClick={handleToggle}>
                    <AccountCircleIcon sx={{ width: 45, height: 45 }} />
                  </StyledIconButton>
                </Tooltip>

                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-end"
                  transition
                  disablePortal={false}
                  sx={{ zIndex: 1302 }}
                >
                  {({ TransitionProps, placement }) => (
                    <>
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom-end"
                              ? "right top"
                              : "right bottom",
                        }}
                      >
                        <Paper elevation={3} sx={{ minWidth: 180 }}>
                          <ClickAwayListener onClickAway={handleClose}>
                            <StyledMenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              <StyledMenuItem
                                component={Link}
                                to="/dashboard"
                                onClick={handleClose}
                                divider
                              >
                                <ListItemIcon>
                                  <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                              </StyledMenuItem>
                              <StyledMenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                  <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                              </StyledMenuItem>
                            </StyledMenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    </>
                  )}
                </Popper>
              </>
            ) : (
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  bgcolor: "#173a75",
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};
