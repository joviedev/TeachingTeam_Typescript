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
import { useNavigate } from 'react-router-dom';

// Applications page for lecturers to review student applications
const Applications = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth(); // Get the logged-in user's info
  // State to store all applications
  const [applications, setApplications] = useState<ApplicationInterface[]>([]);
  // State to store search/filter values
  const [searchParams, setSearchParams] = useState<Record<string, SingleValue>>({});

  // Load applications from localStorage based on lecturer's email
  useEffect(() => {
    const { email } = userInfo || {}; // Get the logged-in user's email
    const lecturer = email?.split('@')[0] || ''; // Extract lecturer ID (before @)
    if (!lecturer) { 
      return; // If no lecturer info, stop
    }
    // Get stored applications for this lecturer
    const data = JSON.parse(localStorage.getItem(`${lecturer}Applications`) || '[]');
    setApplications(data || []); // Save to local state
  }, [userInfo]);

  // Filter applications based on search filters (course, skill, keyword)
  const displayedApplications: ApplicationInterface[] = useMemo(() => {
    return filterApplications(applications, searchParams);
  }, [applications, searchParams]);

  return (
    <PageContainer className='lecturer-applications'>
      {/* Filter bar at the top to filter by course, skill, or keyword */}
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
          onSearch={setSearchParams} // Update search parameters
          onReset={() => setSearchParams({})} // Clear all filters
          value={searchParams} // Current selected filters
        />
      </div>
      {/* Display filtered application cards */}
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
                  operation={( // Button to view full application details
                    <button
                      className='primary-button'
                      onClick={() => {
                        navigate(`/applications/${application?.id}`);
                      }}
                    >
                      View Detail
                    </button>
                  )}
                >
                  {/* Short applicant info inside the card */}
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
                      <label>Previous Role: </label>
                      <span>{application.previousRole || 'N/A'}</span>
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
