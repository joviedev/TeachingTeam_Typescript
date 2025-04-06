import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BecomeTutor: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: '#f9fafb', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '1rem', textAlign: 'center' }}
      >
        Become a Tutor
      </motion.h1>

      <p style={{ marginBottom: '1.5rem', fontSize: '1rem', color: '#475569', textAlign: 'center' }}>
        Join our tutoring team and help fellow students excel! Explore the requirements, responsibilities, and benefits below.
      </p>

      {/* Requirements Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Requirements</h2>
        <ul style={listStyle}>
          <li>Must be a current student or graduate with good academic standing</li>
          <li>Provide proof of right to work (citizenship or visa)</li>
          <li>Minimum Distinction (70+) in the subject(s) you want to tutor</li>
          <li>Provide 2 academic or professional references</li>
        </ul>
      </section>

      {/* Responsibilities Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Responsibilities & Benefits</h2>
        <ul style={listStyle}>
          <li>Assist students in labs and tutorials</li>
          <li>Run study sessions and help with assignments (no solutions given)</li>
          <li>Gain teaching and leadership experience</li>
          <li>Flexible hours and paid opportunities</li>
        </ul>
      </section>

      {/* Apply Now Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          style={applyButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#085DB7';
            e.currentTarget.style.color = '#fff';
          }}
          onClick={() => navigate('/browse-all')}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

// Styles
const sectionStyle: React.CSSProperties = {
  marginBottom: '2rem',
  backgroundColor: '#fff',
  padding: '1.5rem',
  borderRadius: '0.75rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 700,
  marginBottom: '0.75rem',
  color: '#1d4ed8',
};

const listStyle: React.CSSProperties = {
  paddingLeft: '1.5rem',
  color: '#374151',
  lineHeight: '1.75',
};

const applyButtonStyle: React.CSSProperties = {
  backgroundColor: '#085DB7',
  color: '#fff',
  padding: '0.75rem 2rem',
  border: 'none',
  borderRadius: '9999px',
  fontSize: '1.125rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

export default BecomeTutor;
