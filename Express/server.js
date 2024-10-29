const express = require('express');
const axios = require('axios'); // Import axios
const app = express();
const PORT = 3003;
app.use(express.json());

const updateHistory = async (oneRepMax, reps, weight) => {
    try {
        await axios.post('http://history:3002/api', {
            reps: reps,
            weight: weight,
            oneRM: oneRepMax,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error updating history:', error.response?.data || error.message);
        } else if (error instanceof Error) {
            console.error('Error updating history:', error.message);
        } else {
            console.error('Unknown error updating history.');
        }
    }
};

app.post('/api', (req, res) => {
    const { reps, weight } = req.body;

    if (reps == null || weight == null || isNaN(reps) || isNaN(weight)) {
        return res.status(400).send('Invalid or missing data');
    }

    const oneRepMax = weight * (1 + reps / 30);

    res.json({ oneRepMax: oneRepMax.toFixed(2) });
    updateHistory(oneRepMax, reps, weight);
    
});

app.listen(PORT, () => {
    console.log(`API is running on port ${PORT}`);
});
