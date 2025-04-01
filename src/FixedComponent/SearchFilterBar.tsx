import React from 'react';
import CustomDropdown from './CustomDropdown'; 
import { useNavigate } from 'react-router-dom';

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
  mode?: 'search' | 'reset';
  onSearch?: () => void; 
  onReset?: () => void;
}

const courseOptions: Option[] = [
  { value: '', label: 'All Courses' },
  { value: 'Vocational', label: 'Vocational' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Bachelor Degrees', label: 'Bachelor Degrees' },
  { value: 'Master by Coursework', label: 'Master by Coursework' },
  { value: 'Master by Research', label: 'Master by Research' },
];

const locationOptions: Option[] = [
  { value: '', label: 'Location' },
  { value: 'Melbourne City', label: 'Melbourne City' },
  { value: 'Online', label: 'Online' },
];

const openingOptions: Option[] = [
  { value: '', label: 'Opening' },
  { value: 'Apply Now', label: 'Apply Now' },
  { value: 'Semester 1', label: 'Semester 1' },
  { value: 'Semester 2', label: 'Semester 2' },
  { value: 'Summer Intake', label: 'Summer Intake' },
];

const SearchFilterBar: React.FC<Props> = ({
  selectedCourse,
  setSelectedCourse,
  selectedLocation,
  setSelectedLocation,
  selectedOpening,
  setSelectedOpening,
  onSearch,
  mode,         
  onReset
}) => {

const navigate = useNavigate();

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
    
      {mode === 'reset' ? (
        <button
            style={styles.searchButton}
            onClick={onReset}
            onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
            e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#085DB7';
            e.currentTarget.style.color = '#fff';
            }}
        >
            <span className="material-icons" style={styles.icon}>refresh</span>
            Reset
        </button>
        ) : (
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
        )}

      <div style={styles.browseAllWrapper}>
        <button
            style={styles.searchButton}
            onClick={() => navigate('/browse-all')}
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
