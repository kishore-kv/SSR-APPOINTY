import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ label, value, onChange, helperText, error, type = 'text', required = false, ...props }) => {
  const [topValue, setTopValue] = useState('-6px');

  const handleOnFocus = () => {
    setTopValue('0px');
  }
  
  const handleOnBlur = () => {
    setTopValue('-6px');
  }

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      helperText={helperText}
      error={error}
      type={type}
      fullWidth
      variant="outlined"
      required={required}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      sx={{
        '& .MuiInputLabel-root': {
            top: !!value ? '0px' : topValue,
          },
      }}
      {...props}  // Spread the rest of the props for further customization
    />
  );
};

export default Input;
