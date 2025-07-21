'use client';

import { useState, useRef } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const passwordRef = useRef();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((u) => u.username === username);

    if (existingUser) {
      if (existingUser.password === password) {
        localStorage.setItem('username', username);
        onLogin(username);
      } else {
        setError('Pogrešna lozinka.');
      }
    } else {
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('username', username);
      onLogin(username);
    }
  };

  return (
    <div style={{ textAlign: 'center' }} className="login-container">
      <h2>Prijava</h2>
      <input
        type="text"
        placeholder="Unesite korisničko ime"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && passwordRef.current.focus()}
      />
      <input
        type="password"
        placeholder="Unesite lozinku"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        ref={passwordRef}
      />
      <button onClick={handleLogin}>Prijavi se</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
