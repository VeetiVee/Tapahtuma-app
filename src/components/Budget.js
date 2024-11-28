import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Typography,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid2,
} from "@mui/material";
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
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function Budget() {
  const { eventId } = useParams();
  const [incomeValue, setIncomeValue] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

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
  const netBudget = totalIncome - totalExpense;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Budget Overview
      </Typography>

      <Grid2 container spacing={4}>
        <Grid2 xs={12} md={5}>
          <Box
            sx={{
              border: "1px solid #ccc",
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6">Expenses</Typography>
            <TextField
              label="Expense Name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Expense Amount (€)"
              type="number"
              value={expenseValue}
              onChange={(e) => setExpenseValue(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addExpense}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Add Expense
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Amount (€)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expense.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => deleteExpense(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography variant="h6">
              Total Expenses: {totalExpense}€
            </Typography>
          </Box>
        </Grid2>
        <Grid2 xs={12} md={5}>
          <Box
            sx={{
              border: "1px solid #ccc",
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6">Income</Typography>
            <TextField
              label="Income Name"
              value={incomeName}
              onChange={(e) => setIncomeName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Income Amount (€)"
              type="number"
              value={incomeValue}
              onChange={(e) => setIncomeValue(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addIncome}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Add Income
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Amount (€)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {income.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => deleteIncome(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography variant="h6">Total Income: {totalIncome}€</Typography>
          </Box>
        </Grid2>
      </Grid2>
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h5">Net Budget: {netBudget}€</Typography>
      </Box>
    </Box>
  );
}

export default Budget;
