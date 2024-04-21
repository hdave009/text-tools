import React from 'react';
import { TextField } from '@mui/material';

function InputBox({ text, onTextChange, disabled }) {
  return (
    <TextField
      sx={{ width: '100%', background: 'white', border: 'none', boxShadow: 1 }}
      fullWidth
      label="Enter Text"
      variant="outlined"
      multiline
      rows={10}
      value={text}
      onChange={(e) => onTextChange(e.target.value)}
      disabled={disabled}
    />
  );
}

export default InputBox;
