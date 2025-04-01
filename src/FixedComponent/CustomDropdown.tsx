import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div
      ref={dropdownRef}
      style={styles.wrapper}
      onClick={() => setOpen(prev => !prev)}
    >
      <div style={styles.selectDisplay}>
        {selectedOption ? selectedOption.label : placeholder || 'Select'}
        <span className="material-icons" style={styles.icon}>arrow_drop_down</span>
      </div>

      {open && (
        <ul style={styles.dropdownMenu}>
          {options.map(option => (
            <li
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                onChange(option.value);
                setOpen(false);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = value === option.value ? 'rgba(8, 93, 183, 0.25)' : 'white';
              }}
              style={{
                ...styles.dropdownItem,
                backgroundColor: value === option.value ? 'rgba(8, 93, 183, 0.25)' : 'white',
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    position: 'relative',
    minWidth: '200px',
    border: '1px solid #085DB7',
    borderRadius: '8px',
    padding: '14px 18px',
    cursor: 'pointer',
    fontWeight: 700,
    color: '#085DB7',
    backgroundColor: '#fff',
  },
  selectDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 25,
    color: '#085DB7',
  },
  dropdownMenu: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderTop: 'none',
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 10,
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    fontSize: '12px',
  },
  dropdownItem: {
    padding: '10px 18px',
    cursor: 'pointer',
    color: '#000',
    transition: 'background-color 0.2s ease',
  },
};

export default CustomDropdown;
