import { SingleValue } from '@/FixedComponent/FilterBarCard';
import { ApplicationInterface } from '@/Pages/ApplyForm';

// Array of localStorage keys used to store applications per lecturer
const lecturerArr: string[] = [
  'lecturer1Applications', 'lecturer2Applications', 'lecturer3Applications'
];

/**
 * Retrieves all applications stored under each lecturer's key in localStorage.
 * 
 * - Iterates over all lecturer keys and collects application arrays.
 * - Safely parses data, falling back to empty arrays if invalid/missing.
 * 
 * @returns {ApplicationInterface[]} Flattened array of all applications.
 */
export const getAllApplications = (): ApplicationInterface[] => {
  try {
    const applyData = lecturerArr.reduce((acc, cur) => {
      const applications = JSON.parse(localStorage.getItem(cur) || '[]'); // Safely parse or default to empty
      acc.push(...applications); // Append to accumulator
      return acc;
    }, [] as ApplicationInterface[]);
    return applyData;
  } catch {
    return []; // Return empty array on parse error
  }
};

/**
 * Retrieves a single application by its unique ID.
 * 
 * - Searches across all lecturer datasets.
 * 
 * @param {string} id - The ID of the application.
 * @returns {ApplicationInterface | null} Matching application, or null if not found.
 */
export const getApplicationById = (id?: string): ApplicationInterface | null => {
  if (!id) return null; // Guard clause for undefined ID
  const totalApplications = getAllApplications();
  const application = totalApplications.find((application) => application.id === id); // Find by ID
  return application || null;
}

/**
 * Determines the appropriate lecturer dashboard key based on course type.
 * 
 * - Maps course types to a lecturer application key.
 * 
 * @param {string} courseType - The type of the course.
 * @returns {string} Corresponding lecturer key for localStorage.
 */
export const judgeLecturer = (courseType: string) => {
  const lowerCaseCourseType = courseType.toLowerCase();
  let lecturerDashboard;

  if (lowerCaseCourseType.includes('diploma') || lowerCaseCourseType.includes('vocational')) {
    lecturerDashboard = 'lecturer1Applications';
  } else if (lowerCaseCourseType.includes('bachelor')) {
    lecturerDashboard = 'lecturer2Applications';
  } else {
    lecturerDashboard = 'lecturer3Applications';
  }

  return lecturerDashboard;
}

/**
 * Updates an application by merging new data into the existing object.
 * 
 * - Searches all lecturer arrays for the matching ID.
 * - Overwrites existing values with provided partial data.
 * 
 * @param {string} id - ID of the application to update.
 * @param {Partial<ApplicationInterface>} data - Partial fields to update.
 */
export const updateApplication = (id: string, data: Partial<ApplicationInterface>) => {
  for (let i = 0; i < lecturerArr.length; i++) {
    const applications = JSON.parse(localStorage.getItem(lecturerArr[i]) || '[]');
    const index = applications.findIndex((application: ApplicationInterface) => application.id === id); // Locate by ID

    if (index !== -1) {
      applications[index] = { ...applications[index], ...data }; // Merge new data
      localStorage.setItem(lecturerArr[i], JSON.stringify(applications)); // Save back to storage
      return;
    }
  }
}

/**
 * Filters and optionally sorts application data based on user-selected search parameters.
 * 
 * - Filters based on skills, course, keywords, status, and availability.
 * - Supports sorting by course title and availability.
 * 
 * @param {ApplicationInterface[]} applications - All available applications.
 * @param {Record<string, SingleValue>} searchParams - Filter and sort criteria.
 * @returns {ApplicationInterface[]} Filtered and/or sorted applications.
 */
export const filterApplications = (
  applications: ApplicationInterface[],
  searchParams: Record<string, SingleValue>
) => {
  // Filter out empty values
  const validParams = Object.entries(searchParams || {}).filter(([_, value]) => value !== '' && value !== undefined);
  let filterApplications = applications;

  if (validParams.length > 0) {
    filterApplications = applications.filter((application) => {
      return validParams.every(([key, value]) => {
        if (key === 'skill') {
          // Must match all selected skills
          return (value as string[]).every((skill: string) => application.skills.includes(skill));
        } else if (key === 'course') {
          return application.courseInfo?.courseType.toLowerCase() === (value as string).toLowerCase();
        } else if (key === 'keyword') {
          // Match keyword in course title or applicant's name
          return application.courseInfo.title.toLowerCase().includes((value as string).toLowerCase()) ||
                 application.fullName.toLowerCase().includes((value as string).toLowerCase());
        } else if (key === 'status') {
          const selectStatus = (value || []) as string[];
          return !selectStatus.length || selectStatus.includes((application.status || '').toLowerCase());
        } else if (key === 'availability') {
          // Match availability per selected day/time
          const availability = (value as Record<string, string[]>);
          return Object.entries(availability).every(([day, time]) => {
            const dayAvailability = application.availability[day];
            if (!dayAvailability) return false;
            return time.every((timeSlot: string) => dayAvailability.includes(timeSlot));
          });
        }
        return true;
      });
    });
  }

  // Apply sorting if specified
  if (searchParams['sort']) {
    const [sortKey, sortOrder] = searchParams['sort'] as string[];
    filterApplications = filterApplications.sort((a, b) => {
      if (sortKey === 'courseTitle') {
        return sortOrder === 'asc'
          ? a.courseInfo.title.localeCompare(b.courseInfo.title)
          : b.courseInfo.title.localeCompare(a.courseInfo.title);
      } else if (sortKey === 'availability') {
        const aAvailability = getAvailabilityLength(a.availability);
        const bAvailability = getAvailabilityLength(b.availability);
        return sortOrder === 'asc' ? aAvailability - bAvailability : bAvailability - aAvailability;
      }
      return 0;
    });
  }

  return filterApplications;
}

/**
 * Helper function to calculate total availability slots.
 * 
 * - Flattens all available time slots and assigns weight to 'Full Day'.
 * 
 * @param {Record<string, string[]>} availability - Availability object per day.
 * @returns {number} Weighted total of available time slots.
 */
const getAvailabilityLength = (availability: Record<string, string[]>) => {
  return Object.values(availability).flat()
    .filter(v => !!v && v !== '' && v !== 'Not Applicable') // Exclude invalid or placeholder values
    .reduce((count, value) => count + (value === 'Full Day' ? 3 : 1), 0); // Weight Full Day as 3
}
