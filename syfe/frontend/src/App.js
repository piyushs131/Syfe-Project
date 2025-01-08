import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Categories from "./components/Categories";
import Savings from "./components/Savings";
import Reports from "./components/Reports";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Simulated authentication check using localStorage
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <div>
        {/* Navigation bar */}
        <nav
          style={{
            padding: "10px",
            backgroundColor: "#005bb5",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {isAuthenticated() && (
              <>
                <a
                  href="/dashboard"
                  style={{
                    margin: "0 15px",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </a>
                <a
                  href="/transactions"
                  style={{
                    margin: "0 15px",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Transactions
                </a>
                <a
                  href="/categories"
                  style={{
                    margin: "0 15px",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Categories
                </a>
                <a
                  href="/savings"
                  style={{
                    margin: "0 15px",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Savings
                </a>
                <a
                  href="/reports"
                  style={{
                    margin: "0 15px",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Reports
                </a>
              </>
            )}
          </div>
          <div>
            {!isAuthenticated() && (
              <>
                <Link
                  to="/login"
                  style={{
                    margin: "0 15px",
                    color: "#fff",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    margin: "0 15px",
                    color: "#fff",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Register
                </Link>
              </>
            )}
            {isAuthenticated() && (
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "15px",
                  padding: "5px 10px",
                  backgroundColor: "#e63946",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* App Routes */}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />
            }
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/transactions"
            element={<ProtectedRoute element={<Transactions />} />}
          />
          <Route
            path="/categories"
            element={<ProtectedRoute element={<Categories />} />}
          />
          <Route
            path="/savings"
            element={<ProtectedRoute element={<Savings />} />}
          />
          <Route
            path="/reports"
            element={<ProtectedRoute element={<Reports />} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;