import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  TextField,
  Button,
  Box,
  Typography,
  Slider,
  Autocomplete,
} from "@mui/material";
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";
import axios from "axios";

function isNullOrEmpty(str) {
  return !str || str.trim() === "";
}

function getWordCount(str) {
  return str.split(" ").filter(function (n) {
    return n != "";
  }).length;
}

async function getSummaryModels() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8080/api/summary_models"
    );
    return response.data;
  } catch (error) {
    console.error(
      "There was an error in getting all the summary models.",
      error
    );
  }
}

// Main TextSummarizer component
function TextSummarizer() {
  const [text, setText] = useState("");
  const [summarizedText, setSummarizedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [summaryModels, setSummaryModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    (async () => {
      const models = await getSummaryModels();
      if (models && models.length > 0) {
        setSummaryModels(models);
        setSelectedModel(models[0].id);
      }
    })();
  }, []);

  const summarizeText = async () => {
    setIsLoading(true);
    if (!isNullOrEmpty(text)) {
      let text_len = getWordCount(text);
      let summary_len_error = 0.1 * text_len;
      let min_len = Math.round(sliderValue * text_len - summary_len_error);
      let max_len = Math.round(sliderValue * text_len + summary_len_error);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8080/api/summary",
          { text, min_len, max_len, model:selectedModel },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setSummarizedText(response.data.text); // Assume 'text' is the correct key from the response
      } catch (error) {
        console.error("There was an error summarizing the text:", error);
      }
    } else {
      setSummarizedText("");
    }
    setIsLoading(false); // Stop loading regardless of the result
  };

  return (
    <Box style={{ padding: "20px", width: "100vw", boxSizing: "border-box" }}>
      <Box style={{ marginBottom: "20px", textAlign: "center" }}>
        <Typography variant="h3">Text Summarizer</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="flex-start"
        width="100%"
      >
        <InputBox
          disabled={isLoading}
          value={text}
          onChange={handleTextChange}
          style={{ flexGrow: 1, marginRight: "10px" }}
        />
        <OutputBox
          text={summarizedText}
          style={{ flexGrow: 1, marginLeft: "10px" }}
        />
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Typography id="input-slider" gutterBottom>
          Summary Length: {Math.round(sliderValue * 100)}%
        </Typography>
        <Slider
          value={typeof sliderValue === "number" ? sliderValue : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          min={0}
          max={1}
          step={0.01}
          style={{ width: "300px", margin: "0 10px" }}
          disabled={isLoading}
        />
      </Box>

      <Box display="flex" justifyContent="center" marginTop="20px">
        <Autocomplete
          disabled={isLoading}
          disablePortal
          id="combo-box-demo"
          options={summaryModels.map((model) => model.id)}
          value={selectedModel} // controlled state
          onChange={(event, newValue) => {
            setSelectedModel(newValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Summarization Model" />
          )}
        />
      </Box>

      <Box display="flex" justifyContent="center" marginTop="20px">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <SummarizeButton onClick={summarizeText} />
        )}
      </Box>
    </Box>
  );
}

// SummarizeButton component
function SummarizeButton({ onClick }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      SUMMARIZE
    </Button>
  );
}

export default TextSummarizer;
