import FilterBarCard, { SingleValue } from '@/FixedComponent/FilterBarCard';
import PageContainer from '@/FixedComponent/PageContainer';
import { courseOptions } from '@/FixedComponent/SearchFilterBar';
import useApplicationFilter from '@/utils/hook/userFilter';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './style.css';
import ApplicationInfoCard from '@/FixedComponent/ApplicationInfoCard';
import { ApplicationInterface } from '../ApplyForm';
import { getAllApplications } from '@/utils/application';

// Define which fields to display inside each application card
const displayFields: {label: string, dataIndex: keyof ApplicationInterface}[] = [
  {
    label: 'Full Name',
    dataIndex: 'fullName'
  },
  {
    label: 'Gender',
    dataIndex: 'gender'
  },
  {
    label: 'Skills',
    dataIndex: 'skills'
  },
  {
    label: 'Role Type',
    dataIndex: 'roleType'
  },
  {
    label: 'GPA',
    dataIndex: 'academicResult'
  }
];

const LecturerDashboard = () => {
  // Store all applications
  const [dataSource, setDataSource] = useState<ApplicationInterface[]>([]);

  // Load applications from localStorage
  useEffect(() => {
    const totalApplications = getAllApplications();
    setDataSource(totalApplications);
  }, []);

  // Initialize and manage filtering logic 
  const { filteredItems, setFilters, setItems, filters } = useApplicationFilter({initialItems: dataSource});

  // Update the filter items whenever the data source changes
  useEffect(() => {
    setItems(dataSource);
  }, [dataSource]);

  return (
    // Page layout container with a heading and content
    <PageContainer className='lecturer-dashboard'>
      <div>
      {/* Heading with animation effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.headingMotion}
        >
          All Applications
        </motion.div>
      </div>
      <div className='content'>
        <div>
        {/* Filter bar to filter applications by course and selection count */}
          <FilterBarCard
            dataSource={[
              { dataIndex: 'course', options: courseOptions },
              {
                dataIndex: 'selectedCount',
                options: [
                  {label: 'All', value: ''},
                  {label: 'Most Selected', value: 'mostSelected'},
                  {label: 'Least Selected', value: 'leastSelected'},
                  {label: 'No Selected', value: 'noSelected'}
                ]
              }
            ]}
            value={filters as Record<string, SingleValue>}
            onSearch={setFilters}
            onReset={() => setFilters({})}
          />
        </div>
        <div className='right'>
          <h2>
            Found {filteredItems.length} Applications
          </h2>
          <div>
          {/* Display list of applications based on filter */}
            {
              (filteredItems || []).map((item, idx) => {
                return (
                  <ApplicationInfoCard
                    courseInfo={item?.courseInfo}
                    status={item?.status}
                    key={idx}
                  >
                    <div className='field-wrapper'>
                      {
                        displayFields.map((field) => { // Render each application field like name, skills, GPA
                          // Get the field name and value for the current application
                          const fieldIndex = field.dataIndex;
                          const fieldValue = item[fieldIndex];
                          // If the value is an array (like skills), join it into a single string
                          // If the value is missing, show "--" instead
                          const displayValue = fieldValue ? Array.isArray(fieldValue) ? fieldValue.join(', ') : item[fieldIndex] : '--';
                          return (
                            // Display each field (label + value) using SingleItem
                            <SingleItem
                              key={fieldIndex}
                              label={field.label}
                              value={displayValue as string}
                            />
                          );
                        })
                      }
                    </div>
                  </ApplicationInfoCard>
                );
              })
            }
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

type SingleItemProps = {
  label: string;
  value: string;
};
// SingleItem component: displays a label and its corresponding value
const SingleItem = ({label, value}: SingleItemProps) => {
  return (
    <div className='single-info-item'>
      <label>
        {label}
      </label>
      <div>
        {value}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  headingMotion: {
    fontSize: '36px',
    fontWeight: 800,
    color: '#085DB7',
    textAlign: 'center'
  }
};

export default LecturerDashboard;
