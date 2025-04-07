import React from 'react';
import Footer from '../FixedComponent/Footer';
import ScrollToggle from '../FixedComponent/ScrollToggle';
import applyBanner from '../assets/apply.jpg';
import { courses } from '../Data/CourseList';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ApplyPage: React.FC = () => {
  const navigate = useNavigate();
  const { code } = useParams();

  useEffect(() => {
    const isSignedIn = localStorage.getItem('isSignedIn');
    if (isSignedIn !== 'true') {
      localStorage.setItem('redirectAfterLogin', 'apply');
      const selectedCode = code || '';
      localStorage.setItem('redirectCourseCode', selectedCode); // save which course
      navigate('/login'); // not signed in? Redirect to login immediately
    }
  }, [navigate, code]);
  const selectedCourse = courses.find(course => course.code.toLowerCase() === (code || '').toLowerCase());

  if (!selectedCourse) return <p>Course not found.</p>;

  const handleApply = () => {
    const isSignedIn = localStorage.getItem('isSignedIn');
    localStorage.setItem('selectedCourse', selectedCourse.title); // already doing this
    localStorage.setItem('redirectCourseCode', selectedCourse.code); // ADD THIS LINE
  
    if (isSignedIn === 'true') {
      navigate('/apply-form');
    } else {
      localStorage.setItem('redirectAfterLogin', 'apply');
      navigate('/login');
    }
  };  

  return (
    <>
      <div style={{ ...styles.bannerWrapper, backgroundImage: `url(${applyBanner})` }}>
        <div style={styles.overlay} />
        <div style={styles.bannerContent}>
          <h1 style={styles.bannerTitle}>{selectedCourse.title}</h1>
          <span style={styles.subtitleLabel}>DIPLOMA</span>
          <p style={styles.bannerDesc}>{selectedCourse.description}</p>

          <div style={styles.buttons}>
            <button
              style={styles.applyBtn}
              onClick={handleApply}
            >
              Apply
            </button>
            <button
              style={styles.enquireBtn}
              onClick={() => navigate('/apply-form')}
            >
              Enquiry
            </button>
          </div>
        </div>
      </div>

      <div style={styles.infoSection}>
        <div style={styles.container}>
          <div style={styles.infoRow}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Location:</span>
              <p style={styles.infoValue}>{selectedCourse.location}</p>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Schedule:</span>
              <p style={styles.infoValue}><strong>{selectedCourse.date}</strong><br />{selectedCourse.time}</p>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Course Materials:</span>
              <p style={styles.infoValue}><strong>All materials must be uploaded to Canvas.</strong></p>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Spaces Left:</span>
              <p style={styles.infoValue}><strong>{selectedCourse.spacesLeft}</strong></p>
            </div>
          </div>
        </div>
      </div>

      <ScrollToggle />
      <Footer />
    </>
  );
};

export default ApplyPage;

// Styling
const styles: { [key: string]: React.CSSProperties } = {
  bannerWrapper: {
    position: 'relative',
    height: '500px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  bannerContent: {
    position: 'relative',
    zIndex: 2,
    color: '#fff',
    textAlign: 'left',
    maxWidth: '800px',
    padding: '0 30px',
  },
  bannerTitle: {
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '25px',
  },
  subtitleLabel: {
    display: 'inline-block',
    fontSize: '20px',
    fontWeight: 600,
    backgroundColor: '#ffcc00',
    color: '#000',
    padding: '4px 10px',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  bannerDesc: {
    fontSize: '18px',
    marginBottom: '40px',
    lineHeight: 1.6,
  },
  buttons: {
    display: 'flex',
    gap: '50px',
  },
  applyBtn: {
    backgroundColor: '#085DB7',
    color: '#fff',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
  },
  enquireBtn: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '12px 30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
  },
  infoSection: {
    backgroundColor: '#F9FAFB',
    padding: '30px 40px',
    borderTop: '1px solid #e5e7eb',
    marginTop: '0px',
    justifyContent: 'center',
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    padding: '0 60px',
    boxSizing: 'border-box',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '60px',
    flexWrap: 'nowrap',
  },
  infoItem: {
    flex: '1 1 0',
    minWidth: '0',
    maxWidth: '100%',
  },
  infoLabel: {
    color: '#6b7280',
    fontWeight: 500,
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '6px',
  },
  icon: {
    fontSize: '20px',
    marginRight: '6px',
    color: '#1f1f1f',
  },
  infoValue: {
    color: '#000038',
    fontWeight: 600,
    fontSize: '17px',
    lineHeight: 1.4,
  },
};
