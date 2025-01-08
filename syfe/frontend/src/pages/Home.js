import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3" gutterBottom>
        Personal Finance Manager
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Track your income, expenses, and savings goals efficiently.
      </Typography>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" size="large" sx={{ m: 2 }}>
          Login
        </Button>
      </Link>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button variant="outlined" color="secondary" size="large" sx={{ m: 2 }}>
          Register
        </Button>
      </Link>
    </Box>
  );
};

export default Home;