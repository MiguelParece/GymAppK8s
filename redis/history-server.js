const express = require('express');
const { createClient } = require('redis');
const app = express();
const PORT = 3002;

const client = createClient({
  socket: {
    host: 'redis', // Ensure this host is correct based on your setup (e.g., Docker)
    port: 6379,
  },
});

client.connect()
  .then(() => {
    console.log('Connected to Redis successfully!');
  })
  .catch((err) => {
    console.error('Failed to connect to Redis:', err);
    process.exit(1);
  });

app.use(express.json());

app.post('/api', async (req, res) => {
  const { reps, weight, oneRM } = req.body;
  if (typeof reps !== 'number' || typeof weight !== 'number' || typeof oneRM !== 'number') {
    return res.status(400).json({ error: 'reps, weight, and oneRM must be numbers' });
  }

  const date = new Date().toISOString();
  const exerciseData = { oneRM, reps, weight, date };12

  console.log('Saving exercise data to Redis:', exerciseData);

  try {
    await client.lPush('exerciseData', JSON.stringify(exerciseData));
    res.json({ status: 'Success', message: 'Exercise data saved successfully.', data: exerciseData });
  } catch (err) {
    console.error('Error saving to Redis:', err);
    res.status(500).json({ error: 'Error saving to Redis' });
  }
});

app.get('/api', async (req, res) => {
  try {
    const history = await client.lRange('exerciseData', 0, -1);
    res.json({ history });
  } catch (err) {
    console.error('Error retrieving from Redis:', err);
    res.status(500).json({ error: 'Error retrieving from Redis' });
  }
});

app.get('/health', (req, res) => res.send('OK'));

app.listen(PORT, () => {
  console.log(`History service running on port ${PORT}`);
});
