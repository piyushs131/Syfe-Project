import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
  backgroundColor: "#ffffff",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0078ff",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#005bb5",
  },
  padding: "10px 20px",
  borderRadius: "8px",
}));

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, amount: 500, date: "2023-12-01", category: "Food", description: "Grocery shopping" },
    { id: 2, amount: 1000, date: "2023-12-05", category: "Rent", description: "Monthly rent" },
  ]);
  const [newTransaction, setNewTransaction] = useState({ amount: "", date: "", category: "", description: "" });
  const [editTransaction, setEditTransaction] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.date || !newTransaction.category || !newTransaction.description) {
      alert("All fields are required.");
      return;
    }
    setTransactions([...transactions, { id: Date.now(), ...newTransaction }]);
    setNewTransaction({ amount: "", date: "", category: "", description: "" });
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  const openEditDialog = (transaction) => {
    setEditTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  const handleEditTransaction = () => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === editTransaction.id ? editTransaction : transaction
    );
    setTransactions(updatedTransactions);
    setIsEditDialogOpen(false);
    setEditTransaction(null);
  };

  return (
    <Box mt={5} mx="auto" maxWidth="900px" px={3}>
      <Typography variant="h3" gutterBottom textAlign="center" sx={{ color: "#005bb5", fontWeight: "bold" }}>
        Manage Your Transactions
      </Typography>

      {/* Add New Transaction Section */}
      <Box
        mt={4}
        p={4}
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center" sx={{ fontWeight: "bold" }}>
          Add New Transaction
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              variant="outlined"
              sx={{ borderRadius: "12px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ borderRadius: "12px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Category"
              fullWidth
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              variant="outlined"
              sx={{ borderRadius: "12px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Description"
              fullWidth
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              variant="outlined"
              sx={{ borderRadius: "12px" }}
            />
          </Grid>
        </Grid>
        <Box textAlign="center" mt={2}>
          <StyledButton onClick={addTransaction} startIcon={<AddIcon />}>
            Add Transaction
          </StyledButton>
        </Box>
      </Box>

      {/* List of Transactions */}
      <Box mt={5}>
        <Grid container spacing={3}>
          {transactions.map((transaction) => (
            <Grid item xs={12} sm={6} md={4} key={transaction.id}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#0078ff", fontWeight: "bold" }}>
                    ₹{transaction.amount} - {transaction.category}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {transaction.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#777", fontStyle: "italic" }}>
                    {transaction.date}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton color="primary" onClick={() => openEditDialog(transaction)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteTransaction(transaction.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Edit Transaction Dialog */}
      {editTransaction && (
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogContent>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={editTransaction.amount}
              onChange={(e) => setEditTransaction({ ...editTransaction, amount: e.target.value })}
              sx={{ my: 1 }}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={editTransaction.date}
              onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })}
              sx={{ my: 1 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Category"
              fullWidth
              value={editTransaction.category}
              onChange={(e) => setEditTransaction({ ...editTransaction, category: e.target.value })}
              sx={{ my: 1 }}
            />
            <TextField
              label="Description"
              fullWidth
              value={editTransaction.description}
              onChange={(e) => setEditTransaction({ ...editTransaction, description: e.target.value })}
              sx={{ my: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <StyledButton onClick={handleEditTransaction}>Save Changes</StyledButton>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Transactions;