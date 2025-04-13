import ApplicationInfoCard from '@/FixedComponent/ApplicationInfoCard';
import Footer from '@/FixedComponent/Footer';
import ScrollerToggle from '@/FixedComponent/ScrollToggle';
import TutorApplicationFilterBar from '@/FixedComponent/TutorApplicationFilterBar';
import { useAuth } from '@/utils/auth/AuthProvider';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Define the list of lecturer application storage keys
const lecturerArr: string[] = [
  'lecturer1Applications', // Diploma/Vocational courses
  'lecturer2Applications', // Bachelor courses
  'lecturer3Applications'  // Other courses
];

const MyApplication = () => {
  // Initialize URL search parameters (e.g., ?status=approved)
  const [searchParams, setSearchParams] = useSearchParams();
  // Get the current user information (e.g., email, role)
  const { userInfo } = useAuth();
  const navigate = useNavigate(); // Navigation hook to move between pages
  const [applicationData, setApplicationData] = useState([]); // All applications submitted by the current user

  const [filterParams, setFilterParams] = useState({ 
    status: searchParams.get('status') || '' // Default filter based on URL 'status' param
  });

  const filteredApplications = useMemo(() => {
  // If no filter is applied (no status selected), return all applications
  if (!filterParams || !filterParams.status) return applicationData;
  // Otherwise, filter applications by status (e.g., only 'approved' applications)
  return applicationData.filter((application: any) => {
    const status = (application.status || 'processing').toLowerCase(); // Default to 'processing' if no status
    return status === filterParams.status.toLowerCase(); // Compare status case-insensitively
  });
}, [applicationData, filterParams]); // Recompute when applicationData or filterParams change

  // Reset the search filters back to default (show all applications)
const resetSearch = () => {
  setFilterParams({ status: '' }); // Clear local filter state
  setSearchParams({});             // Clear URL search params
};

// Confirm and apply new search filters
const confirmSearch = (param: { status: string }) => {
  setFilterParams(param);           // Update local filter state
  setSearchParams(param);           // Update URL search params so it's shareable/bookmarkable
}

useEffect(() => {
  // When userInfo changes, reload their applications
  const applyData = lecturerArr.reduce((acc, cur) => {
    // Fetch applications from localStorage for each lecturer (lecturer1Applications, lecturer2Applications, etc.)
    const applications = JSON.parse(localStorage.getItem(cur) || '[]');
    // Check each application
    applications.forEach((application: any) => {
      // If the application's applicant email matches the current user's email
      if (application.applicantEmail === userInfo?.email) {
        acc.push(application); // Add this application to the final result
      }
    });
    return acc; // Accumulate all matched applications
  }, [] as any); // Initialize accumulator as an empty array

  // Set the collected applications into state
  setApplicationData(applyData);
}, [userInfo]);


  return (
    <div
      style={styles.pageWrapper}
    >
      <div style={styles.container}>
        <div>
          {/* Filter Bar for tutor to filter by status */}
          <TutorApplicationFilterBar
            onSearch={confirmSearch}
            onReset={resetSearch}
            value={filterParams}
          />
        </div>
        {/* List of filtered applications */}
        <div style={{ flex: 1 }}>
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
                    <> {/* Course and Application Details */}
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

// Styling for MyApplication
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
