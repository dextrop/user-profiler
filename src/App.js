import './App.css';
import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import MicIcon from '@mui/icons-material/Mic';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SpeechToText from './speechtotext';
import ProfileUser from './openaihandler';

const App = () => {
  const [text, setText] = useState("");
  const [micColor, setMicColor] = useState('success');
  const [micState, setMicState] = useState(false);
  const [response, setResponse] = useState("");
  const speechToTextLib = new SpeechToText();

  const toggleRecording = () => {
    micState ? stopRecording() : startRecording();
  };

  const startRecording = (previousText = "") => {
    setMicState(true);
    setMicColor("error");
    speechToTextLib.start(previousText, result => {      
      setText(result);
      startRecording(result);
    });
  };

  const stopRecording = async () => {
    console.log("Stop Recording");
    setMicState(false);
    setMicColor("success");
    speechToTextLib.stop();
    try {
      ProfileUser(text, (response) => {
        try {
          setResponse(response.choices[0].message.content)
        } catch(e) {
          alert("Unable to obtain Result from OpenAI", e)
        }
        console.log()
      });    
    } catch (e) {
      console.error("Unable to obtain result from OpenAI", e);
    }
  };

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <pre>{response}</pre>
        </Grid>
        <Grid item xs={10}>
          <h3>Tell us about your contribution at your previous company</h3>
          <TextField
            fullWidth
            id="filled-multiline-static"
            placeholder="Record or type your industry experience"
            multiline
            rows={4}
            value={text}
            variant="filled"
          />
        </Grid>
        <Grid item xs={2} style={{ lineHeight: '12vh' }}>
          <br />
          <Fab color={micColor} aria-label="add" onClick={toggleRecording}>
            <MicIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
