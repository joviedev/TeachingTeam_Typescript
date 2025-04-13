import { ApplicationInterface } from '@/Pages/ApplyForm';
import React from 'react';
import { statusObj } from '../ApplicationInfoCard';
import { daysOfWeek } from '@/utils/constant';

/**
 * Props for the TutorInfoCard component.
 * 
 * - email: Tutor's email address (used as a unique identifier).
 * - fullName: Tutor's full name (for display purposes).
 * - skills: List of skills the tutor possesses (array of skill names).
 * - academicResult: Tutor's GPA or academic performance (as a string).
 * - applications: List of applications submitted by the tutor (array of ApplicationInterface objects).
 * - order: Current display order (used for ranking or sorting tutors).
 * - onOrderChange (optional): Callback function triggered when the order changes,
 *   receives the tutor's email and the new order as parameters.
 */

interface TutorInfoCardProps {
  email: string;
  fullName: string;
  skills: string[];
  academicResult: string;
  applications: ApplicationInterface[];
  order: number;
  onOrderChange?: (email: string, order: number) => void;
}
// Define the TutorInfoCard functional component that accepts tutor details as props.
const TutorInfoCard: React.FC<TutorInfoCardProps> = ({ email, fullName, skills, academicResult, applications, order, onOrderChange }) => {
  // Initialize local state to manage the order (ranking) of the tutor.
  const [orderValue, setOrderValue] = React.useState(order);
  return (
    <div style={styles.tutorInfoCard}>
      <div style={styles.orderInput}>
      {/* Create an input field to allow entering or updating the tutor's order number. */}
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
          type={'number'} // Set the input type to number so only numerical values are allowed.
          min={1} // Set the minimum allowed value to 1.
          defaultValue={orderValue || order} // Set the default input value from the tutor's order value.
          // Handle key presses inside the input field.
          onKeyDown={(e) => {
            if (e.key === 'Enter') {  // If user presses Enter, trigger order change if the function is provided.
              if (onOrderChange) {
                onOrderChange(email, orderValue);
              } // Remove focus from the input field after pressing Enter.
              (e.target as HTMLInputElement).blur();
            }
          }}
          // Handle when the input value changes.
          onChange={(e) => {
            // Parse the entered value into an integer.
            let v = parseInt(e.target.value);
            // If the entered value is not a valid number, do nothing.
            if (isNaN(v)) {
              return;
            }
            // If the entered value is less than 1, reset it to 1.
            if (v < 1) {
              v = 1;
            } 
            // Update the local order value state.
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
              {/* Show the status badge with different colors based on application status. */}
              <span style={{ ...styles.statusSpan, ...(application.status === 'approved' ? styles.statusApproved : application.status === 'rejected' ? styles.statusRejected : {}) }}>
                {/* Display a readable status text from statusObj */}
                {statusObj[application.status ?? 'processing']}
              </span>
            </div>
            <div style={styles.applicationAvailability}>
            {/* Loop through each day of the week to display availability. */}
              Availability: {daysOfWeek.map((day) => {
                // Get the selected time slots for this specific day from the application data.
                const slots = application.availability[day] || [];
                // If no slots are selected for the day, skip rendering for this day.
                if (slots.length === 0) {
                  return null;
                }
                // Otherwise, show the day and its available time slots.
                return (
                  // Create a styled block showing day name and selected time slots.
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