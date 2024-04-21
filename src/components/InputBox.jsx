import React from 'react';
import { TextField } from '@mui/material';

// InputBox component
function InputBox({ disabled, value, onChange }) {
  return (
    <TextField
      disabled={disabled}
      label="Enter Text"
      variant="outlined"
      multiline
      rows={10}
      value={value}
      onChange={onChange}
      style={{ width: '45%' }}
    />
  );
}


export default InputBox;
