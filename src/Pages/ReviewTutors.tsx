import FilterBarCard, { SingleValue } from '@/FixedComponent/FilterBarCard';
import PageContainer from '@/FixedComponent/PageContainer';
import { courseOptions } from '@/FixedComponent/SearchFilterBar';
import { useEffect, useRef, useState } from 'react';
import { ApplicationInterface } from './ApplyForm';
import { useAuth } from '@/utils/auth/AuthProvider';
import TutorInfoCard from '@/FixedComponent/TutorInfoCard';
import { filterApplications } from '@/utils/application';
import {daysOfWeek, skillOptions, timeOptions} from '@/utils/constant';

const ReviewTutors = () => {
  const allApplications = useRef<ApplicationInterface[]>([]);
  const { userInfo } = useAuth();

  const [displayedApplications, setDisplayedApplications] = useState<ApplicationInterface[]>([]);
  const [tutorMap, setTutorMap] = useState<Record<string, ApplicationInterface[]>>({});
  const [searchParams, setSearchParams] = useState<Record<string, SingleValue>>({});

  const filterTutors = (applications: ApplicationInterface[]) => {
    const tutorMap: Record<string, ApplicationInterface[]> = {};
    applications.forEach((application) => {
      const { applicantEmail: email } = application;
      if (tutorMap[email]) {
        tutorMap[email].push(application);
      } else {
        tutorMap[email] = [application];
      }
    });
    setTutorMap(tutorMap);
  }

  useEffect(() => {
    const applications = allApplications.current || [];
    filterTutors(filterApplications(applications, searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (userInfo) {
      const { email } = userInfo || {};
      const lecturer = email?.split('@')[0] || '';
      if (!lecturer) {
        return;
      }
      const data = JSON.parse(localStorage.getItem(`${lecturer}Applications`) || '[]');
      allApplications.current = data || [];
      setDisplayedApplications(data || []);
      filterTutors(allApplications.current);
    }
  }, [userInfo]);

  return (
    <PageContainer className='lecturer-applications'>
      <div>
        <FilterBarCard
          sortOptions={[
            { label: 'Course Title', value: 'courseTitle' },
            { label: 'Availability', value: 'availability' },
          ]}
          dataSource={[
            { dataIndex: 'course', options: courseOptions },
            {
              dataIndex: 'skill',
              multiple: true,
              options: [
                { value: '', label: 'All Skills' },
                ...skillOptions
              ]
            },
            {
              dataIndex: 'status',
              placeholder: 'All Status',
              multiple: true,
              options: [
                { value: 'processing', label: 'Processing' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' }
              ]
            },
            {
              dataIndex: 'keyword',
              type: 'input'
            },
            {
              dataIndex: 'availability',
              type: 'timeForDay',
              options: timeOptions,
              days: daysOfWeek
            }
          ]}
          onSearch={setSearchParams}
          onReset={() => setSearchParams({})}
          value={searchParams}
        />
      </div>
      <div className='right'>
        <h2>
          {displayedApplications.length} applications found
        </h2>
        <div>
          {
            Object.values(tutorMap ?? {}).map((applications, idx) => {
              const fullName = applications[0].fullName;
              const academicResult = applications[0].academicResult;
              const skills = applications.map((a) => a.skills).flat();
              return (
                <TutorInfoCard
                  key={idx}
                  fullName={fullName}
                  skills={skills}
                  academicResult={academicResult}
                  applications={applications}
                />
              );
            })
          }
        </div>
      </div>
    </PageContainer>
  );
};

export default ReviewTutors;
