import { FC, useEffect, useState } from 'react';
import CustomDropdown from '../CustomDropdown';
import './style.css';
import { statusOptions } from '@/utils/constant';


// Props for TutorApplicationFilterBar
interface Props {
  value?: { status: string };                         // Optional initial value 
  onSearch: ({ status }: { status: string }) => void; // Function to handle search action
  onReset?: () => void;                               // Optional function to reset the filter
};

/**
 * TutorApplicationFilterBar component for TeachTeam.
 * 
 * - Provides a simple filter bar for tutors to filter applications by status.
 * - Includes a dropdown for selecting application status such as pending, approve and reject.
 * - Includes Reset and Search buttons to clear or apply the filter.
 * - Automatically updates selected status when value prop changes.
 */

const TutorApplicationFilterBar: FC<Props> = ({ onSearch, onReset, value }) => {
  // Store the selected application status
  const [status, setStatus] = useState<string>('');

  // Update selected status whenever the incoming value prop changes
  useEffect(() => {
    setStatus(value?.status || ''); // If no value is provided, default to an empty string
  }, [value]);

  return (
    <div className='tutor-filter'>
      {/* Dropdown to select the application status */}
      <div className='select-wrapper'>
        <CustomDropdown options={statusOptions} value={status} onChange={setStatus} />
      </div>

      {/* Buttons for Reset and Search actions */}
      <div className='button-wrapper'>
        <button
          onClick={onReset}
        >
          Reset
        </button>
        <button
          onClick={() => {
            if (onSearch) {
              onSearch({status});  // Pass the selected status back to parent component
            }
          }}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default TutorApplicationFilterBar;
