import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const EventDetails = () => {
  const { eventId } = useParams();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 250,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Event Details
      </Typography>

      {/* Link to Event-Specific Budget */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/events/${eventId}/budget`}
        sx={{ mb: 2, width: "200px" }}
      >
        Budget
      </Button>

      {/* Link to Event-Specific To-Do List */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/events/${eventId}/todolist`}
        sx={{ mb: 2, width: "200px" }}
      >
        To-Do List
      </Button>

      {/* Link to Event-Specific Schedule */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/events/${eventId}/schedule`}
        sx={{ width: "200px" }}
      >
        Schedule
      </Button>
    </Box>
  );
};

export default EventDetails;
