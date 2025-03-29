import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './FixedComponent/Header';
import NavBar from './FixedComponent/NavBar';

import About from './Pages/About';         // Landing page
import SignUp from './Component/SignUp';   // Sign-up page
import Opportunity from './Pages/Opportunity';  // Opportunity page - Job list
import BecomeTutor from './Pages/BecomeTutor';  // Sign up as tutor page
import Applications from './Pages/Applications';
import MyApplication from './Pages/MyApplication';
import LecturerDashboard from './Pages/LecturerDashboard';
import ReviewTutors from './Pages/ReviewTutors';
import TutorDashboard from './Pages/TutorDashboard';


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
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/opportunity" element={<Opportunity />} />
        <Route path="/become-a-tutor" element={<BecomeTutor />} />
        <Route path="/tutor-dashboard" element={<TutorDashboard />} />
        <Route path="/my-applications" element={<MyApplication />} />
        <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/review-tutors" element={<ReviewTutors />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
