import { FC } from 'react';
import CustomDropdown from '../CustomDropdown';
import './style.css';

interface Option {
  value: string;
  label: string;
}

const statusOptions = [
  { value: '', label: 'All Applications' },
  { value: 'processing', label: 'Processing' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' }
];

interface Props {
  status: string;
  onChange: (value: string) => void;
};

const TutorApplicationFilterBar: FC<Props> = ({ status, onChange }) => {
  return (
    <div className='tutor-filter'>
      <div className='select-wrapper'>
        <CustomDropdown options={statusOptions} value={status} onChange={onChange} />
      </div>
      <div className='button-wrapper'>
        <button>
          Reset
        </button>
        <button>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default TutorApplicationFilterBar;
