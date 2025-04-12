import ApplicationInfoCard from '@/FixedComponent/ApplicationInfoCard';
import { useAuth } from '@/utils/auth/AuthProvider';
import { useInbox } from '@/utils/global/InBoxProvider';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inbox: React.FC = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const { inboxMessage } = useInbox(); // Custom hook to fetch user's inbox messages
  const { userInfo } = useAuth(); // Custom hook to get currently signed-in user's information

  const getList = () => {
    // If the user is a lecturer, show their applications
    if (userInfo?.role === 'lecturer') {
      return (
        <div>
          {
            (inboxMessage || []).map((application, idx) => { // Loop through inbox messages (applications)
              const courseInfo = application?.courseInfo || {}; // Get course info from each application
              return (
                <ApplicationInfoCard
                  key={idx} // Always provide a unique key when mapping
                  courseInfo={courseInfo} // Pass course info to the card component
                  status={application?.status} // Pass the application status (e.g., approved, processing)
                  operation={(
                    <button
                      className='primary-button'
                      onClick={() => {
                        navigate(`/applications/${application?.id}`); // When button is clicked, navigate to application detail page
                      }}
                    >
                      View Detail
                    </button>
                  )}
                >  
                 <div className='application-info'>
                  {/* Display course location in uppercase */}
                  <p className='location'>{courseInfo.location.toUpperCase()}</p>

                  {/* Display course description */}
                  <p className='description'>{courseInfo.description}</p>

                  {/* Display course date */}
                  <p>{courseInfo.date}</p>

                  {/* Display course time */}
                  <p>{courseInfo.time}</p>

                  {/* Applicant's full name */}
                  <div className='single'>
                    <label>Applicant: </label>
                    <span>{application.fullName}</span>
                  </div>

                  {/* Applicant's skills (joined by comma) */}
                  <div className='single'>
                    <label>Skills: </label>
                    <span>{application.skills.join(',')}</span>
                  </div>

                  {/* Applicant's GPA */}
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
      );
    }
    // if user signed in as tutor
    if (userInfo?.role === 'tutor') {
      return (
        <div>
          {
            inboxMessage.map((application: any, idx: number) => {
              const courseInfo = application?.courseInfo || {};
              return (
                <ApplicationInfoCard
                  key={idx}
                  courseInfo={courseInfo}
                  operation={(
                    <button
                      className='primary-button'
                      onClick={() => { // Navigate to tutor's own application detail page
                        navigate(`/my-applications/${application?.id}`);
                      }}
                    >
                      View Detail
                    </button>
                  )}
                  status={application?.status}
                >
                  {/* Tutor Application Info Card Content */} <>
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
      );
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '1rem' }}>
        📬 Inbox – {userInfo?.role === 'lecturer' ? 'you have received new applications' : 'you have received new updates on your application '}
      </h2>
      {inboxMessage.length === 0 ? (
        <p style={{ color: '#64748b' }}>
          {userInfo?.role === 'lecturer' ? 'No applications received yet.' : 'No applications update.'}
        </p>
      ) : getList()}
    </div>
  );
};

export default Inbox;
