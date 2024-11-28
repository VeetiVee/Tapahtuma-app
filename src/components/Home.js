import React from "react";
import { Typography, Paper, Box, Button, Grid2 } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome to Tapis App!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Click the button to get started on making your own events.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Remember to check out tips to make sure you're not forgetting anything
          when planning your events!
        </Typography>

        <Grid2 container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid2 item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/events"
            >
              Start Creating Events
            </Button>
          </Grid2>
          <Grid2 item>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to="/tips"
            >
              View Tips
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Box>
  );
}

export default Home;
