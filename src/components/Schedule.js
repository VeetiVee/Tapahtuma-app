import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import {
  Grid2,
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Schedule() {
  const { eventId } = useParams();
  const [time, setTime] = useState("");
  const [job, setJob] = useState("");
  const [name, setName] = useState("");
  const [scheduleItems, setScheduleItems] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      const scheduleRef = collection(db, "schedules");
      const scheduleQuery = query(scheduleRef, where("eventId", "==", eventId));
      const scheduleSnapshot = await getDocs(scheduleQuery);
      const items = scheduleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setScheduleItems(items);
    };

    fetchScheduleData();
  }, [eventId]);

  const handleAddSchedule = async () => {
    if (time && job && name) {
      const newSchedule = {
        time,
        job,
        name,
        eventId,
      };
      const docRef = await addDoc(collection(db, "schedules"), newSchedule);
      setScheduleItems([...scheduleItems, { id: docRef.id, ...newSchedule }]);
      setTime("");
      setJob("");
      setName("");
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await deleteDoc(doc(db, "schedules", id));
      setScheduleItems(scheduleItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting schedule item:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Schedule
      </Typography>

      <Grid2 container spacing={4}>
        {/* Left Column - Adding Schedule Form */}
        <Grid2 xs={12} md={5}>
          <Box
            sx={{
              border: "1px solid #ccc",
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6">Add New</Typography>
            <TextField
              label="Time"
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Job"
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSchedule}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Add Schedule Item
            </Button>
          </Box>
        </Grid2>

        {/* Right Column - Display Schedule */}
        <Grid2 xs={12} md={7}>
          <Box
            sx={{
              border: "1px solid #ccc",
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Event Schedule
            </Typography>

            {/* Schedule Table */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Job</TableCell>
                  <TableCell>Person Responsible</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scheduleItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>{item.job}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteSchedule(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Schedule;
