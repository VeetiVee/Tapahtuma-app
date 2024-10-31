import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@mui/material";

const EventDetails = () => {
  const { eventId } = useParams();

  return (
    <div>
      <h1>Event Details</h1>
      <p>Details for event ID: {eventId}</p>

      {/* Link to Event-Specific Budget */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/events/${eventId}/budget`}
        style={{ marginRight: "10px" }}
      >
        View Budget
      </Button>

      {/* Link to Event-Specific To-Do List */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/events/${eventId}/todolist`}
      >
        View To-Do List
      </Button>
    </div>
  );
};

export default EventDetails;
