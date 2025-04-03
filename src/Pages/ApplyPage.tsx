import React from 'react';
import Footer from '../FixedComponent/Footer';
import ScrollToggle from '../FixedComponent/ScrollToggle';
import applyBanner from '../assets/apply.jpg'; 
import { courses } from '../Data/CourseList';
import { useParams } from 'react-router-dom';

const ApplyPage: React.FC = () => {
  const { code } = useParams();
  const selectedCourse = courses.find(course => course.code.toLowerCase() === (code || '').toLowerCase());

  if (!selectedCourse) return <p>Course not found.</p>;

  return (
    <>
      <div style={{ ...styles.bannerWrapper, backgroundImage: `url(${applyBanner})` }}>
        <div style={styles.overlay} />

        <div style={styles.bannerContent}>
          <h1 style={styles.bannerTitle}>{selectedCourse.title}</h1>
          <span style={styles.subtitleLabel}>DIPLOMA</span>
          <p style={styles.bannerDesc}>{selectedCourse.description}</p>

          <div style={styles.buttons}>
            <button style={styles.applyBtn}>Apply</button>
            <button style={styles.enquireBtn}>Enquire</button>
          </div>
        </div>
      </div>



      <ScrollToggle />
      <Footer />
    </>
  );
};

export default ApplyPage;


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
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    subtitleLabel: {
      display: 'inline-block',
      fontSize: '14px',
      fontWeight: 600,
      backgroundColor: '#ffcc00',
      color: '#000',
      padding: '4px 10px',
      borderRadius: '4px',
      marginBottom: '15px',
    },
    bannerDesc: {
      fontSize: '16px',
      marginBottom: '20px',
      lineHeight: 1.6,
    },
    buttons: {
      display: 'flex',
      gap: '16px',
    },
    applyBtn: {
      backgroundColor: '#085DB7',
      color: '#fff',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
    },
    enquireBtn: {
      backgroundColor: '#fff',
      color: '#000',
      padding: '12px 24px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
    },
    detailsSection: {
      backgroundColor: '#F9FAFB',
      padding: '30px 20px',
      borderTop: '1px solid #e5e7eb',
      marginTop: '40px',
    },
    
    detailRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '30px',
      justifyContent: 'space-between',
      maxWidth: '1100px',
      margin: '0 auto',
    },
    
    detailItem: {
      minWidth: '180px',
      flex: '1 1 220px',
    },
    
    label: {
      fontWeight: 500,
      marginBottom: '6px',
      color: '#374151',
    },
    
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      marginTop: '6px',
    },
    
    selectButton: {
      padding: '10px 20px',
      border: '1.5px solid #0A0C4D',
      borderRadius: '30px',
      backgroundColor: '#fff',
      color: '#0A0C4D',
      cursor: 'pointer',
      fontWeight: 500,
    },
    
    selected: {
      backgroundColor: '#fff',
      borderColor: '#0A0C4D',
      color: '#0A0C4D',
      boxShadow: '0 0 0 2px #0A0C4D',
    },
    
    disabled: {
      backgroundColor: '#f3f4f6',
      borderColor: '#cbd5e1',
      color: '#6b7280',
      cursor: 'not-allowed',
    },
    
    link: {
      color: '#1e3a8a',
      textDecoration: 'underline',
      cursor: 'pointer',
    },    
  };
  