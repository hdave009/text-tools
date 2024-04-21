import React, { useState } from 'react';
import { Container, Grid, Typography, Button, CircularProgress } from '@mui/material';
import InputBox from './InputBox';
import OutputBox from './OutputBox';
import { styled } from '@mui/system';
import axios from 'axios';

const MainContainer = styled(Container)({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',  // Align items to the start of the container
  backgroundColor: "#003366",
  color: 'white',
  textAlign: 'center',
  padding: '20px',
});

function TextSummarizer() {
  const [text, setText] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handleSummarize = async () => {
    setIsLoading(true);  // Start loading
    try {
      // Correctly sending a POST request
      const response = await axios.post('http://127.0.0.1:8080/api/summary', { text }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSummarizedText(response.data.text);  // Assume 'text' is the correct key from the response
    } catch (error) {
      console.error("There was an error summarizing the text:", error);
    }
    setIsLoading(false);  // Stop loading regardless of the result
  };

  return (
    <MainContainer maxWidth="xl"> {/* 'xl' for more space */}
      <Typography variant="h1" gutterBottom fontFamily="courier" sx={{ mt: 2, color: 'white' }}>
        Text Summarizer
      </Typography>

      {isLoading ? (
        <CircularProgress sx={{ display: 'block', marginRight: 'auto', marginLeft: 'auto', mb: 4 }} />
      ) : (
        <Button
          variant="contained"
          onClick={handleSummarize}
          sx={{ display: 'block', marginRight: 'auto', marginLeft: 'auto', maxWidth: '200px', mb: 4 }}
        >
          Summarize
        </Button>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <InputBox text={text} onTextChange={handleTextChange} disabled={isLoading}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <OutputBox text={summarizedText} />
        </Grid>
      </Grid>
    </MainContainer>
  );
}

export default TextSummarizer;
