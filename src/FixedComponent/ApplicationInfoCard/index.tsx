import { CourseType } from '@/Pages/ApplyForm';
import React, { JSX } from 'react';
import './style.css';

interface ApplicationInfoCardProps {
  courseInfo: CourseType;
  status?: string;
  operation?: JSX.Element;
  children?: React.ReactNode;
}

export const statusObj: Record<string, string> = {
  processing: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected'
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
