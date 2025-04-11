import React, { useState, useRef, useEffect, useMemo } from 'react';

// Define option type for dropdown items
interface Option {
  value: string; // The actual value
  label: string; // The display text
}

// Define props for the CustomDropdown component
interface CustomDropdownProps<T> {
  value: T;                          // Selected value (single or multiple)
  onChange: (value: T) => void;       // Function to update selected value
  options: Option[];                 // List of options available in dropdown
  placeholder?: string;              // Placeholder text when nothing is selected
  multiple?: boolean;                // Allow multiple selections if true
  disabled?: boolean;                // Disable interaction if true
  style?: React.CSSProperties;       // Custom style for the dropdown wrapper
  maxLength?: number;                // Maximum number of selections allowed (for multiple mode)
}

/**
 * CustomDropdown component for TeachTeam.
 * 
 * - A reusable dropdown component that supports single or multiple selections.
 * - Can limit maximum selections and display selected values.
 * - Closes automatically when clicking outside the dropdown.
 * - Shows a styled list of options with hover effects and active state highlighting.
 */

const CustomDropdown = <T,>({ value, onChange, options, placeholder, multiple, disabled, style, maxLength }: CustomDropdownProps<T>) => {
  // State to track if the dropdown is open or closed
  const [open, setOpen] = useState(false);
  // Reference to the dropdown container for detecting outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown if user clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter the selected options based on the current value
  const selectedOptions: Option[] = useMemo(() => {
    if (!options?.length) { // If there are no options available, return an empty list
      return [];
    }
    if (multiple) { // If multiple selection is enabled, find all options whose values are included in the selected values
      return options.filter((option) => ((value ?? []) as string[]).includes(option.value));
    }
    return options.filter((option) => option.value === value); // If single selection, find the one option that matches the selected value
  }, [open, value, multiple]);

  // Create an object of selected labels and values for easy access
  const judgeObj = useMemo(() => {
    return selectedOptions.reduce((acc, cur) => {
      acc.labels.push(cur.label); // Collect the display labels of selected options
      acc.values.push(cur.value); // Collect the values of selected options
      return acc;
    }, { labels: [], values: [] } as { labels: string[], values: string[] }); // Initial accumulator
  }, [selectedOptions]);

   // Handle selecting an option
  const handleSelect = (val: string) => {
    if (multiple) {
      // If multiple selection is enabled:
      // 1. Copy the current selected values into a new array
      const newVal = Array.isArray(value) ? [...(value as string[])] : [];
      if (newVal.includes(val)) {
        // 2. If the value is already selected, remove it
        newVal.splice(newVal.indexOf(val), 1); 
      } else {
        // 3. If not selected, add it to the array
        newVal.push(val);
      }
      // 4. If a maximum number of selections is set, prevent adding more
      if (maxLength && newVal.length > maxLength) {
        return; // Do nothing if max length exceeded
      }
      // 5. Update the selected values
      onChange(newVal as T);
    } else {
      // If single selection mode, directly set the selected value
      onChange(val as T); 
    }
  };

  return (
    // Dropdown wrapper container
    <div
      ref={dropdownRef} // Reference to detect clicks outside the dropdown
      style={{
        ...styles.wrapper,
        ...(style || {}), // Allow custom styles to override if provided
        cursor: disabled ? 'not-allowed' : 'pointer' // Change cursor based on disabled state
      }}
      onClick={() => {
        // Toggle the dropdown open/close when user clicks the container
        if (!disabled) {
          setOpen(prev => !prev); // Only toggle if not disabled
        }
      }}
    >
       {/* Display selected values or placeholder */}
      <div style={styles.selectDisplay}>
        {judgeObj?.labels?.length ? judgeObj?.labels.join(',') : placeholder || 'Select'}
        <span className="material-icons" style={styles.icon}>arrow_drop_down</span>
      </div>

      {/* Dropdown menu with list of options */}
      {open && (
        <ul style={styles.dropdownMenu}>
          {/* Loop through each option and render a clickable item */}
          {options.map(option => {
            // Check if the current option is already selected
            const isSelected = judgeObj?.values?.includes(option.value);
            return (
              <li
                key={option.value} // Unique key for each item
                // When user clicks an option
                onClick={(e) => {
                  e.stopPropagation(); // Prevent closing the dropdown immediately
                  handleSelect(option.value); // Handle selecting/deselecting
                  if (!multiple) {
                    setOpen(false); // Close dropdown if single selection mode
                  }
                }}
                // Change background color when mouse hovers over the option
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
                }}
                // Reset background color when mouse leaves
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isSelected ? 'rgba(8, 93, 183, 0.25)' : 'white';
                }}
                style={{
                  ...styles.dropdownItem,
                  backgroundColor: isSelected ? 'rgba(8, 93, 183, 0.25)' : 'white',
                }}
              >
                {/* Show the label of the option */}
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

/* Styling for CustomDropdown component*/
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
