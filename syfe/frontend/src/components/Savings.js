import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  LinearProgress,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#005bb5",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#003f7d",
  },
}));

const Savings = ({ transactions = [] }) => {
  const [savingsGoal, setSavingsGoal] = useState({
    targetAmount: 0,
    targetDate: "",
    progress: 0,
    saved: 0,
  });
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    targetAmount: "",
    targetDate: "",
  });
  const [addAmount, setAddAmount] = useState("");

  useEffect(() => {
    if (savingsGoal.targetAmount > 0) {
      const progressPercentage = Math.min(
        (savingsGoal.saved / savingsGoal.targetAmount) * 100,
        100
      );
      setSavingsGoal((prev) => ({ ...prev, progress: progressPercentage }));
    }
  }, [savingsGoal.saved, savingsGoal.targetAmount]);

  const openGoalDialog = () => {
    setNewGoal({ targetAmount: "", targetDate: "" });
    setIsGoalDialogOpen(true);
  };

  const handleSetGoal = () => {
    if (!newGoal.targetAmount || !newGoal.targetDate) {
      alert("Please enter a target amount and a target date.");
      return;
    }

    setSavingsGoal({
      targetAmount: parseFloat(newGoal.targetAmount),
      targetDate: newGoal.targetDate,
      progress: 0,
      saved: 0,
    });

    setIsGoalDialogOpen(false);
  };

  const handleAddProgress = () => {
    const amountToAdd = parseFloat(addAmount);
    if (!amountToAdd || amountToAdd <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setSavingsGoal((prev) => ({
      ...prev,
      saved: prev.saved + amountToAdd,
    }));
    setAddAmount("");
  };

  return (
    <Box mt={5} mx="auto" maxWidth="800px" px={3}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ color: "#005bb5", fontWeight: "bold" }}
      >
        Savings Goals
      </Typography>

      {savingsGoal.targetAmount > 0 && (
        <Card
          sx={{
            mt: 4,
            p: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Current Goal
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              <strong>Goal:</strong> ₹{savingsGoal.targetAmount}
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              <strong>Target Date:</strong> {savingsGoal.targetDate}
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              <strong>Saved:</strong> ₹{savingsGoal.saved}
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              <strong>Progress:</strong> {savingsGoal.progress.toFixed(2)}%
            </Typography>
            <Box mt={2}>
              <LinearProgress
                variant="determinate"
                value={savingsGoal.progress}
                sx={{
                  height: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#005bb5",
                  },
                }}
              />
            </Box>
          </CardContent>

          {/* Add Progress Section */}
          <Box
            mt={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "15px",
            }}
          >
            <TextField
              label="Amount"
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              sx={{ width: "70%" }} // Ensures the input field takes up 70% width
            />
            <StyledButton onClick={handleAddProgress} sx={{ flexShrink: 0 }}>
              Update
            </StyledButton>
          </Box>
        </Card>
      )}

      <Box textAlign="center" mt={4}>
        <StyledButton onClick={openGoalDialog}>Set New Goal</StyledButton>
      </Box>

      <Dialog open={isGoalDialogOpen} onClose={() => setIsGoalDialogOpen(false)}>
        <DialogTitle>Set Savings Goal</DialogTitle>
        <DialogContent>
          <TextField
            label="Target Amount"
            type="number"
            fullWidth
            value={newGoal.targetAmount}
            onChange={(e) =>
              setNewGoal({ ...newGoal, targetAmount: e.target.value })
            }
            sx={{ my: 2 }}
          />
          <TextField
            label="Target Date"
            type="date"
            fullWidth
            value={newGoal.targetDate}
            onChange={(e) =>
              setNewGoal({ ...newGoal, targetDate: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            sx={{ my: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsGoalDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <StyledButton onClick={handleSetGoal}>Save Goal</StyledButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Savings;