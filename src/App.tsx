import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './FixedComponent/Header';
import NavBar from './FixedComponent/NavBar';
import ScrollToTop from './FixedComponent/ScrollToTop';

import About from './Pages/About';                       // Landing page
import SignUp from './Component/SignUp';                 // Sign-up page
import Login from './Component/Login';                   // Login page
import BecomeTutor from './Pages/BecomeTutor';           // Tutor registration form
import Applications from './Pages/applications/Applications';      // Lecturer: View tutor applications
import MyApplication from './Pages/MyApplication';       // Tutor: View submitted applications
import LecturerDashboard from './Pages/LecturerDashboard';         // Lecturer dashboard
import ReviewTutors from './Pages/ReviewTutors';         // Lecturer: Review, accept/reject tutors
import TutorDashboard from './Pages/TutorDashboard';     // Tutor dashboard
import BrowseAll from './Pages/BrowseAll';               // View all available courses
import ApplyPage from './Pages/ApplyPage';               // Tutor: Start application for a course
import ApplyForm from './Pages/ApplyForm';               // Tutor: Fill out and submit application
import Inbox from './Pages/Inbox';                       // NEW: Messaging inbox
import ProtectedRoute from './Component/ProtectedRoute'; // Wrapper for route protection
import AuthProvider from './utils/auth/AuthProvider';    // Provides auth context
import TutorApplicationDetail from './Pages/tutorApplicationDetail';   // Tutor: Detail view of application
import InboxProvider from './utils/global/InBoxProvider';            // Global provider for inbox state
import ApplicationDetail from './Pages/applicationDetail';          // Lecturer: Detail view of tutor's application

/**
 * Root component for the app.
 * 
 * - Manages authentication state (signed in + role).
 * - Wraps the app in necessary providers (Auth, Inbox).
 * - Defines all client-side routes.
 */
function App() {
  // Global auth state (used for NavBar and protected views)
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<'guest' | 'tutor' | 'lecturer'>('guest');

  /**
   * Clears user session and resets to guest mode.
   * - Used when signing out from NavBar.
   */
  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserRole('guest');
    localStorage.removeItem('isSignedIn');         // Remove saved session
    localStorage.removeItem('redirectAfterLogin'); // Clear post-login redirect
    localStorage.removeItem('selectedCourse');     // Optional: remove selected course
  };

  return (
    <AuthProvider> {/* Provides authentication context globally */}
      <InboxProvider> {/* Provides messaging/inbox context globally */}
        <Router>
          <ScrollToTop /> {/* Scroll to top on route change */}
          <div
            style={{
              backgroundColor: '#F8F9FA',
              minHeight: '100vh',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
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
                  setIsSignedIn={setIsSignedIn}
                  setUserRole={setUserRole}
                />
              } />

              <Route
                path="/become-a-tutor"
                element={
                  <ProtectedRoute>
                    <BecomeTutor />
                  </ProtectedRoute>
                }
              />

              <Route path="/tutor-dashboard" element={<TutorDashboard />} />

              <Route path="/lecturer-dashboard" element={
                <ProtectedRoute>
                  <LecturerDashboard />
                </ProtectedRoute>
              } />

              <Route path="/applications" element={
                <ProtectedRoute>
                  <Applications />
                </ProtectedRoute>
              } />

              <Route path="/applications/:id" element={
                <ProtectedRoute>
                  <ApplicationDetail />
                </ProtectedRoute>
              } />

              <Route path="/my-applications" element={
                <ProtectedRoute>
                  <MyApplication />
                </ProtectedRoute>
              } />

              <Route path="/my-applications/:id" element={
                <ProtectedRoute>
                  <TutorApplicationDetail />
                </ProtectedRoute>
              } />

              <Route path="/review-tutors" element={
                <ProtectedRoute>
                  <ReviewTutors />
                </ProtectedRoute>
              } />

              <Route path="/browse-all" element={
                <ProtectedRoute>
                  <BrowseAll />
                </ProtectedRoute>
              } />

              <Route path="/apply/:code" element={
                <ProtectedRoute>
                  <ApplyPage />
                </ProtectedRoute>
              } />

              <Route path="/apply-form/:code" element={
                <ProtectedRoute>
                  <ApplyForm />
                </ProtectedRoute>
              } />

              <Route path="/inbox" element={
                <ProtectedRoute>
                  <Inbox />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </InboxProvider>
    </AuthProvider>
  );
}

export default App;
