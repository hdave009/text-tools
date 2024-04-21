import React from 'react';
import { TextField } from '@mui/material';

function OutputBox({ text }) {
  return (
    <TextField
      sx={{ width: '100%', background: 'white', border: 'none', boxShadow: 1 }}
      fullWidth
      label="Summarized Text"
      variant="outlined"
      multiline
      rows={10}
      value={text}
      InputProps={{
        readOnly: true,
      }}
    />
  );
}

export default OutputBox;
