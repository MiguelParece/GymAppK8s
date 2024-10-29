const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/exercises", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err));

const exerciseSchema = new mongoose.Schema({
    name: String,
    reps: Number,
    weight: Number
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

app.get('/api', async (req, res) => {
    const exercises = await Exercise.find();
    res.json(exercises);
});

app.post('/api', async (req, res) => {
    const { name, reps, weight } = req.body;
    const newExercise = new Exercise({ name, reps, weight });
    await newExercise.save();
    res.status(201).send('Exercise added');
});

app.delete('/api/:id', async (req, res) => {
    await Exercise.findByIdAndDelete(req.params.id);
    res.status(200).send('Exercise deleted');
});

app.listen(3001, () => {
    console.log('Gym Exercises API is running on port 8082');
});

