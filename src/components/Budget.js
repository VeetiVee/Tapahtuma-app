import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useParams } from "react-router-dom"; // To get eventId from URL

function Budget() {
  const { eventId } = useParams(); // Gets eventId from the route
  const [incomeValue, setIncomeValue] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  // Fetch income and expenses for the specific eventId from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const incomeQuery = query(
        collection(db, "income"),
        where("eventId", "==", eventId)
      );
      const expenseQuery = query(
        collection(db, "expenses"),
        where("eventId", "==", eventId)
      );

      const incomeSnapshot = await getDocs(incomeQuery);
      const expenseSnapshot = await getDocs(expenseQuery);

      setIncome(
        incomeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setExpense(
        expenseSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchData();
  }, [eventId]);

  // Input handlers
  const handleIncomeNameChange = (e) => setIncomeName(e.target.value);
  const handleIncomeChange = (e) => setIncomeValue(e.target.value);
  const handleExpenseNameChange = (e) => setExpenseName(e.target.value);
  const handleExpenseChange = (e) => setExpenseValue(e.target.value);

  // Add new income item to Firebase with eventId
  const addIncome = async () => {
    if (incomeValue && incomeName) {
      const newIncome = {
        name: incomeName,
        amount: parseFloat(incomeValue),
        eventId,
      };
      await addDoc(collection(db, "income"), newIncome);
      setIncome([...income, newIncome]);
      setIncomeName("");
      setIncomeValue("");
    }
  };

  // Add new expense item to Firebase with eventId
  const addExpense = async () => {
    if (expenseValue && expenseName) {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseValue),
        eventId,
      };
      await addDoc(collection(db, "expenses"), newExpense);
      setExpense([...expense, newExpense]);
      setExpenseName("");
      setExpenseValue("");
    }
  };

  const deleteIncome = async (id) => {
    await deleteDoc(doc(db, "income", id));
    setIncome(income.filter((item) => item.id !== id));
  };

  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
    setExpense(expense.filter((item) => item.id !== id));
  };

  const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = expense.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div>
      <h1>Budget for Event {eventId}:</h1>

      {/* Income Section */}
      <h2>Income</h2>
      <input
        type="text"
        placeholder="Income name"
        value={incomeName}
        onChange={handleIncomeNameChange}
      />
      <input
        type="number"
        placeholder="Income amount"
        value={incomeValue}
        onChange={handleIncomeChange}
      />
      <Button variant="outlined" onClick={addIncome}>
        Add Income
      </Button>
      <ul>
        {income.map((item, index) => (
          <li key={index}>
            {item.name}: {item.amount}€{" "}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => deleteIncome(item.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <h3>Total Income: {totalIncome}€</h3>

      {/* Expense Section */}
      <h2>Expenses</h2>
      <input
        type="text"
        placeholder="Expense name"
        value={expenseName}
        onChange={handleExpenseNameChange}
      />
      <input
        type="number"
        placeholder="Expense amount"
        value={expenseValue}
        onChange={handleExpenseChange}
      />
      <Button variant="outlined" onClick={addExpense}>
        Add Expense
      </Button>
      <ul>
        {expense.map((item, index) => (
          <li key={index}>
            {item.name}: {item.amount}€
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => deleteExpense(item.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <h3>Total Expenses: {totalExpense}€</h3>

      {/* Net Budget Calculation */}
      <div>
        <h2>Net Budget: {totalIncome - totalExpense}€</h2>
      </div>
    </div>
  );
}

export default Budget;
