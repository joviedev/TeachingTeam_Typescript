import PageContainer from '@/FixedComponent/PageContainer';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationInterface } from '../ApplyForm';
import { getApplicationById, updateApplication } from '@/utils/application';
import ApplicationForm, { ApplicationFormHandle } from '@/Component/ApplicationForm';
import MessageModal from '@/FixedComponent/MessageModal';
import ApplyStatus from '@/FixedComponent/ApplyStatus';

// Component to display and edit a tutor's application detail
const TutorApplicationDetail = () => {
  const { id } = useParams(); // Get the application ID from the URL
  const navigate = useNavigate();
  // Reference to access form functions (validate, set values)
  const formRef = useRef<ApplicationFormHandle>(null);
  // Store the application detail data
  const [applicationDetail, setApplicationDetail] = useState<ApplicationInterface | null>(null);
  // Track if the form is in edit mode
  const [isEdit, setIsEdit] = useState(false);
  // Destructure status and review content from application data
  const { status = 'processing', reviewContent } = applicationDetail || {};
  // Check if the application has already been reviewed
  const isReviewed = useMemo(() => status !== 'processing', [status]);
  // Determine if the form should be editable
  const isEditable = useMemo(() => !isReviewed && isEdit, [isReviewed, isEdit]);
  // Control the display of the success message modal
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Load application detail when page loads or ID changes
  useEffect(() => {
    // Get application detail by ID from localStorage
    const detail = getApplicationById(id);
    // If the application exists and hasn't been marked as "read" by the tutor
    if (id && detail && !detail.isTutorRead) {
      detail.isTutorRead = true; // Mark it as read
      updateApplication(id, detail); // Update in localStorage
    }
    // Save application data into state
    setApplicationDetail(detail);
    // If the form reference exists, fill the form fields with the application data
    if (formRef.current) {
      formRef.current.setFieldsValue(detail as Record<string, any>);
    }
  }, [id]);

  // Handle form submission after editing
  const confirmEdit = () => {
    // Make sure the application ID and form are available
    if (id && formRef.current) {
      // Validate form fields
      const values = formRef.current?.validateForm();
      if (!values) return; // Stop if form is invalid
       // Update application in localStorage with new values
      updateApplication(id, values as Partial<ApplicationInterface>);
      // Show success message modal
      setShowMessageModal(true);
      // Turn off edit mode
      setIsEdit(false);
      // Automatically hide success message after 2 seconds
      setTimeout(() => {
        setShowMessageModal(false);
      }, 2000);
    }
  };

  // Render the page layout for Tutor Application Detail
  return (
    <PageContainer>
      <div style={styles.pageWrapper}>
        {/* Top bar with Back button and Application Status */}
        <div style={styles.top}>
          <button
            className='primary-button'
            onClick={() => {
              navigate(-1); // Navigate back to the previous page
            }}
          >
            Back
          </button>
          <ApplyStatus status={status} />
        </div>
        {/* Page header with course title */}
        <header style={styles.pageTitle}>
          <h3 style={styles.titleHeader}>
            Application for {applicationDetail?.courseInfo?.title}
          </h3>
        </header>
        {/* Application form section */}
        <section style={styles.section}>
          <ApplicationForm ref={formRef} readOnly={!isEditable} />
        </section>
        {
          // {/* Show lecturer's review if application is already reviewed */}
          isReviewed && (
            <div>
              <h4>
                Review From Lecturer:
              </h4>
              <section style={styles.section}>
                {reviewContent || 'No review yet'}
              </section>
            </div>
          )
        }
        {/* Edit / Submit / Cancel buttons */}
        <div
          style={{
            ...styles.operationWrapper,
            display: isReviewed ? 'none' : 'flex', // Hide if already reviewed
          }}
        >
          {
            isEdit ? ( // If editing mode is ON, show Cancel and Submit buttons
              <>
                <button
                  className='primary-button'
                  style={styles.editOperation}
                  onClick={() => {
                    setIsEdit(false); // Cancel editing
                    if (formRef.current) {
                      formRef.current.setFieldsValue(applicationDetail as Record<string, any>);
                    }
                  }}
                  key='cancel'
                >
                  Cancel
                </button>
                <button
                  className='primary-button'
                  style={styles.editOperation}
                  key='submit'
                  onClick={confirmEdit} // Submit updated form
                >
                  Submit
                </button>
              </>
            ) : (
              // If not editing, show Edit Submission button
              <button
                className='primary-button'
                style={{
                  width: '30%'
                }}
                key='edit'
                onClick={
                  () => { 
                    setIsEdit(true); // Enter editing mode
                  }
                }
              >
                Edit Submission
              </button>
            )
          }
        </div>
        <MessageModal
          open={showMessageModal}
        >
          Update successfully!
        </MessageModal>
      </div>
    </PageContainer >
  );
};
export default TutorApplicationDetail;

// Styling for tutorApplicationDetail
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
    justifyContent: 'center'
  },
  editOperation: {
    flex: 1
  }
};