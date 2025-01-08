const express = require("express");
const fs = require("fs");

const router = express.Router();
const transactionsFile = "./data/transactions.json";

// Get all transactions
router.get("/", (req, res) => {
  const transactions = JSON.parse(fs.readFileSync(transactionsFile));
  res.json(transactions);
});

// Add a transaction
router.post("/", (req, res) => {
  const transactions = JSON.parse(fs.readFileSync(transactionsFile));
  const newTransaction = { id: transactions.length + 1, ...req.body };
  transactions.push(newTransaction);
  fs.writeFileSync(transactionsFile, JSON.stringify(transactions));
  res.status(201).json(newTransaction);
});

// Update a transaction
router.put("/:id", (req, res) => {
  const transactions = JSON.parse(fs.readFileSync(transactionsFile));
  const transactionIndex = transactions.findIndex((t) => t.id === parseInt(req.params.id));
  if (transactionIndex === -1) return res.status(404).json({ message: "Transaction not found" });

  transactions[transactionIndex] = { ...transactions[transactionIndex], ...req.body };
  fs.writeFileSync(transactionsFile, JSON.stringify(transactions));
  res.json(transactions[transactionIndex]);
});

// Delete a transaction
router.delete("/:id", (req, res) => {
  const transactions = JSON.parse(fs.readFileSync(transactionsFile));
  const updatedTransactions = transactions.filter((t) => t.id !== parseInt(req.params.id));
  fs.writeFileSync(transactionsFile, JSON.stringify(updatedTransactions));
  res.status(204).send();
});

module.exports = router;