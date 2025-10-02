import React, { useState } from 'react';
import DonorForm from './DonorForm';
import SearchPage from './SearchPage';
import './App.css';

function App() {
  const [view, setView] = useState('search'); 

  return (
    <div className="App">
      <header className="app-header">
        <h1>🩸 Blood Donation Network</h1>
        <p className="subtitle">Connecting donors with those in need in Vijayawada</p>
        
        <nav className="main-nav">
          <button
            className={`nav-button ${view === 'search' ? 'active' : ''}`}
            onClick={() => setView('search')}
          >
            Blood Wanted
          </button>
          
          <button
            className={`nav-button ${view === 'donate' ? 'active' : ''}`}
            onClick={() => setView('donate')}
          >
            Register as a Donor
          </button>
        </nav>
      </header>

      <main>
        {view === 'search' ? <SearchPage /> : <DonorForm />}
      </main>
    </div>
  );
}

export default App;
