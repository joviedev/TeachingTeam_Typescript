import FilterBarCard, { SingleValue } from '@/FixedComponent/FilterBarCard';
import PageContainer from '@/FixedComponent/PageContainer';
import { courseOptions } from '@/FixedComponent/SearchFilterBar';
import { useEffect, useRef, useState } from 'react';
import { ApplicationInterface } from './ApplyForm';
import { useAuth } from '@/utils/auth/AuthProvider';
import TutorInfoCard from '@/FixedComponent/TutorInfoCard';
import { filterApplications } from '@/utils/application';
import {daysOfWeek, skillOptions, timeOptions} from '@/utils/constant';

const getLocalTutorOrder = (lecturerEmail: string) => {
  const data = localStorage.getItem('tutorOrder');
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      return parsedData[lecturerEmail] || {};
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return {};
    }
  }
  return {};
}

const setLocalTutorOrder = (lecturerEmail: string, order: Record<string, number>) => {
  const data = localStorage.getItem('tutorOrder');
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      parsedData[lecturerEmail] = order;
      localStorage.setItem('tutorOrder', JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }
  } else {
    const newData = { [lecturerEmail]: order };
    localStorage.setItem('tutorOrder', JSON.stringify(newData));
  }
}

const ReviewTutors = () => {
  const allApplications = useRef<ApplicationInterface[]>([]);
  const { userInfo } = useAuth();

  const [tutorOrder, setTutorOrder] = useState<Record<string, number>>(getLocalTutorOrder(userInfo?.email || ''));
  const [tutorMap, setTutorMap] = useState<Record<string, ApplicationInterface[]>>({});
  const [searchParams, setSearchParams] = useState<Record<string, SingleValue>>({});

  const filterTutors = (applications: ApplicationInterface[]) => {
    let tutorMap: Record<string, ApplicationInterface[]> = {};
    applications.forEach((application) => {
      const { applicantEmail: email } = application;
      if (tutorMap[email]) {
        tutorMap[email].push(application);
      } else {
        tutorMap[email] = [application];
      }
    });
    const [sortKey, sortOrder] = (searchParams['sort'] || []) as string[];
    if (sortKey === 'priority') {
      const sortTutorEmail = Object.keys(tutorMap).sort((a, b) => {
        const aPriority = tutorOrder[a] || 0;
        const bPriority = tutorOrder[b] || 0;
        return sortOrder === 'asc' ? aPriority - bPriority : bPriority - aPriority;
      });
      tutorMap = sortTutorEmail.reduce((acc, email) => {
        acc[email] = tutorMap[email];
        return acc;
      }, {} as Record<string, ApplicationInterface[]>);
    }
    setTutorMap(tutorMap);
  }

  useEffect(() => {
    const applications = allApplications.current || [];
    filterTutors(filterApplications(applications, searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (userInfo) {
      const { email } = userInfo || {};
      setTutorOrder(getLocalTutorOrder(email || ''));
      const lecturer = email?.split('@')[0] || '';
      if (!lecturer) {
        return;
      }
      const data = JSON.parse(localStorage.getItem(`${lecturer}Applications`) || '[]');
      allApplications.current = data || [];
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
            { label: 'Priority', value: 'priority' },
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
          {Object.keys(tutorMap).length} tutors found
        </h2>
        <div>
          {
            Object.entries(tutorMap ?? {}).map(([email, applications], idx) => {
              const fullName = applications[0].fullName;
              const academicResult = applications[0].academicResult;
              const skills = applications.map((a) => a.skills).flat();
              return (
                <TutorInfoCard
                  key={email}
                  email={email}
                  fullName={fullName}
                  skills={skills}
                  academicResult={academicResult}
                  applications={applications}
                  order={tutorOrder[email] || (idx + 1)}
                  onOrderChange={(email, order) => {
                    const newOrder = { ...tutorOrder, [email]: order };
                    setTutorOrder(newOrder);
                    setLocalTutorOrder(userInfo?.email || '', newOrder);
                  }}
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
