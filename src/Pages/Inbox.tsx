import ApplicationInfoCard from '@/FixedComponent/ApplicationInfoCard';
import { useAuth } from '@/utils/auth/AuthProvider';
import { useInbox } from '@/utils/global/InBoxProvider';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inbox: React.FC = () => {
  const navigate = useNavigate();
  const {inboxMessage} = useInbox();
  const {userInfo} = useAuth();

  const getList = () => {
    if (userInfo?.role === 'lecturer') {
      return (
        <div>
          {
            (inboxMessage || []).map((application, idx) => {
              const courseInfo = application?.courseInfo || {};
              return (
                <ApplicationInfoCard
                  key={idx}
                  courseInfo={courseInfo}
                  status={application?.status}
                  operation={(
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
      );
    }
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
