import React from 'react';
import { TextField } from '@mui/material';

// OutputBox component
function OutputBox({ text }) {
  return (
    <TextField
      label="Summarized Text"
      variant="outlined"
      multiline
      rows={10}
      value={text}
      InputProps={{
        readOnly: true,
      }}
      style={{ width: '45%' }}
    />
  );
}

export default OutputBox;
