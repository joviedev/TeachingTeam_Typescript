import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './FixedComponent/Header';
import NavBar from './FixedComponent/NavBar';
import SignUp from './Component/SignUp';
import './App.css';

// Main landing page component
function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
        <Header /> {/*  Display the header component on all pages*/}
        <NavBar /> {/*  Display the navbar component on all pages */}

        {/* Define application routes */}
        <Routes>
          {/* Route for the sign-up page */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
