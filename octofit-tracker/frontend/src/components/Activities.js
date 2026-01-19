import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('API endpoint:', API_URL);
        console.log('Fetched activities:', results);
        setActivities(results);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Actividades</h2>
      <ul className="list-group">
        {activities.map((a, i) => (
          <li key={a.id || i} className="list-group-item">
            <b>{a.type}</b> - {a.duration} min, {a.distance} km
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
