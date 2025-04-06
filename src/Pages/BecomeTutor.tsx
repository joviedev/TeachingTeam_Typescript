import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BecomeTutor: React.FC = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleApply = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      navigate('/browse-all'); // navigate after showing message
    }, 2500); // show message for 2.5 seconds
  };

  return (
    <div style={containerStyle}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={headerStyle}
      >
        Become a Tutor
      </motion.h1>

      <p style={introTextStyle}>
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
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
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
          onClick={handleApply}
        >
          Apply Now
        </button>

        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={confirmationStyle}
          >
            ✅ Application started! Redirecting...
          </motion.div>
        )}
      </div>
    </div>
  );
};

// 🔷 Styles
const containerStyle: React.CSSProperties = {
  padding: '32px 24px',
  maxWidth: '900px',
  margin: '0 auto',
  fontFamily: 'sans-serif',
  backgroundColor: '#f9fafb',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
};

const headerStyle: React.CSSProperties = {
  fontSize: '36px',
  fontWeight: 800,
  color: '#1e3a8a',
  marginBottom: '16px',
  textAlign: 'center',
};

const introTextStyle: React.CSSProperties = {
  marginBottom: '24px',
  fontSize: '16px',
  color: '#475569',
  textAlign: 'center',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '32px',
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 700,
  marginBottom: '12px',
  color: '#1d4ed8',
};

const listStyle: React.CSSProperties = {
  paddingLeft: '24px',
  color: '#374151',
  lineHeight: '28px',
};

const applyButtonStyle: React.CSSProperties = {
  backgroundColor: '#085DB7',
  color: '#fff',
  padding: '12px 32px',
  border: 'none',
  borderRadius: '9999px',
  fontSize: '18px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const confirmationStyle: React.CSSProperties = {
  marginTop: '16px',
  fontSize: '16px',
  color: '#15803d',
  fontWeight: 500,
};

export default BecomeTutor;
