const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_jwt_secret_key"; // Replace with a strong secret in production

// Middleware
app.use(cors());
app.use(express.json());

// File paths for data storage
const usersFile = "./data/users.json";
const transactionsFile = "./data/transactions.json";
const goalsFile = "./data/goals.json";

// Ensure data files exist
const ensureFileExists = (filePath, defaultData = "[]") => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultData);
  }
};

ensureFileExists(usersFile);
ensureFileExists(transactionsFile);
ensureFileExists(goalsFile);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user;
    next();
  });
};

// Routes

// Login route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Register route
app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));

    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);

    fs.writeFileSync(usersFile, JSON.stringify(users));

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get transactions
app.get("/api/transactions", authenticateToken, (req, res) => {
  try {
    const transactions = JSON.parse(fs.readFileSync(transactionsFile, "utf8"));
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Add a transaction
app.post("/api/transactions", authenticateToken, (req, res) => {
  const { amount, description, date, category } = req.body;

  if (!amount || !description || !date || !category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const transactions = JSON.parse(fs.readFileSync(transactionsFile, "utf8"));
    const newTransaction = {
      id: transactions.length + 1,
      amount,
      description,
      date,
      category,
    };
    transactions.push(newTransaction);

    fs.writeFileSync(transactionsFile, JSON.stringify(transactions));
    res.status(201).json({ message: "Transaction added successfully." });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get savings goal
app.get("/api/goals", authenticateToken, (req, res) => {
  try {
    const goals = JSON.parse(fs.readFileSync(goalsFile, "utf8"));
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Set savings goal
app.post("/api/goals", authenticateToken, (req, res) => {
  const { targetAmount, targetDate } = req.body;

  if (!targetAmount || !targetDate) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const goals = JSON.parse(fs.readFileSync(goalsFile, "utf8"));
    const newGoal = { targetAmount, targetDate };
    fs.writeFileSync(goalsFile, JSON.stringify(newGoal));

    res.status(201).json({ message: "Savings goal set successfully." });
  } catch (error) {
    console.error("Error setting goal:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
