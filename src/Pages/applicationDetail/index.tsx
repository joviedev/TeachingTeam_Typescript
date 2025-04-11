import PageContainer from '@/FixedComponent/PageContainer';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationInterface, CourseType } from '../ApplyForm';
import { getApplicationById, updateApplication } from '@/utils/application';
import ApplicationForm, { ApplicationFormHandle } from '@/Component/ApplicationForm';
import MessageModal from '@/FixedComponent/MessageModal';
import ApplyStatus from '@/FixedComponent/ApplyStatus';
import { daysOfWeek } from '@/utils/constant';
import { MdCheck } from 'react-icons/md';

const ApplicationDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [applicationDetail, setApplicationDetail] = useState<ApplicationInterface | null>(null);

  const [selectStatus, setSelectStatus] = useState<string>('');

  const [inputReview, setInputReview] = useState<string | undefined>(undefined);

  const { status = 'processing', reviewContent } = applicationDetail || {};

  const isReviewed = useMemo(() => status !== 'processing', [status]);

  const [showMessageModal, setShowMessageModal] = useState(false);

  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    const detail = getApplicationById(id);
    if (id && detail && !detail.isLecturerRead) {
      detail.isLecturerRead = true;
      updateApplication(id, detail);
    }
    setApplicationDetail(detail);
  }, [id]);

  const confirmEdit = () => {
    if (id) {
      if (!inputReview || !selectStatus || selectStatus === 'processing') {
        setShowTips(true);
        setTimeout(() => {
          setShowTips(false);
        }, 2000);
        return;
      };
      const newApplication = {...applicationDetail, status: selectStatus, reviewContent: inputReview} as ApplicationInterface;
      setApplicationDetail(newApplication);
      updateApplication(id, newApplication);
      setShowMessageModal(true);
      setTimeout(() => {
        setShowMessageModal(false);
      }, 2000);
    }
  };

  const courseInfo: CourseType | undefined = useMemo(() => {
    return applicationDetail?.courseInfo;
  }, [applicationDetail]);

  const isOk = !!selectStatus && selectStatus !== 'processing' && !!inputReview;

  return (
    <PageContainer>
      <div style={styles.pageWrapper}>
        <div style={styles.top}>
          <button
            className='primary-button'
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          <ApplyStatus status={status} />
        </div>
        <header style={styles.pageTitle}>
          <h3 style={styles.titleHeader}>
            Application for {applicationDetail?.courseInfo?.title}
          </h3>
        </header>
        <section style={styles.section}>
          <h3>{applicationDetail?.fullName}</h3>
          <span>{courseInfo?.courseType.toUpperCase()}</span>
          <div>
            <p>{courseInfo?.location.toUpperCase()}</p>
            <p>{courseInfo?.description}</p>
            <p>{courseInfo?.date}</p>
            <p>{courseInfo?.time}</p>
            <p>
              <label>Applicant: </label>
              <span>{applicationDetail?.fullName}</span>
            </p>
            <p>
              <label>Skills: </label>
              <span>{applicationDetail?.skills.join(',')}</span>
            </p>
            <p>
              <label>GPA: </label>
              <span>{applicationDetail?.academicResult}</span>
            </p>
            <p>
              <label>availability: </label>
              {daysOfWeek.map((day) => {
                const slots = applicationDetail?.availability[day] || [];
                if (slots.length === 0) {
                  return null;
                }
                return (
                  <div key={day} style={styles.availabilityStyle}>
                    {day}: {slots.join(', ')}
                  </div>
                )})}
            </p>
          </div>
        </section>
        <div
          style={{
            ...styles.operationWrapper,
            justifyContent: 'space-between',
            padding: '10px 0',
            display: isReviewed ? 'none' : 'flex',
          }}
        >
          <button
            className='primary-button approved'
            style={{
              width: '160px',
              opacity: !!selectStatus && selectStatus !== 'approved' ? 0.5 : 1
            }}
            key='approve'
            onClick={
              () => {
                setSelectStatus('approved');
              }
            }
          >
            Approve
          </button>
          <button
            className='primary-button'
            style={{
              width: '160px',
              opacity: !!selectStatus && selectStatus !== 'processing' ? 0.5 : 1,
              pointerEvents: 'none'
            }}
            disabled
            key='pending'
            onClick={
              () => {
                setSelectStatus('processing');
              }
            }
          >
            Pending
          </button>
          <button
            className='primary-button rejected'
            style={{
              width: '160px',
              opacity: !!selectStatus && selectStatus !== 'rejected' ? 0.5 : 1
            }}
            key='reject'
            onClick={
              () => {
                setSelectStatus('rejected');
              }
            }
          >
            Reject
          </button>
        </div>
        <p style={{ ...styles.tips, display: showTips ? 'block' : 'none' }}>
          Please select Accept or Reject and enter your review
        </p>
        <div>
          <h3 style={styles.reviewHeader}>
            Review From Lecturer:
          </h3>
          <section style={styles.section}>
            {isReviewed ? (reviewContent) : (
              <textarea
                style={styles.textarea}
                placeholder='Please write your review here'
                onChange={(e) => {
                  setInputReview(e.target.value);
                }}
              />
            )}
          </section>
        </div>
        <div
          style={{
            ...styles.operationWrapper,
            display: isReviewed ? 'none' : 'flex',
          }}
        >
          <button
            className='primary-button'
            style={{ width: '30%', marginTop: '40px', opacity: isOk ? 1 : 0.5, pointerEvents: isOk ? 'auto' : 'none' }}
            disabled={!isOk}
            key='edit'
            onClick={
              () => {
                confirmEdit();
              }
            }
          >
            Submit Review and Result
          </button>
        </div>
        <MessageModal
          open={showMessageModal}
        >
          Submit successfully!
        </MessageModal>
      </div>
    </PageContainer >
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flex: 1
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#085DB7',
    textAlign: 'center'
  },
  titleHeader: {
    padding: 0,
    margin: 0
  },
  section: {
    backgroundColor: '#F3F9FF',
    borderRadius: '8px',
    padding: '20px 30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  },
  operationWrapper: {
    gap: '16px',
    padding: '10px 20px',
    justifyContent: 'center',
    display: 'flex',
    marginTop: '40px'
  },
  availabilityStyle: {
    display: 'inline-block',
    backgroundColor: '#e5f3ff',
    borderRadius: '5px',
    padding: '2px 5px',
    marginBottom: '4px',
    marginLeft: '5px'
  },
  tips: {
    color: 'red',
    display: 'block'
  },
  reviewHeader: {
    color: 'rgb(8, 93, 183)',
    marginTop: '60px'
  },
  textarea: {
    width: '100%',
    height: '100px',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#F3F9FF',
    border: '1px solid #ccc'
  }
};

export default ApplicationDetail;