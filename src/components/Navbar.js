'use client';

import React from 'react';

const Navbar = ({ setView }) => {
  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.reload(); // u Next.js ovo i dalje radi jer je frontend
  };

  return (
    <nav className="navbar">
      <button onClick={() => setView('jobs')}>Pregled poslova</button>
      <button onClick={() => setView('add')}>Dodaj oglas</button>
      <button onClick={handleLogout}>Odjava</button>
    </nav>
  );
};

export default Navbar;
