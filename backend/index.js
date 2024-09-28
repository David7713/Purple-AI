const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GOOGLE_AI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

app.post("/completions", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      contents: [
        {
          parts: [
            { text: message }
          ]
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const generatedText = response.data.candidates[0].content.parts[0].text;
    const timestamp = new Date().toISOString();

    res.json({
      response: generatedText,
      timestamp
    });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});