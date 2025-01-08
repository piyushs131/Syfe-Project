import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", 
        padding: 5,
        paddingTop: "90px", 
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
            
          color: "#333",
          fontWeight: "bold",
          marginBottom: 1,
          textAlign: "center",
        }}
      >
        Personal Finance Manager
      </Typography>
      <Typography
        variant="h6" 
        gutterBottom
        sx={{
            paddingTop: "20px", 
            paddingBottom: "13px",

          color: "#555",
          marginBottom: 2, 
          textAlign: "center",
        }}
      >
        Manage your finances effectively and effortlessly.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link to="/transactions" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontSize: "0.8rem",
              padding: "6px 12px",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Transactions
          </Button>
        </Link>
        <Link to="/categories" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#388e3c",
              color: "#fff",
              fontSize: "0.8rem",
              padding: "6px 12px",
              "&:hover": {
                backgroundColor: "#2e7d32",
              },
            }}
          >
            Categories
          </Button>
        </Link>
        <Link to="/savings" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f57c00",
              color: "#fff",
              fontSize: "0.8rem",
              padding: "6px 12px",
              "&:hover": {
                backgroundColor: "#ef6c00",
              },
            }}
          >
            Savings
          </Button>
        </Link>
        <Link to="/reports" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d32f2f",
              color: "#fff",
              fontSize: "0.8rem",
              padding: "6px 12px",
              "&:hover": {
                backgroundColor: "#c62828",
              },
            }}
          >
            Reports
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Dashboard;