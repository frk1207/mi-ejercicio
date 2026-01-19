import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('API endpoint:', API_URL);
        console.log('Fetched users:', results);
        setUsers(results);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Usuarios</h2>
      <ul className="list-group">
        {users.map((u, i) => (
          <li key={u.id || i} className="list-group-item">
            <b>{u.name}</b> - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
