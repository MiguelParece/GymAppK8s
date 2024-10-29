import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

interface HistoryItem {
  reps: number;
  weight: number;
  oneRM: number;
  date: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null); // For handling errors

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get<{ history: string[] }>('/api/history');
        console.log('Fetched history:', response.data);

        // Parse each history item string into a JSON object
        const parsedHistory: HistoryItem[] = response.data.history.map((item) => {
          try {
            return JSON.parse(item); // Parse each item to JSON
          } catch (e) {
            console.error('Error parsing history item', e);
            return null; // Handle parsing errors if needed
          }
        }).filter(Boolean); // Filter out any null values from failed parses

        setHistory(parsedHistory);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching history', error);
        setError('Failed to fetch history');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h1 className="history-title">Estimated 1 Rep Maxes Over Time</h1>

      {error && <p className="error-message">{error}</p>} {/* Display error if exists */}

      <ul className="history-list">
        {history.length > 0 ? (
          history.map((item, index) => (
            <li key={index} className="history-item">
              <div className="entry">
                <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
                <p><strong>Reps:</strong> {item.reps}</p>
                <p><strong>Weight:</strong> {item.weight} kg</p>
                <p><strong>Estimated 1RM:</strong> {item.oneRM} kg</p>
              </div>
            </li>
          ))
        ) : (
          <li className="no-history">No history available</li>
        )}
      </ul>
    </div>
  );
};

export default History;
