import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './FixedComponent/Header';
import NavBar from './FixedComponent/NavBar';
import ScrollToTop from './FixedComponent/ScrollToTop';

import About from './Pages/About';         // Landing page
import SignUp from './Component/SignUp';   // Sign-up page
import Login from './Component/Login';     // Login page
import BecomeTutor from './Pages/BecomeTutor';  // Sign up as tutor page
import Applications from './Pages/applications/Applications';  // Lecturer receive applications page
import MyApplication from './Pages/MyApplication';  // Tutor lists of applications page
import LecturerDashboard from './Pages/LecturerDashboard';  // Lecturer dashboard page
import ReviewTutors from './Pages/ReviewTutors';  // Page for lecturer to review tutors, to accept or reject and leave comments
import TutorDashboard from './Pages/TutorDashboard';  // Tutor dashboard page
import BrowseAll from './Pages/BrowseAll'; // Browse all available courses
import ApplyPage from './Pages/ApplyPage'; // Start application for a course
import ApplyForm from './Pages/ApplyForm'; // Fill and submit application form
import Inbox from './Pages/Inbox';  // New Inbox page
import ProtectedRoute from './Component/ProtectedRoute'; // Wrapper to protect routes
import AuthProvider from './utils/auth/AuthProvider'; // Provides authentication context globally
import TutorApplicationDetail from './Pages/tutorApplicationDetail'; // Tutor: Detail view of application
import InboxProvider from './utils/global/InBoxProvider'; // Provides inbox/messaging context globally
import ApplicationDetail from './Pages/applicationDetail'; // Lecturer: Detail view of tutor application
import { dummyUsers } from './utils/constant'; // Dummy users (for local storage setup)

/**
 * Root component for the application.
 * 
 * - Manages authentication state (signed in + role).
 * - Provides authentication and inbox contexts globally.
 * - Defines all client-side routes.
 */

function App() {
  // Global authentication state
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<'guest' | 'tutor' | 'lecturer'>('guest');

  /**
   * Clears user session and resets to guest mode.
   * - Used when signing out via NavBar.
   */

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserRole('guest');
    localStorage.removeItem('isSignedIn'); // Remove saved session
    localStorage.removeItem('redirectAfterLogin'); // Remove any redirect
    localStorage.removeItem('selectedCourse'); // Optional: clear selected course if needed
  };

   /**
   * Setup dummy users on initial load.
   */

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(dummyUsers));
  }, []);

  return (
    <AuthProvider> {/* Provides authentication context globally */}
      <InboxProvider> {/* Provides messaging/inbox context globally */}
        <Router>
          <ScrollToTop />
          <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
            <Header />
            <NavBar
              isSignedIn={isSignedIn}
              userRole={userRole}
              handleSignOut={handleSignOut}
            />
            {/* ---------- App Routes ---------- */}
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={
                <Login
                  setIsSignedIn={setIsSignedIn} // Function to update signed-in status
                  setUserRole={setUserRole} // Function to update user role after login
                />
              } />
              <Route
                path="/become-a-tutor"
                element={
                  <ProtectedRoute>
                    <BecomeTutor />
                  </ProtectedRoute>
                } />
              <Route path="/tutor-dashboard" element={<TutorDashboard />} />
              <Route path="/lecturer-dashboard" element={<ProtectedRoute><LecturerDashboard /></ProtectedRoute>} />
              <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
              <Route path="/applications/:id" element={<ProtectedRoute><ApplicationDetail /></ProtectedRoute>} />
              <Route path="/my-applications" element={<ProtectedRoute><MyApplication /></ProtectedRoute>} />
              <Route path="/my-applications/:id" element={<ProtectedRoute><TutorApplicationDetail /></ProtectedRoute>} />
              <Route path="/review-tutors" element={<ProtectedRoute><ReviewTutors /></ProtectedRoute>} />
              <Route path="/browse-all" element={<ProtectedRoute><BrowseAll /></ProtectedRoute>} />
              <Route path="/apply/:code" element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />
              <Route path="/apply-form/:code" element={<ProtectedRoute><ApplyForm /></ProtectedRoute>} />
              <Route path="/inbox" element={<ProtectedRoute><Inbox /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </InboxProvider>
    </AuthProvider>
  );
}

export default App;
