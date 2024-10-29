import React, { useState } from 'react';
import axios from 'axios';
import './OneRepMaxEstimator.css'

const OneRepMaxEstimator: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [reps, setReps] = useState<number | ''>('');
  const [oneRepMax, setOneRepMax] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateOneRepMax = async () => {
    if (weight && reps) {
      try {
        const response = await axios.post('/api/onermcalculator', { reps, weight });
        console.log('Response:', response);

        const calculatedOneRepMax = Number(response.data.oneRepMax);
        setOneRepMax(calculatedOneRepMax);
        setError(null);
      } catch (err: unknown) {
        handleError(err);
      }
    } else {
      setError('Please enter valid values for weight and reps.');
    }
  };

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err) && err.response) {
      setError(err.response.data.message || 'Failed to calculate One Rep Max');
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unknown error occurred');
    }
  };

  return (
    <div className="one-rep-max-container">
      <h1 className="one-rep-max-title">One Rep Max Estimator</h1>

      <label htmlFor="weight" className="one-rep-max-label">How much weight did you lift?</label>
      <input 
        id="weight"
        type="number" 
        placeholder="Weight" 
        value={weight} 
        onChange={(e) => setWeight(Number(e.target.value))} 
        className="one-rep-max-input" 
      />

      <label htmlFor="reps" className="one-rep-max-label">How many reps did you perform?</label>
      <input 
        id="reps"
        type="number" 
        placeholder="Reps" 
        value={reps} 
        onChange={(e) => setReps(Number(e.target.value))} 
        className="one-rep-max-input" 
      />
      
      <button onClick={calculateOneRepMax} className="one-rep-max-button">Calculate</button>
      
      {oneRepMax !== null && <h2 className="one-rep-max-result">Your One Rep Max: {oneRepMax}</h2>}
      {error && <p className="one-rep-max-error">{error}</p>}
    </div>
  );
}

export default OneRepMaxEstimator;
