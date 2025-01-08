const express = require("express");
const fs = require("fs");

const router = express.Router();
const categoriesFile = "./data/categories.json";

// Get all categories
router.get("/", (req, res) => {
  const categories = JSON.parse(fs.readFileSync(categoriesFile));
  res.json(categories);
});

// Add a category
router.post("/", (req, res) => {
  const categories = JSON.parse(fs.readFileSync(categoriesFile));
  const newCategory = { id: categories.length + 1, ...req.body };
  categories.push(newCategory);
  fs.writeFileSync(categoriesFile, JSON.stringify(categories));
  res.status(201).json(newCategory);
});

// Delete a category
router.delete("/:id", (req, res) => {
  const categories = JSON.parse(fs.readFileSync(categoriesFile));
  const updatedCategories = categories.filter((c) => c.id !== parseInt(req.params.id));
  fs.writeFileSync(categoriesFile, JSON.stringify(updatedCategories));
  res.status(204).send();
});

module.exports = router;