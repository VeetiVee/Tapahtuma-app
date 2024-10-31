import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function NewEvent(props) {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState({
    id: "",
    eventName: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.newEvent({ id: event.id, name: event.eventName });
    handleClose();
  };

  const inputChanged = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <TextField
            name="eventName"
            brand={event.eventName}
            onChange={inputChanged}
            margin="dense"
            id="name"
            label="Event name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewEvent;
