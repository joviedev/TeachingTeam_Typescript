import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from './CustomDropdown'; 

/**
 * SearchFilterBar component for TeachTeam.
 * 
 * - Provides multiple dropdowns to filter courses, locations, roles, and intakes.
 * - Supports different layouts (row for banner / column for sidebar).
 * - Includes Search, Reset, and Browse All buttons.
 */

// Option type for dropdowns
interface Option {
  value: string;
  label: string;
}
// Props for the SearchFilterBar
interface Props {
  selectedCourse: string;
  setSelectedCourse: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  selectedOpening: string;
  setSelectedOpening: (value: string) => void;
  selectedRole: string;
  setSelectedRole: (value: string) => void;
  mode?: 'search' | 'reset';  // If "reset", show reset button instead of search
  onSearch?: () => void;        // Trigger when search button clicked
  onReset?: () => void;         // Trigger when reset button clicked
  layout?: 'row' | 'column';    // Layout direction (default column)
}

// Dropdown options for each filter
export const courseOptions: Option[] = [
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

const roleOptions: Option[] = [
  { value: '', label: 'Role' },
  { value: 'Tutor', label: 'Tutor' },
  { value: 'Lab-Assistant', label: 'Lab-Assistant' },
];

const openingOptions: Option[] = [
  { value: '', label: 'Opening' },
  { value: 'Apply Now', label: 'Apply Now' },
  { value: 'Semester 1', label: 'Semester 1' },
  { value: 'Semester 2', label: 'Semester 2' },
  { value: 'Summer Intake', label: 'Summer Intake' },
];
// SearchFilterBar component for TeachTeam
// - Displays multiple dropdowns and buttons for filtering courses
// - Supports different layouts (column for sidebar, row for banner)
// - Can show Search or Reset mode
const SearchFilterBar: React.FC<Props> = ({
  selectedCourse,
  setSelectedCourse,
  selectedLocation,
  setSelectedLocation,
  selectedOpening,
  setSelectedOpening,
  selectedRole,
  setSelectedRole,
  onSearch,
  onReset,
  mode,
  layout = 'column', // Default layout
}) => {
  const navigate = useNavigate(); // Hook to programmatically navigate between pages
  const isColumn = layout === 'column'; // Check if the layout should be column or row  

  return (
    <div
      style={{
        ...styles.searchBar,
        flexDirection: isColumn ? 'column' : 'row',     
        maxWidth: isColumn ? '350px' : '1100px',
        gap: isColumn ? '16px' : '20px',
        alignItems: 'center', 
        justifyContent: 'center',
        flexWrap: 'wrap',         
      }}
    >
      {/* All Dropdowns + Search/Reset button together */}
      <div style={styles.selectWrapper}>
        <CustomDropdown value={selectedCourse} onChange={setSelectedCourse} options={courseOptions} />
      </div>
      <div style={styles.selectWrapper}>
        <CustomDropdown value={selectedLocation} onChange={setSelectedLocation} options={locationOptions} />
      </div>
      <div style={styles.selectWrapper}>
        <CustomDropdown value={selectedRole} onChange={setSelectedRole} options={roleOptions} />
      </div>
      <div style={styles.selectWrapper}>
        <CustomDropdown value={selectedOpening} onChange={setSelectedOpening} options={openingOptions} />
      </div>

      {/* If mode is 'reset', show the Reset button */}
      {mode === 'reset' ? (
        <button
          style={styles.searchButton} // Apply search button styling
          onClick={onReset} // Trigger onReset function when clicked
          onMouseEnter={(e) => {
            // Change button background and text color on hover
            e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            // Reset button style back when not hovering
            e.currentTarget.style.backgroundColor = '#085DB7';
            e.currentTarget.style.color = '#fff';
          }}
        >
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
          SEARCH
        </button>
      )}

      {/* Browse All button always below */}
      <div style={styles.browseAllWrapper}>
        <button
          style={styles.searchButton}
          onClick={() => {
            setSelectedCourse('');
            setSelectedLocation('');
            setSelectedRole('');
            setSelectedOpening('');
            navigate('/browse-all');
          }}
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

// Styling for SearchFilterBar
const styles: { [key: string]: React.CSSProperties } = {
  searchBar: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexWrap: 'wrap', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(243, 249, 255, 0.65)',
    borderRadius: '12px',
    padding: '20px 30px',
    margin: '30px auto 10px',
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
  browseAllWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
    alignItems: 'center',
  },
};
