import React from 'react';
import Header from './FixedComponent/Header';
import NavBar from './FixedComponent/NavBar';
import './App.css';

function App() {
  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
    <Header /> {/*  Add this line to render the Header to be shown */}
    <NavBar /> {/*  Add this line to render the NavBar to be shown */}
  </div>
  );
}

export default App;