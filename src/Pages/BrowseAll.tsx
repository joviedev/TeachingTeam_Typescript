import React, { useState } from 'react';
import Footer from '../FixedComponent/Footer';
import SearchFilterBar from '../FixedComponent/SearchFilterBar';
import { courses } from '../Data/CourseList';
import ScrollerToggle from '../FixedComponent/ScrollToggle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/utils/auth/AuthProvider';

// BrowseAll page component
const BrowseAll: React.FC = () => {
  const location = useLocation(); // Hook to access the current URL
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const searchParams = new URLSearchParams(location.search); // Parse query parameters from URL

  const { isSignedIn } = useAuth(); // Get user's sign-in status

  // Initialize selected filter states based on URL query parameters
  const [selectedCourse, setSelectedCourse] = useState(searchParams.get('course') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [selectedRole, setSelectedRole] = useState(searchParams.get('role') || '');
  const [selectedOpening, setSelectedOpening] = useState(searchParams.get('opening') || '');
  // Filter the list of all courses based on the selected filters
  const filteredCourses = courses.filter((course) => {
    return (
      // If no course type is selected OR the course's type matches the selected one
      (selectedCourse === '' || course.courseType.toLowerCase() === selectedCourse.toLowerCase()) &&
      // If no location is selected OR the course's location matches the selected one
      (selectedLocation === '' || course.location.toLowerCase() === selectedLocation.toLowerCase()) &&
      // If no role is selected OR the course's role matches the selected one
      (selectedRole === '' || course.role?.toLowerCase() === selectedRole.toLowerCase()) &&
      // If no opening is selected OR the course's opening matches the selected one
      (selectedOpening === '' || course.opening.toLowerCase() === selectedOpening.toLowerCase())
    );
  });
  // Handle "Apply Now" button click
  const handleApplyNow = (courseCode: string, courseTitle: string) => {
    // Save the selected course title into localStorage for later use
    localStorage.setItem('selectedCourse', courseTitle);

    if (isSignedIn) {
      // If user is already signed in, navigate directly to the application form page
      navigate(`/apply/${courseCode}`);
    } else {
      // If user is NOT signed in, set a flag to redirect them back after login
      localStorage.setItem('redirectAfterLogin', 'apply');
      // Redirect user to login page
      navigate('/login');
    }
  };

  return (
    <>
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          <div style={styles.contentWrapper}>
            {/* Course List Section */}
            <div style={styles.courseList}>
              <h2 style={styles.heading}>{filteredCourses.length} courses found</h2>
              {/* Render each course */}
              {filteredCourses.map((course, idx) => (
                <div key={idx} style={styles.courseCard}>
                  {/* Left Side: Course Information */}
                  <div style={styles.cardLeft}>
                    <h3 style={styles.courseTitle}>{course.title}</h3>
                    <span style={styles.courseTypeLabel}>{course.courseType.toUpperCase()}</span>
                    <p style={styles.location}>{course.location.toUpperCase()}</p>
                    <p style={styles.description}>{course.description}</p>
                    <p>{course.date}</p>
                    <p>{course.time}</p>
                    <p>{course.spacesLeft} spaces left</p>
                  </div>
                  {/* Right Side: Apply Now Button */}
                  <div style={styles.cardRight}>
                    <button
                      style={styles.button}
                      onClick={() => handleApplyNow(course.code, course.title)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
                        e.currentTarget.style.color = '#000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#085DB7';
                        e.currentTarget.style.color = '#fff';
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Sidebar Section: Search and Filter */}
            <div style={styles.sidebar}>
              <div style={styles.searchFilterShadow}>
                <SearchFilterBar
                  selectedCourse={selectedCourse}
                  setSelectedCourse={setSelectedCourse}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  selectedRole={selectedRole}          
                  setSelectedRole={setSelectedRole} 
                  selectedOpening={selectedOpening}
                  setSelectedOpening={setSelectedOpening}
                  mode="reset" 
                  onReset={() => { // Reset all filters to default
                    setSelectedCourse('');
                    setSelectedLocation('');
                    setSelectedRole('');   
                    setSelectedOpening('');
                  }}
                  layout="column" // Column layout for sidebar
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollerToggle /> {/* Scroll to Top Button */}
      <Footer /> {/* Footer */}
    </>
  );
};

export default BrowseAll;

// Styling for BrowseAll page
const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '30px 20px',
  },
  contentWrapper: {
    display: 'flex',
    gap: '30px',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  sidebar: {
    flex: '0 0 280px',
    marginTop: '24px',
  },
  courseList: {
    flex: 1,
  },
  heading: {
    margin: '0 0 20px',
    fontSize: '22px',
    fontWeight: 600,
  },
  courseCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '15px 20px',
    marginBottom: '16px',
    backgroundColor: '#F3F9FF',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
    fontSize: '14px',
  },
  cardLeft: {
    maxWidth: '70%',
  },
  courseTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1e3a8a',
    marginBottom: '8px',
  },
  location: {
    fontWeight: 600,
    color: '#000',
    marginBottom: '8px',
  },
  description: {
    marginBottom: '10px',
    color: '#374151',
  },
  cardRight: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#085DB7',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '30px',
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  searchFilterShadow: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    marginTop: '28px',
    marginBottom: '16px',
    backgroundColor: '#F3F9FF',
  },
};
