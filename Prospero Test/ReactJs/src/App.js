import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [pajak, setPajak] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/v1/pajak')
      .then(response => response.json())
      .then(data => {
        setPajak(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
          <h2>Pajak List</h2>
          {pajak.map(pajak =>
            <div key={pajak.id}>
              {pajak.noResi}
              {pajak.tanggalPembuatan}
              {pajak.status}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;