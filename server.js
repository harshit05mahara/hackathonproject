import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import getGeminiResponse from './gemini.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const { imageDesc } = req.body;
  try {
    const result = await runGeminiAnalysis(imageDesc);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Analysis failed' });
  }
});


app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
