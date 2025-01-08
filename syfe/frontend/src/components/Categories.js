import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const Categories = () => {
  const [categories, setCategories] = useState(["Food", "Rent", "Entertainment"]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Add a new category
  const addCategory = () => {
    if (!newCategory.trim()) {
      alert("Category name cannot be empty.");
      return;
    }
    if (categories.includes(newCategory.trim())) {
      alert("This category already exists.");
      return;
    }
    setCategories([...categories, newCategory.trim()]);
    setNewCategory("");
  };

  // Delete a category
  const deleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  // Open Edit Dialog
  const openEditDialog = (category, index) => {
    setEditCategory({ name: category, index });
    setIsEditDialogOpen(true);
  };

  // Handle Edit
  const handleEditCategory = () => {
    if (!editCategory.name.trim()) {
      alert("Category name cannot be empty.");
      return;
    }
    const updatedCategories = categories.map((cat, index) =>
      index === editCategory.index ? editCategory.name : cat
    );
    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    setEditCategory(null);
  };

  return (
    <Box mt={5} mx="auto" maxWidth="900px" px={3}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ color: "#005bb5", fontWeight: "bold" }}
      >
        Manage Categories
      </Typography>

      {/* Add New Category Section */}
      <Box
        mt={4}
        p={3}
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center" sx={{ fontWeight: "bold" }}>
          Add New Category
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2}>
          <TextField
            label="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            variant="outlined"
            sx={{
              width: "300px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addCategory}
            startIcon={<AddIcon />}
            sx={{
              padding: "8px 18px",
              backgroundColor: "#005bb5",
              "&:hover": {
                backgroundColor: "#004494",
              },
            }}
          >
            Add Category
          </Button>
        </Box>
      </Box>

      {/* List of Categories */}
      <Box mt={5}>
        <Grid container spacing={2}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", padding: "16px" }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#005bb5", fontWeight: "bold", fontSize: "18px" }}
                  >
                    {category}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", padding: "8px" }}>
                  <IconButton
                    onClick={() => openEditDialog(category, index)}
                    sx={{ color: "#005bb5" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteCategory(index)}
                    sx={{ color: "#e63946" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Edit Category Dialog */}
      {editCategory && (
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <TextField
              label="Category Name"
              fullWidth
              value={editCategory.name}
              onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsEditDialogOpen(false)}
              color="secondary"
              sx={{ textTransform: "capitalize" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditCategory}
              variant="contained"
              sx={{
                backgroundColor: "#005bb5",
                "&:hover": {
                  backgroundColor: "#004494",
                },
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Categories;