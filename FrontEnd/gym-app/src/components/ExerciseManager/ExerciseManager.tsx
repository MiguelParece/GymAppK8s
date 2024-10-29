import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExerciseMager.css'
// Define the exercise structure
interface Exercise {
  _id: string;
  name: string;
  reps: number;
  weight: number;
}

const ExerciseManager: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false); // State to show/hide the popup
  const [name, setName] = useState<string>('');
  const [reps, setReps] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');

  // Fetch exercises from the API
  const fetchExercises = async () => {
    try {
      const response = await axios.get<Exercise[]>('/api/exercises');
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises', error);
    }
  };

  // Add a new exercise via the popup
  const addExercise = async () => {
    if (name && reps !== '' && weight !== '') {
      try {
        await axios.post('/api/exercises', { name, reps, weight });
        fetchExercises();
        setShowPopup(false);
        setName('');
        setReps('');
        setWeight('');
      } catch (error) {
        console.error('Error adding exercise', error);
      }
    }
  };

  // Delete an exercise
  const deleteExercise = async (id: string) => {
    try {
      await axios.delete(`/api/exercises/${id}`);
      fetchExercises();
    } catch (error) {
      console.error('Error deleting exercise', error);
    }
  };

  // Fetch exercises on component load
  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div className="exercise-manager-container">
      <h1>Exercise Manager</h1>
      
      {/* Add Exercise Button */}
      <button className="add-exercise-button" onClick={() => setShowPopup(true)}>
        Add Exercise
      </button>

      {/* List of Exercises */}
      <ul className="exercise-list">
        {exercises.map((exercise) => (
          <li key={exercise._id} className="exercise-item">
            <div className="exercise-info">
              <button
                className="delete-exercise-button"
                onClick={() => deleteExercise(exercise._id)}
              >
                Delete
              </button>
              <span>{exercise.name} - {exercise.reps} reps - {exercise.weight} kg</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Popup for Adding a New Exercise */}
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Add New Exercise</h2>
            <input
              type="text"
              placeholder="Exercise Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="popup-input"
            />
            <input
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value === '' ? '' : Number(e.target.value))}
              className="popup-input"
            />
            <input
              type="number"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
              className="popup-input"
            />
            <button className="popup-add-button" onClick={addExercise}>
              Add
            </button>
            <button className="cancel-button" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseManager;
