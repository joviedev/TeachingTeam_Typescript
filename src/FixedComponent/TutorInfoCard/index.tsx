import { ApplicationInterface } from '@/Pages/ApplyForm';
import React from 'react';
import { statusObj } from '../ApplicationInfoCard';
import { daysOfWeek } from '@/utils/constant';

interface TutorInfoCardProps {
  email: string;
  fullName: string;
  skills: string[];
  academicResult: string;
  applications: ApplicationInterface[];
  order: number;
  onOrderChange?: (email: string, order: number) => void;
}

const TutorInfoCard: React.FC<TutorInfoCardProps> = ({ email, fullName, skills, academicResult, applications, order, onOrderChange }) => {
  const [orderValue, setOrderValue] = React.useState(order);
  return (
    <div style={styles.tutorInfoCard}>
      <div style={styles.orderInput}>
        <input
          style={{
            border: 'none',
            background: 'transparent',
            color: '#1e3a8a',
            borderRadius: '5px',
            padding: '5px',
            width: '50px',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 600,
          }}
          type={'number'}
          min={1}
          defaultValue={orderValue || order}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (onOrderChange) {
                onOrderChange(email, orderValue);
              }
              (e.target as HTMLInputElement).blur();
            }
          }}
          onChange={(e) => {
            let v = parseInt(e.target.value);
            if (isNaN(v)) {
              return;
            }
            if (v < 1) {
              v = 1;
            }
            setOrderValue(v);
          }}
        />
      </div>
      <div style={styles.left}>
        <h3 style={styles.title}>{fullName}</h3>
        <div style={styles.description}>
          <span style={styles.fontBold}>skills:</span>
          <span>{skills.join(',')}</span>
          <span style={styles.fontBold}>GPA:</span>
          <span>{academicResult}</span>
        </div>
        <h4 style={{marginBottom: '10px'}}>Applications</h4>
        {applications.map((application, index) => (
          <div key={index} style={styles.applicationContainer}>
            <div style={styles.applicationHeader}>
              <span>{application.courseInfo.title}</span>
              <span style={{ ...styles.statusSpan, ...(application.status === 'approved' ? styles.statusApproved : application.status === 'rejected' ? styles.statusRejected : {}) }}>
                {statusObj[application.status ?? 'processing']}
              </span>
            </div>
            <div style={styles.applicationAvailability}>
              Availability: {daysOfWeek.map((day) => {
                const slots = application.availability[day] || [];
                if (slots.length === 0) {
                  return null;
                }
                return (
                  <div key={day} style={styles.availabilityStyle}>
                    {day}: {slots.join(', ')}
                  </div>
                )})}
            </div>
            <div style={styles.applicationDetails}>
              Submitted by: {application.preferredName} on {new Date(application.submittedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorInfoCard;


/* Styling for TutorInfoCard component*/
const styles: { [key: string]: React.CSSProperties } = {
  tutorInfoCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    padding: '15px 20px',
    marginBottom: '16px',
    backgroundColor: '#F3F9FF',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
    fontSize: '14px',
    gap: '16px',
    position: 'relative'
  },
  left: {},
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1e3a8a',
    marginBottom: '8px',
  },
  description: {
    marginBottom: '10px',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  fontBold: {
    fontWeight: 600,
  },
  status: {
    padding: '3px 0',
  },
  statusLabel: {
    marginRight: '6px',
  },
  statusSpan: {
    color: '#fff',
    backgroundColor: '#1e3a8a',
    padding: '3px 10px',
    borderRadius: '5px',
  },
  statusRejected: {
    backgroundColor: '#dc2626',
  },
  statusApproved: {
    backgroundColor: '#16a34a',
  },
  applicationContainer: {
    marginBottom: '12px',
    border: '1px solid #e5e7eb',
    padding: '10px',
    borderRadius: '8px',
  },
  applicationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 600,
  },
  applicationAvailability: {
    color: '#374151',
    marginTop: '4px',
  },
  applicationDetails: {
    color: '#6b7280',
    marginTop: '4px',
  },
  availabilityStyle: {
    display: 'inline-block',
    backgroundColor: '#e5f3ff',
    // border: '1px solid #1e3a8a',
    borderRadius: '5px',
    padding: '2px 5px',
    marginBottom: '4px',
    marginLeft: '5px',
  },
  orderInput: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
  },
};