import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { Container, Typography, TextField, Button, Box, Paper, Divider } from '@mui/material';
import parser from 'html-react-parser';

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
        model: 'text-curie-001',
        temperature: 0.5,
        max_tokens: 1000,
        stop: '.',
        n: 1,
      });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false);
  }

  return (
    <Container>
      <Box mx={35}>
        <Typography variant="h5" align='center' fontWeight='bold' sx={{
          mt: 10,
          mb: 3
        }}>Simple ChatGPT</Typography>
        <Paper elevation={3} sx={{
          p: 2
        }}>
          <TextField
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Input your question here...'
          />
          <Button
            onClick={handleClick}
            disabled={loading || prompt.length === 0}
            variant='contained'
            fullWidth
            sx={{
              my: 2
            }}
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </Paper>
        <Paper elevation={3} sx={{
          p: 2,
          my: 2
        }}>
          <Typography variant='body1' fontWeight='bold'>Answer</Typography>
          <Divider sx={{
            my: 2
          }} />
          <Typography variant='body2'>{result ? parser(result) : 'Ask anything'}</Typography>
        </Paper>
        <Typography variant='subtitle2' align='center'>Made with ❤️ by Jopanalv</Typography>
      </Box>
    </Container>
  );
}

export default App;
