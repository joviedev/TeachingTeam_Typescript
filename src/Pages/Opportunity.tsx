import React, { useState } from 'react';
import CustomDropdown from '../FixedComponent/CustomDropdown';

const Opportunity: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOpening, setSelectedOpening] = useState('');

  const courseOptions = [
    { value: '', label: 'All Courses' },
    { value: 'vocational', label: 'Vocational' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor degree', label: 'Bachelor Degrees' },
    { value: 'associate degree', label: 'Associate Degrees' },
    { value: 'master coursework', label: 'Master by Coursework' },
    { value: 'master research', label: 'Master by Research' },
  ];

  const locationOptions = [
    { value: '', label: 'Location' },
    { value: 'melbourne', label: 'Melbourne City' },
    { value: 'online', label: 'Online' },
  ];

  const openingOptions = [
    { value: '', label: 'Opening' },
    { value: 'apply now', label: 'Apply Now' },
    { value: 'semester 1', label: 'Semester 1' },
    { value: 'semester 2', label: 'Semester 2' },
    { value: 'summer', label: 'Summer Intake' },
  ];

  return (
    <div style={styles.page}>
      {/* Opportunity Banner */}
      <div style={styles.opportunityBanner}>
        <div style={styles.bannerText}>
          <h1 style={styles.bannerTitle}>Explore Casual Tutoring Roles</h1>
          <p style={styles.bannerSubtitle}>
            Discover opportunities that align with your academic path and location.
          </p>
        </div>
        <div style={styles.imageBox}>
          {/* Image placeholder */}
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchBar}>
        {/* Course Type */}
        <div style={styles.selectWrapper}>
          <CustomDropdown
            value={selectedCourse}
            onChange={(value) => setSelectedCourse(value)}
            options={courseOptions}
          />
        </div>

        {/* Location */}
        <div style={styles.selectWrapper}>
          <CustomDropdown
            value={selectedLocation}
            onChange={(value) => setSelectedLocation(value)}
            options={locationOptions}
          />
        </div>

        {/* Opening */}
        <div style={styles.selectWrapper}>
          <CustomDropdown
            value={selectedOpening}
            onChange={(value) => setSelectedOpening(value)}
            options={openingOptions}
          />
        </div>

        {/* Search Button */}
        <button
          style={styles.searchButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#085DB7';
            e.currentTarget.style.color = '#fff';
          }}
        >
          <span className="material-icons" style={styles.icon}>search</span>
          SEARCH
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
  },
  opportunityBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    margin: '20px auto',
    maxWidth: '1100px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    flexWrap: 'wrap',
  },
  bannerText: {
    maxWidth: '600px',
    flex: 1,
  },
  bannerTitle: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '10px',
    color: '#111827',
  },
  bannerSubtitle: {
    fontSize: '16px',
    color: '#4B5563',
  },
  imageBox: {
    width: '280px',
    height: '180px',
    backgroundColor: '#E5E7EB',
    borderRadius: '12px',
    flexShrink: 0,
    marginTop: '20px',
  },
  searchBar: {
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '40px',
    margin: '30px auto',
    maxWidth: '1100px',
    flexWrap: 'wrap',
  },
  selectWrapper: {
    position: 'relative',
    minWidth: '200px',
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 25px',
    border: 'none',
    borderRadius: '999px',
    color: '#ffffff',
    backgroundColor: '#085DB7',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '16px',
    justifyContent: 'center',
    textAlign: 'center',
  },
  icon: {
    fontSize: '25px',
    color: 'inherit',
  },
};

export default Opportunity;

