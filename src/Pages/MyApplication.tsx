import ApplicationInfoCard from '@/FixedComponent/ApplicationInfoCard';
import Footer from '@/FixedComponent/Footer';
import ScrollerToggle from '@/FixedComponent/ScrollToggle';
import TutorApplicationFilterBar from '@/FixedComponent/TutorApplicationFilterBar';
import { useAuth } from '@/utils/auth/AuthProvider';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const lecturerArr: string[] = [
  'lecturer1Applications', 'lecturer2Applications', 'lecturer3Applications'
];

const MyApplication = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const { userInfo } = useAuth();

  const [applicationData, setApplicationData] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '');

  const filteredApplications = useMemo(() => {
    if (!selectedStatus) return applicationData;
    return applicationData.filter((application: any) => {
      const status = (application.status || 'processing').toLowerCase();
      return status === selectedStatus.toLowerCase();
    });
  }, [applicationData, selectedStatus]);

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
            status={selectedStatus}
            onChange={setSelectedStatus}
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
                return (
                  <ApplicationInfoCard
                    key={idx}
                    courseInfo={application?.coursetInfo}
                    status={application?.status}
                  />
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
