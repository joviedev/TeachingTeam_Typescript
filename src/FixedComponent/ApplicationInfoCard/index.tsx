import { CourseType } from '@/Pages/ApplyForm';
import React, { JSX } from 'react';
import './style.css';

/**
 * ApplicationInfoCard component for TeachTeam.
 * 
 * - Displays course application information such as course title, course type, and application status.
 * - Status is shown as 'Pending', 'Approved', or 'Rejected' based on the provided status prop.
 * - Supports optional operation elements (e.g., Edit button, Cancel link) passed as a prop.
 * - Allows additional custom content through children props.
 * - Uses CSS classes to control layout and status styling.
 */

// Define the props that ApplicationInfoCard component expects
interface ApplicationInfoCardProps {
  courseInfo: CourseType;
  status?: string; // Current status of the application, we set default as 'processing'
  operation?: JSX.Element;
  children?: React.ReactNode; // Additional content inside the card
}

// Mapping of internal status codes to user-friendly display labels
export const statusObj: Record<string, string> = {
  processing: 'Pending',  // 'processing' will display as 'Pending'
  approved: 'Approved',  // 'approved' will display as 'Approved'
  rejected: 'Rejected'  // 'rejected' will display as 'Rejected'
};

const ApplicationInfoCard: React.FC<ApplicationInfoCardProps> = ({ courseInfo, status = 'processing', operation, children }) => {
  return (
    <div className='application-info-card'>
      <div className='left'>
        <h3 className='title'>{courseInfo.title}</h3>
        <span>{courseInfo.courseType.toUpperCase()}</span>
        {children}
        <div className='status'>
          <label>Status: </label>
          <span className={`status ${status}`}>{statusObj[status]}</span>
        </div>
      </div>
      {
        operation ? (
          <div className='right'>
            {operation}
          </div>
        ) : null
      }
    </div>
  );
};

export default ApplicationInfoCard;
