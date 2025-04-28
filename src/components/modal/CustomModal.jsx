import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Checkbox, FormControlLabel  } from "@mui/material";

const CustomModal = ({ open, onClose, onSave, fields = [], data }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(data && Object.keys(data).length > 0){
      setFormData(data);
    }else{
    setFormData({loginAllowed:false}); 
    } 
    setErrors({});
  }, [data, open]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    console.log("target value ==",e.target.checked);
    if(type === "checkbox"){
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    }else{
    setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  const handleSubmit = () => {
    let newErrors = {};
    
    // Validate fields: Check if any field is empty
    fields.forEach((field) => {
      if (field.required && (formData[field.name]  === undefined || formData[field.name] === "")) {
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
          <div key={field.name} style={{ marginBottom: "16px" }}>
            {field.type === "checkbox" ? (
              <FormControlLabel
              control={
                <Checkbox
                  name={field.name}
                  checked={!!formData[field.name]}
                  onChange={handleChange}
                  />
              }
              label={field.label}
              />
            ) : (
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
            )}
            </div>
        ))}
        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;
