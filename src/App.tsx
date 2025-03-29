import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './FixedComponent/Header';
import NavBar from './FixedComponent/NavBar';

import About from './Pages/About';         // Landing page
import SignUp from './Component/SignUp';   // Sign-up page
import Tutor from './Pages/Tutor';         // Tutor dashboard (placeholder)
import Lecturer from './Pages/Lecturer';   // Lecturer dashboard (placeholder)
import JoinUs from './Pages/JoinUs';       // Join Us page (placeholder)

import './App.css';

// Main landing page component
function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
        <Header />
        <NavBar />

        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/lecturer" element={<Lecturer />} />
          <Route path="/join" element={<JoinUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
