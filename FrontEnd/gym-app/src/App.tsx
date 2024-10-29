import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import OneRepMaxEstimator from './components/OneRepMaxEstimator/OneRepMaxEstimator';
import ExerciseManager from './components/ExerciseManager/ExerciseManager';
import History from './components/History/History';
import Layout from './Layout';
const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/one-rep-max" element={<OneRepMaxEstimator />} />
          <Route path="/exercise-manager" element={<ExerciseManager />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
