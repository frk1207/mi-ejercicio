import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('API endpoint:', API_URL);
        console.log('Fetched leaderboard:', results);
        setEntries(results);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {entries.map((e, i) => (
          <li key={e.id || i} className="list-group-item">
            <b>User:</b> {e.user} - <b>Puntos:</b> {e.points}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
