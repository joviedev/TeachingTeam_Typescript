import { FC, useEffect, useMemo, useState } from 'react';
import CustomDropdown from '../CustomDropdown';
import './style.css';

interface Option {
  label: string;
  value: string;
}
interface FilterItemType {
  dataIndex: string;
  options?: Option[],
  placeholder?: string;
  type?: string;
  multiple?: boolean;
  days?: string[];
}

export type SingleValue = string | string[] | Record<string, string[]>;
interface FilterBarCardProps {
  sortOptions?: Option[];
  dataSource: FilterItemType[];
  onSearch: (value: Record<string, SingleValue>) => void;
  onReset?: () => void;
  value?: Record<string, SingleValue>;
}

const FilterBarCard: FC<FilterBarCardProps> = ({sortOptions, dataSource, onReset, onSearch, value}) => {
  const [selectedValue, setSelectedValue] = useState<Record<string, SingleValue>>({});

  useEffect(() => {
    setSelectedValue(value || {});
  }, [value]);

  const sortConfig: string[] = useMemo(() => {
    if (selectedValue.sort) {
      return selectedValue.sort as string[];
    }
    return ['', 'asc'];
  }, [selectedValue]);

  return (
    <div className='filter-bar-card'>
      <div className='option-wrapper'>
        {!!(sortOptions || []).length && (
          <div className='filter-sort'>
            <CustomDropdown<SingleValue>
              options={sortOptions || []}
              key={'sortby'}
              value={sortConfig[0] || ''}
              placeholder='Sort By'
              onChange={(value: SingleValue) => {
                const nsort = [value, sortConfig[1]];
                setSelectedValue((prev) => ({ ...prev, sort: nsort as string[] }));
              }}
            />
            <CustomDropdown<string>
              style={{ minWidth: '40px' }}
              options={[{ label: 'Asc', value: 'asc' }, { label: 'Desc', value: 'desc' }]}
              key={'order'}
              value={sortConfig[1] || ''}
              onChange={(value: SingleValue) => {
                const nsort = [sortConfig[0], value];
                setSelectedValue((prev) => ({ ...prev, sort: nsort as string[] }));
              }}
            />
          </div>
        )}
        {
          (dataSource || []).map((item: FilterItemType) => {
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
            if (item.type === 'timeForDay') {
              const availability: Record<string, string[]> = (selectedValue[item.dataIndex] as Record<string, string[]>) || {};
              return (
                <div key={'availability'} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {item.days?.map((day: string) => (
                    <div key={day} style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                      <span style={{marginBottom: '10px'}}>{day}</span>
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
