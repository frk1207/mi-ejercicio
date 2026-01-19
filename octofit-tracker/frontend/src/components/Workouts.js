import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('API endpoint:', API_URL);
        console.log('Fetched workouts:', results);
        setWorkouts(results);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map((w, i) => (
          <li key={w.id || i} className="list-group-item">
            <b>{w.workout}</b> - {w.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
