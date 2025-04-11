import PageContainer from '@/FixedComponent/PageContainer';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationInterface } from '../ApplyForm';
import { getApplicationById, updateApplication } from '@/utils/application';
import ApplicationForm, { ApplicationFormHandle } from '@/Component/ApplicationForm';
import MessageModal from '@/FixedComponent/MessageModal';
import ApplyStatus from '@/FixedComponent/ApplyStatus';

const TutorApplicationDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const formRef = useRef<ApplicationFormHandle>(null);

  const [applicationDetail, setApplicationDetail] = useState<ApplicationInterface | null>(null);

  const [isEdit, setIsEdit] = useState(false);

  const { status = 'processing', reviewContent } = applicationDetail || {};

  const isReviewed = useMemo(() => status !== 'processing', [status]);

  const isEditable = useMemo(() => !isReviewed && isEdit, [isReviewed, isEdit]);

  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    const detail = getApplicationById(id);
    if (id && detail && !detail.isTutorRead) {
      detail.isTutorRead = true;
      updateApplication(id, detail);
    }
    setApplicationDetail(detail);
    if (formRef.current) {
      formRef.current.setFieldsValue(detail as Record<string, any>);
    }
  }, [id]);

  const confirmEdit = () => {
    if (id && formRef.current) {
      const values = formRef.current?.validateForm();
      if (!values) return;
      updateApplication(id, values as Partial<ApplicationInterface>);
      setShowMessageModal(true);
      setIsEdit(false);
      setTimeout(() => {
        setShowMessageModal(false);
      }, 2000);
    }
  };

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
          <ApplicationForm ref={formRef} readOnly={!isEditable} />
        </section>
        {
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
        <div
          style={{
            ...styles.operationWrapper,
            display: isReviewed ? 'none' : 'flex',
          }}
        >
          {
            isEdit ? (
              <>
                <button
                  className='primary-button'
                  style={styles.editOperation}
                  onClick={() => {
                    setIsEdit(false);
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
                  onClick={confirmEdit}
                >
                  Submit
                </button>
              </>
            ) : (
              <button
                className='primary-button'
                style={{
                  width: '30%'
                }}
                key='edit'
                onClick={
                  () => {
                    setIsEdit(true);
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

export default TutorApplicationDetail;