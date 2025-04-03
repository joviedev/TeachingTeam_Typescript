import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './FixedComponent/Header';
import NavBar from './FixedComponent/NavBar';
import ScrollToTop from './FixedComponent/ScrollToTop';

import About from './Pages/About';         // Landing page
import SignUp from './Component/SignUp';   // Sign-up page
import Login from './Component/Login';     // Login page
import Opportunity from './Pages/Opportunity';  // Opportunity page - Job list
import BecomeTutor from './Pages/BecomeTutor';  // Sign up as tutor page
import Applications from './Pages/Applications';  // Lecturer receive applictaions page
import MyApplication from './Pages/MyApplication';  // Tutor lists of applications page
import LecturerDashboard from './Pages/LecturerDashboard';  // Lecturer dashboard page
import ReviewTutors from './Pages/ReviewTutors';  // Page for lecturer to review tutors, to accept or reject and leave comments
import TutorDashboard from './Pages/TutorDashboard';  // Tutor dashboard page
import BrowseAll from './Pages/BrowseAll';
import ApplyPage from './Pages/ApplyPage';

// Main landing page component
function App() {
  // App-level authentication state
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<'guest' | 'tutor' | 'lecturer'>('guest');

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserRole('guest');
  };

  return (
    <Router>
      <ScrollToTop />
      <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
        <Header />
        <NavBar
          isSignedIn={isSignedIn}
          userRole={userRole}
          handleSignOut={handleSignOut}
        />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/opportunity" element={<Opportunity />} />
          <Route path="/become-a-tutor" element={<BecomeTutor />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/my-application" element={<MyApplication />} />
          <Route path="/review-tutors" element={<ReviewTutors />} />
          <Route path="/browse-all" element={<BrowseAll />} />
          <Route path="/apply/:code" element={<ApplyPage />} />
          <Route
            path="/login"
            element={
              <Login
                setIsSignedIn={setIsSignedIn}
                setUserRole={setUserRole}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;