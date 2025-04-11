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

/**
 * ApplicationDetail page for TeachTeam
 * 
 * - Displays a full detail view of an application
 * - Lecturer can review and update status (approve or reject)
 * - Shows submitted application information including skills, GPA, and availability
 * - If reviewed already, disables editing
 * - Includes success modal after submitting review
 */

const ApplicationDetail = () => {
  const { id } = useParams(); // Get application ID from URL

  const navigate = useNavigate();

  const [applicationDetail, setApplicationDetail] = useState<ApplicationInterface | null>(null); // Current application detail
  const [selectStatus, setSelectStatus] = useState<string>(''); // Selected review status (approved/rejected)
  const [inputReview, setInputReview] = useState<string | undefined>(undefined); // Text review input
  const { status = 'processing', reviewContent } = applicationDetail || {}; // Destructure status and review content

  const isReviewed = useMemo(() => status !== 'processing', [status]); // Check if already reviewed
  const [showMessageModal, setShowMessageModal] = useState(false); // Control success modal display
  const [showTips, setShowTips] = useState(false); // Control missing selection tip

  // Load application details on page load
  useEffect(() => {
    const detail = getApplicationById(id); // Get the application detail by ID
    if (id && detail && !detail.isLecturerRead) {
      detail.isLecturerRead = true; // Mark application as "read" when lecturer views it
      updateApplication(id, detail); // Save updated status to database (or local storage)
    }
    setApplicationDetail(detail); // Store application detail in component state
  }, [id]);

  // Confirm and submit review and decision
  const confirmEdit = () => {
    if (id) {
      // Validation: Check if review and decision are filled
      if (!inputReview || !selectStatus || selectStatus === 'processing') {
        setShowTips(true); // Show tips if missing input
        setTimeout(() => {
          setShowTips(false); // Hide tips after 2 seconds
        }, 2000);
        return; // Stop submission if missing fields
      };
      // Create a new application object with updated status and review
      const newApplication = {...applicationDetail, status: selectStatus, reviewContent: inputReview} as ApplicationInterface;
      setApplicationDetail(newApplication); // Update local state
      updateApplication(id, newApplication); // Update database (or local storage)
      setShowMessageModal(true); // Show success modal
      setTimeout(() => {
        setShowMessageModal(false); // Hide success modal after 2 second
      }, 2000);
    }
  };
  // Memoize course information to avoid recalculating on every render
  const courseInfo: CourseType | undefined = useMemo(() => {
    return applicationDetail?.courseInfo; // Extract course info from application detail
  }, [applicationDetail]);

  // Check if lecturer has selected status and written review
  const isOk = !!selectStatus && selectStatus !== 'processing' && !!inputReview;

  return (
    <PageContainer>
      <div style={styles.pageWrapper}>
        {/* Top Navigation Bar with Back Button and Status Badge */}
        <div style={styles.top}>
          <button
            className='primary-button'
            onClick={() => {
              navigate(-1); // Go back to previous page
            }}
          >
            Back
          </button>
          {/* Show current application status */}
          <ApplyStatus status={status} />
        </div>
        {/* Page Title */}
        <header style={styles.pageTitle}>
          <h3 style={styles.titleHeader}>
            Application for {applicationDetail?.courseInfo?.title}
          </h3>
        </header>
        {/* Application Details Section */}
        <section style={styles.section}>
          <h3>{applicationDetail?.fullName}</h3>
          {/* Course Details */}
          <span>{courseInfo?.courseType.toUpperCase()}</span>
          <div>
            <p>{courseInfo?.location.toUpperCase()}</p>
            <p>{courseInfo?.description}</p>
            <p>{courseInfo?.date}</p>
            <p>{courseInfo?.time}</p>
            <p>
              {/* Applicant Details */}
              <label>Applicant: </label>
              <span>{applicationDetail?.fullName}</span>
            </p>
            <p>
              <label>Skills: </label>
              <span>{applicationDetail?.skills.join(',')}</span>
            </p>
            <p>
              <label>Previous Role: </label>
              <span>{applicationDetail?.previousRole}</span>
            </p>
            <p>
              <label>GPA: </label>
              <span>{applicationDetail?.academicResult}</span>
            </p>
            <p>
              {/* Applicant Availability (by Day) */}
              <label>availability: </label>
              {/*  Get selected time slots for the current day */}
              {daysOfWeek.map((day) => {
                const slots = applicationDetail?.availability[day] || [];
                if (slots.length === 0) {
                  return null; // Skip if no availability on this day
                }
                // Display day and available time slots
                return (
                  <div key={day} style={styles.availabilityStyle}>
                    {day}: {slots.join(', ')}
                  </div>
                )})}
            </p>
            <p>
              {/* Applicant Self-Description */}
              <label>Applicant description: </label>
              <span>{applicationDetail?.description}</span>
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
          {/* Approve Button */}
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
          {/* Pending Button (Disabled) */}
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
          {/* Reject Button */}
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
        {/* Show tips if no decision or review is entered */}
        <p style={{ ...styles.tips, display: showTips ? 'block' : 'none' }}>
          Please select Accept or Reject and enter your review
        </p>
        {/* Review Section */}
        <div>
          <h3 style={styles.reviewHeader}>
            Review From Lecturer:
          </h3>
          <section style={styles.section}>
            {isReviewed ? (reviewContent) : ( // Show submitted review if already reviewed
            // Otherwise show textarea to enter review
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
        {/* Submit Review Button (only if not reviewed yet) */}
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
        {/* Success Modal */}
        <MessageModal
          open={showMessageModal}
        >
          Submit successfully!
        </MessageModal>
      </div>
    </PageContainer >
  );
};

// Styling for applicationDetail
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