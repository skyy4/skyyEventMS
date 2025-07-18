import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { jwtDecode } from "jwt-decode";

export default function FormDialogDelete({ size = "medium" }) {
  const { eventId } = useParams();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success"); // Set default severity
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState([]);

  console.log(user);
  const user_id = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user_id) {
      const jsonString = JSON.stringify(user_id);
      const jwtToken = jwtDecode(jsonString);
      // console.log(jwtToken);
      setUserId(jwtToken._id); // This will trigger the second useEffect
    }
  }, [user_id]);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL;
          const response = await axios.get(
            `${apiUrl}/api/getUserById/${userId}`
          );
          let userData = response.data;
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch the user:", error);
          setError("Failed to fetch the user");
        }
      };

      fetchUser();
    }
  }, [userId]);

  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        // Attempt to delete the event
        await axios.delete(
          `${apiUrl}/api/event/deleteEvent/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setAlertMessage("Event deleted successfully!");
        setAlertSeverity("success");
        setSnackbarOpen(true);

        try {
          //remove the event from all users
          const apiUrl = import.meta.env.VITE_API_URL;
          const response = await axios.post(
            `${apiUrl}/api/user/remove-event/${eventId}`,
            {}, 
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
        
          if (response.status === 200) {
            console.log("Event removed from all users:", response.data.message);
            
            setTimeout(() => {
              navigate("/event", { replace: true });
            }, 2000);
          } else {
            
            setAlertMessage(
              "Event deletion succeeded but failed to remove from users."
            );
            setAlertSeverity("warning");
            setSnackbarOpen(true);
          }
        } catch (error) {
          setAlertMessage("Failed to remove event from users.");
          setAlertSeverity("error");
          setSnackbarOpen(true);
          console.error(
            "Failed to remove event from users:",
            error.response ? error.response.data.message : error.message
          );
        }
        
      } catch (error) {
        setAlertMessage("Failed to delete the event.");
        setAlertSeverity("error");
        setSnackbarOpen(true);
        console.error(
          "Failed to delete the event:",
          error.response ? error.response.data.message : error.message
        );
      }
    } else {
      console.log("User not logged in or invalid access token");
    }
  };

  console.log(eventId);

  // const removeEventFromAllUsers = async (eventId) => {

  // };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false); // Close the snackbar
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="error"
          size={size}
          sx={{
            width: size === 'small' ? 120 : "500px",
            minWidth: size === 'small' ? 0 : undefined,
            height: size === 'small' ? 32 : 55,
            fontSize: size === 'small' ? '0.85rem' : undefined,
            px: size === 'small' ? 1.5 : undefined,
            py: size === 'small' ? 0.5 : undefined,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onClick={handleClickOpen}
        >
          Delete this event
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Delete the event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you delete an account, there is no going back. Please be
            certain.
          </DialogContentText>
          <DialogContentText variant="body2" color="error" m="2">
            "All your data will be permanently erased, and it cannot be
            recovered."
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleClose} size={size} sx={{ minWidth: size === 'small' ? 60 : undefined, fontSize: size === 'small' ? '0.85rem' : undefined }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            type="submit"
            size={size}
            sx={{ minWidth: size === 'small' ? 60 : undefined, fontSize: size === 'small' ? '0.85rem' : undefined }}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
