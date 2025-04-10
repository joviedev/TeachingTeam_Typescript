import FilterBarCard, { SingleValue } from '@/FixedComponent/FilterBarCard';
import { courseOptions } from '@/FixedComponent/SearchFilterBar';
import { useAuth } from '@/utils/auth/AuthProvider';
import { useEffect, useMemo, useState } from 'react';
import { ApplicationInterface } from '../ApplyForm';
import PageContainer from '@/FixedComponent/PageContainer';
import ApplicationInfoCard from '@/FixedComponent/ApplicationInfoCard';
import './style.css';
import { skillOptions } from '@/utils/constant';
import { filterApplications } from '@/utils/application';

const Applications = () => {
  const { userInfo } = useAuth();

  const [applications, setApplications] = useState<ApplicationInterface[]>([]);

  const [searchParams, setSearchParams] = useState<Record<string, SingleValue>>({});

  // extract applications
  useEffect(() => {
    const { email } = userInfo || {};
    const lecturer = email?.split('@')[0] || '';
    if (!lecturer) {
      return;
    }
    const data = JSON.parse(localStorage.getItem(`${lecturer}Applications`) || '[]');
    setApplications(data || []);
  }, [userInfo]);

  const displayedApplications: ApplicationInterface[] = useMemo(() => {
    // const validParams = Object.entries((searchParams || {})).filter(([_, value]) => value !== '' && value !== undefined);
    // if (validParams.length === 0) {
    //   return applications;
    // }
    // return applications.filter((application) => {
    //   return validParams.every(([key, value]) => {
    //     if (key === 'skill') {
    //       return (value as string[]).every((skill: string) => application.skills.includes(skill));
    //     } else if (key === 'course') {
    //       return application.courseInfo?.courseType.toLowerCase() === (value as string).toLowerCase();
    //     } else if (key === 'keyword') {
    //       return application.courseInfo.title.toLowerCase().includes((value as string).toLowerCase()) || application.fullName.toLowerCase().includes((value as string).toLowerCase());
    //     }
    //     return true;
    //   });
    // });
    return filterApplications(applications, searchParams);
  }, [applications, searchParams]);

  return (
    <PageContainer className='lecturer-applications'>
      <div>
        <FilterBarCard
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
              dataIndex: 'keyword',
              type: 'input'
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
            (displayedApplications || []).map((application, idx) => {
              const courseInfo = application?.courseInfo || {};
              return (
                <ApplicationInfoCard
                  key={idx}
                  courseInfo={courseInfo}
                  status={application?.status}
                >
                  <div className='application-info'>
                    <p className='location'>{courseInfo.location.toUpperCase()}</p>
                    <p className='description'>{courseInfo.description}</p>
                    <p>{courseInfo.date}</p>
                    <p>{courseInfo.time}</p>
                    <div className='single'>
                      <label>Applicant: </label>
                      <span>{application.fullName}</span>
                    </div>
                    <div className='single'>
                      <label>Skills: </label>
                      <span>{application.skills.join(',')}</span>
                    </div>
                    <div className='single'>
                      <label>GPA: </label>
                      <span>{application.academicResult}</span>
                    </div>
                  </div>
                </ApplicationInfoCard>
              );
            })
          }
        </div>
      </div>
    </PageContainer>
  );
};

export default Applications;
