import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";

function Todolist() {
  const [listItems, setListItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { eventId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "items"), where("eventId", "==", eventId));
      const querySnapshot = await getDocs(q);
      setListItems(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchData();
  }, [eventId]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addItem = async () => {
    if (inputValue.trim()) {
      const newItem = { text: inputValue, eventId, done: false };
      const docRef = await addDoc(collection(db, "items"), newItem);
      setListItems([...listItems, { id: docRef.id, ...newItem }]);
      setInputValue("");
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
    setListItems(listItems.filter((item) => item.id !== id));
  };

  const toggleDone = async (item) => {
    const updatedItem = { ...item, done: !item.done };
    await updateDoc(doc(db, "items", item.id), updatedItem);
    setListItems(
      listItems.map((listItem) =>
        listItem.id === item.id ? updatedItem : listItem
      )
    );
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        To-do List
      </Typography>
      <Box
        component={Paper}
        sx={{
          padding: 2,
          marginBottom: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Add New Task"
          value={inputValue}
          onChange={handleInputChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addItem}>
          Add
        </Button>
      </Box>
      <List>
        {listItems.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  color={item.done ? "primary" : "default"}
                  onClick={() => toggleDone(item)}
                >
                  {item.done ? <UndoIcon /> : <DoneIcon />}
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => deleteItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={item.text}
              sx={{
                textDecoration: item.done ? "line-through" : "none",
                color: item.done ? "gray" : "inherit",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Todolist;
