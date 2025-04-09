import { CourseType } from '@/Pages/ApplyForm';
import React from 'react';
import './style.css';

interface ApplicationInfoCardProps {
  courseInfo: CourseType;
  status?: string;
}

const ApplicationInfoCard: React.FC<ApplicationInfoCardProps> = ({ courseInfo, status = 'processing' }) => {
  return (
    <div className='application-info-card'>
      <div className='left'>
        <h3 className='title'>{courseInfo.title}</h3>
        <span>{courseInfo.courseType.toUpperCase()}</span>
        <p className='location'>{courseInfo.location.toUpperCase()}</p>
        <p className='description'>{courseInfo.description}</p>
        <p>{courseInfo.date}</p>
        <p>{courseInfo.time}</p>
        <p>{courseInfo.spacesLeft} spaces left</p>
        <div className='status'>
          <label>Status: </label>
          <span className={`status ${status}`}>{status.toUpperCase()}</span>
        </div>
      </div>
      <div className='right'>
        <button
          className='primary-button'
        >
          View Detail
        </button>
      </div>
    </div>
  );
};

export default ApplicationInfoCard;
