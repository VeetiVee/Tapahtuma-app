import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function Tips() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        borderRadius: 1,
      }}
    >
      <Stack spacing={0}>
        <Accordion
          sx={{
            width: 1000,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Budjetti
          </AccordionSummary>
          <AccordionDetails>
            Muista lisätä budjettiin kaikki tarvitta.......
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            width: 1000,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Aikataulu
          </AccordionSummary>
          <AccordionDetails>
            AIKATAULU LOL XDDOKSADKOSAKDOSA.......
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            width: 1000,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Todolist
          </AccordionSummary>
          <AccordionDetails>
            lisöää kaikki jutut todolistiin :D.......
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
}

export default Tips;
