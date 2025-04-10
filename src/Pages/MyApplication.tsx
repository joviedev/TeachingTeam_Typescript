import ApplicationInfoCard from '@/FixedComponent/ApplicationInfoCard';
import Footer from '@/FixedComponent/Footer';
import ScrollerToggle from '@/FixedComponent/ScrollToggle';
import TutorApplicationFilterBar from '@/FixedComponent/TutorApplicationFilterBar';
import { useAuth } from '@/utils/auth/AuthProvider';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const lecturerArr: string[] = [
  'lecturer1Applications', 'lecturer2Applications', 'lecturer3Applications'
];

const MyApplication = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [applicationData, setApplicationData] = useState([]);

  const [filterParams, setFilterParams] = useState({ status: searchParams.get('status') || '' });

  const filteredApplications = useMemo(() => {
    if (!filterParams || !filterParams.status) return applicationData;
    return applicationData.filter((application: any) => {
      const status = (application.status || 'processing').toLowerCase();
      return status === filterParams.status.toLowerCase();
    });
  }, [applicationData, filterParams]);

  const resetSearch = () => {
    setFilterParams({ status: '' });
    setSearchParams({});
  };

  const confirmSearch = (param: { status: string }) => {
    setFilterParams(param);
    setSearchParams(param);
  }

  useEffect(() => {
    const applyData = lecturerArr.reduce((acc, cur) => {
      const applications = JSON.parse(localStorage.getItem(cur) || '[]');
      applications.forEach((appication: any) => {
        if (appication.applicantEmail === userInfo?.email) {
          acc.push(appication);
        }
      });
      return acc;
    }, [] as any);
    setApplicationData(applyData);
  }, [userInfo]);

  return (
    <div
      style={styles.pageWrapper}
    >
      <div style={styles.container}>
        <div>
          <TutorApplicationFilterBar
            onSearch={confirmSearch}
            onReset={resetSearch}
            value={filterParams}
          />
        </div>
        <div
          style={{
            flex: 1
          }}
        >
          <h2 style={styles.heading}>{filteredApplications.length} applications found</h2>
          <div>
            {
              filteredApplications.map((application: any, idx: number) => {
                const courseInfo = application?.courseInfo || {};
                return (
                  <ApplicationInfoCard
                    key={idx}
                    courseInfo={courseInfo}
                    operation={(
                      <button
                        className='primary-button'
                        onClick={() => {
                          navigate(`/my-applications/${application?.id}`);
                        }}
                      >
                        View Detail
                      </button>
                    )}
                    status={application?.status}
                  >
                    <>
                      <p className='location'>{courseInfo.location.toUpperCase()}</p>
                      <p className='description'>{courseInfo.description}</p>
                      <p>{courseInfo.date}</p>
                      <p>{courseInfo.time}</p>
                      <p>{courseInfo.spacesLeft} spaces left</p>
                    </>
                  </ApplicationInfoCard>
                );
              })
            }
          </div>
        </div>
      </div>
      <ScrollerToggle />
      <Footer />
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '30px 20px',
    display: 'flex',
    gap: '30px',
  },
  heading: {
    margin: '0 0 20px',
    fontSize: '22px',
    fontWeight: 600,
  },
};

export default MyApplication;
