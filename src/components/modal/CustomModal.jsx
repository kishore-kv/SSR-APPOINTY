import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const CustomModal = ({ open, onClose, onSave, fields = [], data }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(data || {}); // Ensure it's always an object
    setErrors({}); // Reset errors when modal opens
  }, [data, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  const handleSubmit = () => {
    let newErrors = {};
    
    // Validate fields: Check if any field is empty
    fields.forEach((field) => {
      if (!formData[field.name] || formData[field.name].trim() === "") {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors and prevent form submission
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, bgcolor: "white", mx: "auto", mt: 10, width: 400 }}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors[field.name]} // Show error state
            helperText={errors[field.name]} // Show error message
          />
        ))}
        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;
