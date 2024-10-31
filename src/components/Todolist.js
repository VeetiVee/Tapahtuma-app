import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { Button } from "@mui/material";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

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
      const newItem = { text: inputValue, eventId }; // Create the new item object
      const docRef = await addDoc(collection(db, "items"), newItem); // Add it to Firestore
      setListItems([...listItems, { id: docRef.id, ...newItem }]);
      setInputValue("");
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id)); // Delete document from Firestore
    setListItems(listItems.filter((item) => item.id !== id)); // Update local state
  };

  return (
    <div>
      <h1>Todolist:</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <Button variant="outlined" onClick={addItem}>
        Add
      </Button>
      <ul>
        {listItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => deleteItem(item.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;
