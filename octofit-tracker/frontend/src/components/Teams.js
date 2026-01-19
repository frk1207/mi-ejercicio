import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('API endpoint:', API_URL);
        console.log('Fetched teams:', results);
        setTeams(results);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Equipos</h2>
      <ul className="list-group">
        {teams.map((t, i) => (
          <li key={t.id || i} className="list-group-item">
            <b>{t.name}</b> - {t.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
