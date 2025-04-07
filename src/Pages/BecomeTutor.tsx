import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BecomeTutor: React.FC = () => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/login'); 
  };

  return (
    <div style={styles.container}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.header}
      >
        Become a Tutor
      </motion.h1>

      <p style={styles.introText}>
        Join our tutoring team and help fellow students excel! Explore the requirements, responsibilities, and benefits below.
      </p>

      {/* Requirements Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Requirements</h2>
        <ul style={styles.list}>
          <li>Must be a current student or graduate with good academic standing</li>
          <li>Provide proof of right to work (citizenship or visa)</li>
          <li>Minimum Distinction (70+) in the subject(s) you want to tutor</li>
          <li>Provide 2 academic or professional references</li>
        </ul>
      </section>

      {/* Responsibilities Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Responsibilities & Benefits</h2>
        <ul style={styles.list}>
          <li>Assist students in labs and tutorials</li>
          <li>Run study sessions and help with assignments (no solutions given)</li>
          <li>Gain teaching and leadership experience</li>
          <li>Flexible hours and paid opportunities</li>
        </ul>
      </section>

      {/* Apply Now Button */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button
          style={styles.applyButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#085DB7';
            e.currentTarget.style.color = '#fff';
          }}
          onClick={handleApply}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default BecomeTutor;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '32px 24px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'sans-serif',
    backgroundColor: '#f9fafb',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  header: {
    fontSize: '36px',
    fontWeight: 800,
    color: '#1e3a8a',
    marginBottom: '16px',
    textAlign: 'center',
  },
  introText: {
    marginBottom: '24px',
    fontSize: '16px',
    color: '#475569',
    textAlign: 'center',
  },
  section: {
    marginBottom: '32px',
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '12px',
    color: '#1d4ed8',
  },
  list: {
    paddingLeft: '24px',
    color: '#374151',
    lineHeight: '28px',
  },
  applyButton: {
    backgroundColor: '#085DB7',
    color: '#fff',
    padding: '12px 32px',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};
