import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { Container, Typography, TextField, Button } from '@mui/material';

function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        prompt: prompt,
        model: 'text-davinci-003',
        temperature: 0.5,
        max_tokens: 100
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false);
  }

  return (
    <Container>
      <Typography variant="h1">OpenAI Demo</Typography>
      <TextField
        multiline
        maxRows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button 
        onClick={handleClick}
        disabled={loading || prompt.length === 0}
      >
        {loading ? 'Loading...' : 'Generate'}
      </Button>
      <Typography variant="h2">Result</Typography>
      <Typography variant="body1">{result}</Typography>
    </Container>
  );
}

export default App;
