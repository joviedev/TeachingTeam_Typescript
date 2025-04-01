import React from 'react';
import CustomDropdown from './CustomDropdown'; 

interface Option {
  value: string;
  label: string;
}

interface Props {
  selectedCourse: string;
  setSelectedCourse: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  selectedOpening: string;
  setSelectedOpening: (value: string) => void;
  onSearch?: () => void;
}

const courseOptions: Option[] = [
  { value: '', label: 'All Courses' },
  { value: 'vocational', label: 'Vocational' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'bachelor degree', label: 'Bachelor Degrees' },
  { value: 'master coursework', label: 'Master by Coursework' },
  { value: 'master research', label: 'Master by Research' },
];

const locationOptions: Option[] = [
  { value: '', label: 'Location' },
  { value: 'melbourne', label: 'Melbourne City' },
  { value: 'online', label: 'Online' },
];

const openingOptions: Option[] = [
  { value: '', label: 'Opening' },
  { value: 'apply now', label: 'Apply Now' },
  { value: 'semester 1', label: 'Semester 1' },
  { value: 'semester 2', label: 'Semester 2' },
  { value: 'summer', label: 'Summer Intake' },
];

const SearchFilterBar: React.FC<Props> = ({
  selectedCourse,
  setSelectedCourse,
  selectedLocation,
  setSelectedLocation,
  selectedOpening,
  setSelectedOpening,
  onSearch,
}) => {
  return (
    <div style={styles.searchBar}>
      <div style={styles.selectWrapper}>
        <CustomDropdown value={selectedCourse} onChange={setSelectedCourse} options={courseOptions} />
      </div>
      <div style={styles.selectWrapper}>
        <CustomDropdown value={selectedLocation} onChange={setSelectedLocation} options={locationOptions} />
      </div>
      <div style={styles.selectWrapper}>
        <CustomDropdown value={selectedOpening} onChange={setSelectedOpening} options={openingOptions} />
      </div>

      <button
        style={styles.searchButton}
        onClick={onSearch}
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

      <div style={styles.browseAllWrapper}>
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
            Browse All
        </button>
        </div>
    </div>
  );
};

export default SearchFilterBar;


const styles: { [key: string]: React.CSSProperties } = {
  searchBar: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(243, 249, 255, 0.65)',
    borderRadius: '12px',
    padding: '30px 30px 20px',
    margin: '30px auto 10px',
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
    fontSize: 22,
    color: 'inherit',
  },
  browseAllWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  
};
