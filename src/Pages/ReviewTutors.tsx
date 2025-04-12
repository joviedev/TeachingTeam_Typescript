import FilterBarCard, { SingleValue } from '@/FixedComponent/FilterBarCard';
import PageContainer from '@/FixedComponent/PageContainer';
import { courseOptions } from '@/FixedComponent/SearchFilterBar';
import { useEffect, useRef, useState } from 'react';
import { ApplicationInterface } from './ApplyForm';
import { useAuth } from '@/utils/auth/AuthProvider';
import TutorInfoCard from '@/FixedComponent/TutorInfoCard';
import { filterApplications } from '@/utils/application';
import { daysOfWeek, skillOptions, timeOptions } from '@/utils/constant';

// Get saved tutor order from localStorage based on lecturer's email
const getLocalTutorOrder = (lecturerEmail: string) => {
  // Try to retrieve 'tutorOrder' data from localStorage
  const data = localStorage.getItem('tutorOrder');
  if (data) {
    try {
      // Parse the JSON string into a JavaScript object
      const parsedData = JSON.parse(data);
      // Return the tutor order for the given lecturerEmail
      return parsedData[lecturerEmail] || {};
    } catch (error) {
      // If parsing fails, log an error and return an empty object
      console.error('Error parsing localStorage data:', error);
      return {};
    }
  }
  // If no data in localStorage, return an empty object
  return {};
};
const setLocalTutorOrder = (lecturerEmail: string, order: Record<string, number>) => {
  // Try to get existing 'tutorOrder' data from localStorage
  const data = localStorage.getItem('tutorOrder');
  if (data) {
    try {
      // Parse the existing data
      const parsedData = JSON.parse(data);
      // Update the tutor order for the specific lecturer
      parsedData[lecturerEmail] = order;
      // Save the updated object back into localStorage
      localStorage.setItem('tutorOrder', JSON.stringify(parsedData));
    } catch (error) {
      // If parsing fails, log an error
      console.error('Error parsing localStorage data:', error);
    }
  } else {
    // If no existing data, create a new object and save it
    const newData = { [lecturerEmail]: order };
    localStorage.setItem('tutorOrder', JSON.stringify(newData));
  }
};

const ReviewTutors = () => {
  // Ref to store all applications loaded from localStorage (static after load)
  const allApplications = useRef<ApplicationInterface[]>([]);

  // Get logged-in user information (to know which lecturer)
  const { userInfo } = useAuth();

  // State to track the order (priority) of tutors, loaded based on lecturer email
  const [tutorOrder, setTutorOrder] = useState<Record<string, number>>(getLocalTutorOrder(userInfo?.email || ''));

  // State to group applications by tutor email
  const [tutorMap, setTutorMap] = useState<Record<string, ApplicationInterface[]>>({});

  // State to track search and filter parameters from the filter bar
  const [searchParams, setSearchParams] = useState<Record<string, SingleValue>>({});

  // 🛠️ Function to group applications by tutor (applicantEmail) and sort if needed
  const filterTutors = (applications: ApplicationInterface[]) => {
    let tutorMap: Record<string, ApplicationInterface[]> = {};

    // Group all applications by tutor email
    applications.forEach((application) => {
      const { applicantEmail: email } = application;
      if (tutorMap[email]) {
        tutorMap[email].push(application); // If already exists, add application
      } else {
        tutorMap[email] = [application];   // Else, create a new array
      }
    });
    const [sortKey, sortOrder] = (searchParams['sort'] || []) as string[];

    // Check if the user selected "priority" sorting
    if (sortKey === 'priority') {
      // Sort tutor emails based on their assigned priority number
      const sortTutorEmail = Object.keys(tutorMap).sort((a, b) => {
        const aPriority = tutorOrder[a] || 0; // Get priority for tutor A (default 0 if missing)
        const bPriority = tutorOrder[b] || 0; // Get priority for tutor B (default 0 if missing)
        
        // Ascending or descending order based on user selection
        return sortOrder === 'asc' ? aPriority - bPriority : bPriority - aPriority;
      });
      // After sorting, rebuild tutorMap according to the new order
      tutorMap = sortTutorEmail.reduce((acc, email) => {
        acc[email] = tutorMap[email]; // Keep the grouped applications for each tutor
        return acc;
      }, {} as Record<string, ApplicationInterface[]>);
    }
    // Update the tutorMap state to trigger re-render
    setTutorMap(tutorMap);    
  };

  useEffect(() => {
    const applications = allApplications.current || []; // Get all applications from ref
    filterTutors(filterApplications(applications, searchParams)); // Apply search filters first
  }, [searchParams, tutorOrder]);

  useEffect(() => {
    if (userInfo) {
      const { email } = userInfo || {}; // Safely extract email from userInfo
      setTutorOrder(getLocalTutorOrder(email || '')); 
    // Load previously saved manual tutor order from localStorage based on lecturer email
    const lecturer = email?.split('@')[0] || ''; 
    // Extract lecturer name (everything before @ symbol)
    if (!lecturer) return; 
    // If no lecturer ID found, stop early (safe guard)
    const data = JSON.parse(
      localStorage.getItem(`${lecturer}Applications`) || '[]'
    ); 
    // Load all submitted applications for this lecturer from localStorage
    allApplications.current = data || []; 
    // Store applications into a `ref` so it persists without causing re-renders
    filterTutors(allApplications.current); 
    // Run filtering on initial load to populate the tutor list
  }
}, [userInfo]); // Only runs when userInfo changes (like after login)

  return (
    <PageContainer className="lecturer-applications">
      {/* Top filter section */}
      <div>
        <FilterBarCard
          sortOptions={[
            { label: 'Course Title', value: 'courseTitle' },
            { label: 'Availability', value: 'availability' },
            { label: 'Priority', value: 'priority' }, // Special sort by manual priority
          ]}
          dataSource={[
            { dataIndex: 'course', options: courseOptions }, // Filter by course type
            {
              dataIndex: 'skill',
              multiple: true,
              options: [
                { value: '', label: 'All Skills' },
                ...skillOptions // Filter by skills (multi-select)
              ]
            },
            {
              dataIndex: 'status',
              placeholder: 'All Status',
              multiple: true,
              options: [
                { value: 'processing', label: 'Processing' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' }
              ] // Filter by application status
            },
            {
              dataIndex: 'keyword',
              type: 'input'
            }, // Keyword search input
            {
              dataIndex: 'availability',
              type: 'timeForDay',
              options: timeOptions,
              days: daysOfWeek // Filter by availability per day
            }
          ]}
          onSearch={setSearchParams} // Triggered when user clicks SEARCH
          onReset={() => setSearchParams({})} // Reset filters
          value={searchParams} // Pass current search state
        />
      </div>
      {/* Tutor cards section */}
      <div className="right">
        <h2>{Object.keys(tutorMap).length} tutors found</h2>
        <div>
          {Object.entries(tutorMap ?? {}).map(([email, applications], idx) => {
            const fullName = applications[0].fullName; // Take from first application
            const academicResult = applications[0].academicResult;
            const skills = applications.map((a) => a.skills).flat(); // Flatten skills list
            return (
              <TutorInfoCard
                key={email}
                email={email}
                fullName={fullName}
                skills={skills}
                academicResult={academicResult}
                applications={applications} // Pass all applications of this tutor
                order={tutorOrder[email] || (idx + 1)} // Show saved order or default
                onOrderChange={(email, order) => {
                  // Update order locally and save to localStorage
                  const newOrder = { ...tutorOrder, [email]: order };
                  setTutorOrder(newOrder);
                  setLocalTutorOrder(userInfo?.email || '', newOrder);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Fix spinner always visible globally (inject this CSS once) */}
      <style>
        {`
          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button {
            opacity: 1;
            display: block;
            width: 18px;
            height: 18px;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>
    </PageContainer>
  );
};

export default ReviewTutors;
