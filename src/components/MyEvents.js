import React, { useState, useEffect } from "react";
import NewEvent from "./NewEvent";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Myevents = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await fetchUserEvents(user.uid); // Fetch events for the signed-in user
      } else {
        setUser(null);
        setEvents([]); // Clear events if no user is signed in
      }
    });
  }, []);

  // Fetch events from Firestore for a specific user
  const fetchUserEvents = async (uid) => {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    const userEvents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEvents(userEvents);
  };

  // Add a new event to Firestore for the current user
  const newEvent = async (newEvent) => {
    if (user) {
      const eventRef = await addDoc(collection(db, "events"), {
        uid: user.uid, // Associate event with the user's UID
        name: newEvent.name,
        timestamp: new Date(),
      });
      setEvents([...events, { id: eventRef.id, name: newEvent.name }]);
    }
  };

  // Delete an event from Firestore and update state
  const deleteEvent = async (eventId) => {
    try {
      await deleteDoc(doc(db, "events", eventId));
      setEvents(events.filter((event) => event.id !== eventId)); // Update the state
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <h1>My events</h1>
      {events.length === 0 ? (
        <p>No events yet</p>
      ) : (
        events.map((event) => (
          <div key={event.id} style={{ marginBottom: "10px" }}>
            <Button
              key={event.id}
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
              onClick={() => console.log(`Event clicked: ${event.name}`)}
              component={Link}
              to={`/events/${event.id}`}
            >
              {event.name}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => deleteEvent(event.id)}
            >
              Delete
            </Button>
          </div>
        ))
      )}
      <NewEvent newEvent={newEvent} />
    </div>
  );
};

export default Myevents;
