import React, { useState, useEffect } from "react";
import NewEvent from "./NewEvent";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signInAnonymously } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Myevents = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
          await fetchUserEvents(user.uid);
        } else {
          await signInAnonymously(auth);
        }
      });
    };
    authenticate();
  }, []);
  console.log(process.env.REACT_APP_API_KEY);
  const fetchUserEvents = async (uid) => {
    try {
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      const userEvents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(userEvents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const newEvent = async (newEvent) => {
    if (user) {
      const eventRef = await addDoc(collection(db, "events"), {
        uid: user.uid,
        name: newEvent.name,
        timestamp: new Date(),
      });
      setEvents([...events, { id: eventRef.id, name: newEvent.name }]);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, "events", eventId));
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        My Events
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : events.length === 0 ? (
        <Typography variant="body1">
          No events yet. Add a new event below!
        </Typography>
      ) : (
        <List sx={{ width: "100%", maxWidth: 400 }}>
          {events.map((event) => (
            <ListItem key={event.id} divider>
              <ListItemText primary={event.name} />
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to={`/events/${event.id}`}
              >
                View Details
              </Button>
              <IconButton
                edge="end"
                color="error"
                onClick={() => deleteEvent(event.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <NewEvent newEvent={newEvent} />
    </Box>
  );
};

export default Myevents;
