const express = require("express");
const fs = require("fs");

const router = express.Router();
const savingsFile = "./data/savings.json";

// Get savings goal
router.get("/", (req, res) => {
  const savings = JSON.parse(fs.readFileSync(savingsFile));
  res.json(savings);
});

// Update savings progress
router.put("/:id", (req, res) => {
  const savings = JSON.parse(fs.readFileSync(savingsFile));
  const savingsIndex = savings.findIndex((s) => s.id === parseInt(req.params.id));
  if (savingsIndex === -1) return res.status(404).json({ message: "Savings goal not found" });

  savings[savingsIndex] = { ...savings[savingsIndex], ...req.body };
  fs.writeFileSync(savingsFile, JSON.stringify(savings));
  res.json(savings[savingsIndex]);
});

module.exports = router;