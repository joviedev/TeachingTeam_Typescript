import { FC, useEffect, useState } from 'react';
import CustomDropdown from '../CustomDropdown';
import './style.css';

interface Option {
  value: string;
  label: string;
}

const statusOptions: Option[] = [
  { value: '', label: 'All Applications' },
  { value: 'processing', label: 'Processing' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' }
];

interface Props {
  value?: { status: string };
  onSearch: ({status}: {status: string}) => void;
  onReset?: () => void;
};

const TutorApplicationFilterBar: FC<Props> = ({ onSearch, onReset, value }) => {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    setStatus(value?.status || '');
  }, [value]);

  return (
    <div className='tutor-filter'>
      <div className='select-wrapper'>
        <CustomDropdown options={statusOptions} value={status} onChange={setStatus} />
      </div>
      <div className='button-wrapper'>
        <button
          onClick={onReset}
        >
          Reset
        </button>
        <button
          onClick={() => {
            if (onSearch) {
              onSearch({status});
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
