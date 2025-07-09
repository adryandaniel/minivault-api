const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const LOG_FILE = path.join(__dirname, 'logs', 'log.json');
const logsDir = path.dirname(LOG_FILE);

fs.mkdirSync(logsDir, { recursive: true });
if (!fs.existsSync(LOG_FILE)) fs.writeFileSync(LOG_FILE, '[]', 'utf-8');

app.use(express.json());
app.use(morgan('dev'));

app.post('/generate', (req, res) => {
  const { prompt } = req.body || {};
  if (typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing string "prompt"' });
  }

  // ► Stubbed response logic
  const response = `🏷️ Echo: ${prompt}`;

  // ► Log interaction
  const entry = { timestamp: new Date().toISOString(), prompt, response };
  const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  logs.push(entry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));

  res.json({ response });
});

app.use((_, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`🚀 MiniVault API listening on http://localhost:${PORT}`);
});
