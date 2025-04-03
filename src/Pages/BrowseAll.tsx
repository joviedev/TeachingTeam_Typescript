import React, { useState } from 'react';
import Footer from '../FixedComponent/Footer';
import SearchFilterBar from '../FixedComponent/SearchFilterBar';
import { courses } from '../Data/CourseList';
import ScrollerToggle from '../FixedComponent/ScrollToggle';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const BrowseAll: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // Read values from URL query parameters on page load
  const [selectedCourse, setSelectedCourse] = useState(searchParams.get('course') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [selectedOpening, setSelectedOpening] = useState(searchParams.get('opening') || '');

  const filteredCourses = courses.filter((course) => {
    return (
      (selectedCourse === '' || course.courseType.toLowerCase() === selectedCourse.toLowerCase()) &&
      (selectedLocation === '' || course.location.toLowerCase() === selectedLocation.toLowerCase()) &&
      (selectedOpening === '' || course.opening.toLowerCase() === selectedOpening.toLowerCase())
    );
  });  

  return (
    <>
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          <div style={styles.contentWrapper}>
            <div style={styles.courseList}>
              <h2 style={styles.heading}>
                {filteredCourses.length} courses found
              </h2>

              {filteredCourses.map((course, idx) => (
                <div key={idx} style={styles.courseCard}>
                  <div style={styles.cardLeft}>
                    <h3 style={styles.courseTitle}>{course.title}</h3>
                    <span style={styles.courseTypeLabel}>
                      {course.courseType.toUpperCase()}
                    </span>
                    <p style={styles.location}>{course.location.toUpperCase()}</p>
                    <p style={styles.description}>{course.description}</p>
                    <p>{course.date}</p>
                    <p>{course.time}</p>
                    <p>{course.spacesLeft} spaces left</p>
                  </div>
                  <div style={styles.cardRight}>
                    <button
                      style={styles.button}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
                        e.currentTarget.style.color = '#000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#085DB7';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onClick={() => navigate(`/apply/${course.code}`)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.sidebar}>
              <div style={styles.searchFilterShadow}>
                <SearchFilterBar
                  selectedCourse={selectedCourse}
                  setSelectedCourse={setSelectedCourse}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  selectedOpening={selectedOpening}
                  setSelectedOpening={setSelectedOpening}
                  mode="reset"
                  onReset={() => {
                    setSelectedCourse('');
                    setSelectedLocation('');
                    setSelectedOpening('');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollerToggle />
      <Footer />
    </>
  );
};

export default BrowseAll;

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
