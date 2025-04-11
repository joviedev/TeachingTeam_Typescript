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
  const [dataSource, setDataSource] = useState<ApplicationInterface[]>([]);

  useEffect(() => {
    const totalApplications = getAllApplications();
    setDataSource(totalApplications);
  }, []);

  const { filteredItems, setFilters, setItems, filters } = useApplicationFilter({initialItems: dataSource});

  useEffect(() => {
    setItems(dataSource);
  }, [dataSource]);

  return (
    <PageContainer className='lecturer-dashboard'>
      <div>
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
                        displayFields.map((field) => {
                          const fieldIndex = field.dataIndex;
                          const fieldValue = item[fieldIndex];
                          const displayValue = fieldValue ? Array.isArray(fieldValue) ? fieldValue.join(', ') : item[fieldIndex] : '--';
                          return (
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
