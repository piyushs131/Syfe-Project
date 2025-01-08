import React from "react";
import { Box, Typography } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Reports = ({ transactions }) => {
  // Dummy data for transactions (if not provided)
  const dummyTransactions = [
    { category: "Food", amount: 2000, type: "expense" },
    { category: "Rent", amount: 5000, type: "expense" },
    { category: "Entertainment", amount: 1000, type: "expense" },
    { category: "Salary", amount: 15000, type: "income" },
    { category: "Freelancing", amount: 5000, type: "income" },
  ];

  const data = transactions || dummyTransactions;

  // Aggregate data for reports
  const expenseCategories = data.filter((t) => t.type === "expense");
  const incomeCategories = data.filter((t) => t.type === "income");

  const totalExpenses = expenseCategories.reduce((acc, item) => acc + item.amount, 0);
  const totalIncome = incomeCategories.reduce((acc, item) => acc + item.amount, 0);
  const savings = totalIncome - totalExpenses;

  // Pie Chart Data
  const pieData = {
    labels: expenseCategories.map((item) => item.category),
    datasets: [
      {
        label: "Expenses",
        data: expenseCategories.map((item) => item.amount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  // Bar Chart Data
  const barData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpenses, savings],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
      },
    ],
  };

  return (
    <Box mt={5} mx="auto" maxWidth="800px" px={3}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ color: "#005bb5", fontWeight: "bold" }}
      >
        Spending Reports
      </Typography>

      {/* Pie Chart */}
      <Box mt={4} textAlign="center">
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          Category-Wise Expenses (Pie Chart)
        </Typography>
        <Pie data={pieData} width={400} height={400} />
      </Box>

      {/* Bar Chart */}
      <Box mt={4} textAlign="center">
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          Income vs Expenses vs Savings (Bar Chart)
        </Typography>
        <Bar data={barData} width={400} height={400} />
      </Box>

      {/* Summary */}
      <Box mt={5} textAlign="center">
        <Typography variant="h6" sx={{ color: "#555" }}>
          <strong>Total Income:</strong> ₹{totalIncome}
        </Typography>
        <Typography variant="h6" sx={{ color: "#555" }}>
          <strong>Total Expenses:</strong> ₹{totalExpenses}
        </Typography>
        <Typography variant="h6" sx={{ color: "#555" }}>
          <strong>Total Savings:</strong> ₹{savings}
        </Typography>
      </Box>
    </Box>
  );
};

export default Reports;