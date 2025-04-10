import React, { useState, useRef, useEffect, useMemo } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: Option[];
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  maxLength?: number;
}

const CustomDropdown = <T,>({ value, onChange, options, placeholder, multiple, disabled, style, maxLength }: CustomDropdownProps<T>) => {
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

  const selectedOptions: Option[] = useMemo(() => {
    if (!options?.length) {
      return [];
    }
    if (multiple) {
      return options.filter((option) => ((value ?? []) as string[]).includes(option.value));
    }
    return options.filter((option) => option.value === value);
  }, [open, value, multiple]);

  const judgeObj = useMemo(() => {
    return selectedOptions.reduce((acc, cur) => {
      acc.labels.push(cur.label);
      acc.values.push(cur.value);
      return acc;
    }, { labels: [], values: [] } as { labels: string[], values: string[] });
  }, [selectedOptions]);

  const handleSelect = (val: string) => {
    if (multiple) {
      const newVal = Array.isArray(value) ? [...(value as string[])] : [];
      if (newVal.includes(val)) {
        newVal.splice(newVal.indexOf(val), 1);
      } else {
        newVal.push(val);
      }
      if (maxLength && newVal.length > maxLength) {
        return;
      }
      onChange(newVal as T);
    } else {
      onChange(val as T);
    }
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        ...styles.wrapper,
        ...(style || {}),
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onClick={() => {
        if (!disabled) {
          setOpen(prev => !prev);
        }
      }}
    >
      <div style={styles.selectDisplay}>
        {judgeObj?.labels?.length ? judgeObj?.labels.join(',') : placeholder || 'Select'}
        <span className="material-icons" style={styles.icon}>arrow_drop_down</span>
      </div>

      {open && (
        <ul style={styles.dropdownMenu}>
          {options.map(option => {
            const isSelected = judgeObj?.values?.includes(option.value);
            return (
              <li
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option.value);
                  if (!multiple) {
                    setOpen(false);
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isSelected ? 'rgba(8, 93, 183, 0.25)' : 'white';
                }}
                style={{
                  ...styles.dropdownItem,
                  backgroundColor: isSelected ? 'rgba(8, 93, 183, 0.25)' : 'white',
                }}
              >
                {option.label}
              </li>
            );
          })}
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
    padding: '8px 0',
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
    scrollbarWidth: 'thin',
    scrollbarColor: '#ccc transparent',
  },
  dropdownItem: {
    padding: '10px 18px',
    cursor: 'pointer',
    color: '#000',
    transition: 'background-color 0.2s ease',
  },
};

export default CustomDropdown;
