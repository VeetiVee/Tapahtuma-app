import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Tips() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 1,
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Tips
      </Typography>

      <Stack
        spacing={0}
        sx={{
          border: "1px solid #000",
        }}
      >
        <Accordion
          sx={{
            width: 1000,

            color: "#000", // Text color (black)
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  transition: "transform 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.2)", // Slightly enlarge the icon
                    color: "#0288d1", // Change icon color on hover
                  },
                }}
              />
            }
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Budget
          </AccordionSummary>
          <AccordionDetails>
            Remember to add every income and expense.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ width: 1000 }}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  transition: "transform 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.2)", // Slightly enlarge the icon
                    color: "#0288d1", // Change icon color on hover
                  },
                }}
              />
            }
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Schedule
          </AccordionSummary>
          <AccordionDetails>
            Remember to make the schedule exact.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ width: 1000 }}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  transition: "transform 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.2)", // Slightly enlarge the icon
                    color: "#0288d1", // Change icon color on hover
                  },
                }}
              />
            }
            aria-controls="panel3-content"
            id="panel3-header"
          >
            To-do list
          </AccordionSummary>
          <AccordionDetails>
            Add everything to to-do list so you don't forget anything!
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
}

export default Tips;
