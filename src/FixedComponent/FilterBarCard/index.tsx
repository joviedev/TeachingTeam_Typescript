import { FC, useEffect, useMemo, useState } from 'react';
import CustomDropdown from '../CustomDropdown';
import './style.css';

/**
 * FilterBarCard component for TeachTeam.
 * 
 * - Dynamically renders a set of filter dropdowns and inputs based on the provided dataSource.
 * - Supports search by text, time-based filters (e.g., availability per day), and sorting (asc/desc).
 * - Accepts and maintains filter values through props and local state.
 * - Calls onSearch with all selected filters when the "Search" button is clicked.
 * - Calls onReset when the "Reset" button is clicked.
 * - Uses CustomDropdown for consistent styling and multi-select support.
 */

// Defines a selectable option for dropdowns
interface Option {
  label: string;
  value: string;
}
// Defines the configuration for each filter item in the FilterBarCard
interface FilterItemType {
  dataIndex: string;        // Key name to store the selected value 
  options?: Option[];       // List of options if the filter uses a dropdown
  placeholder?: string;     // Placeholder text for input or dropdown
  type?: string;            // Type of filter 
  multiple?: boolean;       // Whether the user can select multiple options for dropdown
  days?: string[];          // Days of the week which only applied for timeForDay type filters
}
// Defines the possible value types for each filter:
// - A single string
// - An array of strings
// - Or a record where each key maps to an array of strings (used for time slots)
export type SingleValue = string | string[] | Record<string, string[]>;
// Defines the props that the FilterBarCard component expects
interface FilterBarCardProps {
  sortOptions?: Option[]; // Optional sorting options for the sort dropdown 
  dataSource: FilterItemType[]; // List of filters to display 
  onSearch: (value: Record<string, SingleValue>) => void; // Function to handle search action with selected filter values
  onReset?: () => void; // Optional function to reset all filters
  value?: Record<string, SingleValue>; // Optional initial filter values to pre-fill the form
}

// FilterBarCard component for dynamic filtering and sorting
const FilterBarCard: FC<FilterBarCardProps> = ({ sortOptions, dataSource, onReset, onSearch, value }) => {
  // Store the currently selected filter values
  const [selectedValue, setSelectedValue] = useState<Record<string, SingleValue>>({});

  // Update selected values whenever the incoming 'value' prop changes
  useEffect(() => {
    setSelectedValue(value || {}); // If no value provided, default to an empty object
  }, [value]);

  // Memoize the current sort configuration on sort field and sort order
  // Example: ['courseName', 'asc'] or ['createdAt', 'desc']
  const sortConfig: string[] = useMemo(() => {
    if (selectedValue.sort) {
      return selectedValue.sort as string[]; // Use the user's selected sort settings if available
    }
    return ['', 'asc']; // Default sort: no field selected, ascending order
  }, [selectedValue]);

  return (
    <div className='filter-bar-card'>
      {/* Container for all filter options */}
      <div className='option-wrapper'>
        {/* If there are sort options available, show the sort dropdowns */}
        {!!(sortOptions || []).length && (
          <div className='filter-sort'>
            {/* Dropdown to select sort order (Asc or Desc) */}
            <CustomDropdown<SingleValue>
              options={sortOptions || []}
              key={'sortby'}
              value={sortConfig[0] || ''}
              placeholder='Sort By'
              onChange={(value: SingleValue) => {
                const nsort = [value, sortConfig[1]]; // Current selected sort field
                setSelectedValue((prev) => ({ ...prev, sort: nsort as string[] }));
              }}
            />
            <CustomDropdown<string>
              style={{ minWidth: '40px' }}
              options={[{ label: 'Asc', value: 'asc' }, { label: 'Desc', value: 'desc' }]}
              key={'order'}
              value={sortConfig[1] || ''} // Current selected sort order
              onChange={(value: SingleValue) => {
                const nsort = [sortConfig[0], value];
                setSelectedValue((prev) => ({ ...prev, sort: nsort as string[] }));
              }}
            />
          </div>
        )}
        { 
        // {/* Loop through each filter item in the dataSource */}
          (dataSource || []).map((item: FilterItemType) => {
            // If the filter type is 'input'
            if (item.type === 'input') {
              return (
                <input
                  placeholder='Search...'
                  onChange={(e) => {
                    setSelectedValue((prev) => ({ ...prev, [item.dataIndex]: e.target.value }));
                  }}
                  key={item.dataIndex}
                  value={(selectedValue[item.dataIndex] as string) || ''}
                />
              );
            }
            // If the filter type is 'timeForDay' (select time slots for each day)
            if (item.type === 'timeForDay') {
              const availability: Record<string, string[]> = (selectedValue[item.dataIndex] as Record<string, string[]>) || {};
              return (
                <div key={'availability'} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {item.days?.map((day: string) => (
                    <div key={day} style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                      <span style={{marginBottom: '10px'}}>{day}</span>
                      {/* Dropdown to select time slots for that day */}
                      <CustomDropdown<SingleValue>
                        style={{ padding: '5px'}}
                        options={item.options || []}
                        multiple={true}
                        maxLength={2}
                        key={item.dataIndex}
                        placeholder={day}
                        value={availability[day]}
                        onChange={(value: SingleValue) => {
                          setSelectedValue((prev) => ({ ...prev, [item.dataIndex]: {...availability, [day]: value as string[] } }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              );
            }
            // Otherwise (default: dropdown filter)
            return (
              <CustomDropdown<SingleValue>
                options={item.options || []}
                multiple={item.multiple}
                key={item.dataIndex}
                placeholder={item.placeholder || ''}
                value={selectedValue[item.dataIndex] || ''}
                onChange={(value: SingleValue) => {
                  setSelectedValue((prev) => ({ ...prev, [item.dataIndex]: value }));
                }}
              />
            );
          })
        }
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
              onSearch(selectedValue);
            }
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterBarCard;
