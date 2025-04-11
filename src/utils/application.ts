import { SingleValue } from '@/FixedComponent/FilterBarCard';
import { ApplicationInterface } from '@/Pages/ApplyForm';

const lecturerArr: string[] = [
  'lecturer1Applications', 'lecturer2Applications', 'lecturer3Applications'
];

export const getAllApplications = (): ApplicationInterface[] => {
  try {
    const applyData = lecturerArr.reduce((acc, cur) => {
      const applications = JSON.parse(localStorage.getItem(cur) || '[]');
      acc.push(...applications)
      return acc;
    }, [] as ApplicationInterface[]);
    return applyData;
  } catch {
    return [];
  }
};

export const getApplicationById = (id?: string): ApplicationInterface | null => {
  if (!id) return null;
  const totalApplications = getAllApplications();
  const application = totalApplications.find((application) => application.id === id);
  return application || null;
}

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


export const updateApplication = (id: string, data: Partial<ApplicationInterface>) => {
  for (let i = 0; i < lecturerArr.length; i++) {
    const applications = JSON.parse(localStorage.getItem(lecturerArr[i]) || '[]');
    const index = applications.findIndex((application: ApplicationInterface) => application.id === id);
    if (index !== -1) {
      applications[index] = { ...applications[index], ...data };
      localStorage.setItem(lecturerArr[i], JSON.stringify(applications));
      return;
    }
  }
}

export const filterApplications = (applications: ApplicationInterface[], searchParams: Record<string, SingleValue>) => {
  const validParams = Object.entries((searchParams || {})).filter(([_, value]) => value !== '' && value !== undefined);
  let filterApplications = applications;
  if (validParams.length > 0) {
    filterApplications = applications.filter((application) => {
      return validParams.every(([key, value]) => {
        if (key === 'skill') {
          return (value as string[]).every((skill: string) => application.skills.includes(skill));
        } else if (key === 'course') {
          return application.courseInfo?.courseType.toLowerCase() === (value as string).toLowerCase();
        } else if (key === 'keyword') {
          return application.courseInfo.title.toLowerCase().includes((value as string).toLowerCase()) || application.fullName.toLowerCase().includes((value as string).toLowerCase());
        } else if (key === 'status') {
          const selectStatus = (value || []) as string[];
          return !selectStatus.length || selectStatus.includes((application.status || '').toLowerCase());
        } else if (key === 'availability') {
          const availability = (value as Record<string, string[]>);
          return Object.entries(availability).every(([day, time]) => {
            const dayAvailability = application.availability[day];
            if (!dayAvailability) {
              return false;
            }
            return time.every((timeSlot: string) => dayAvailability.includes(timeSlot));
          });
        }
        return true;
      });
    });
  }
  if (searchParams['sort']) {
    const [sortKey, sortOrder] = searchParams['sort'] as string[];
    filterApplications = filterApplications.sort((a, b) => {
      if (sortKey === 'courseTitle') {
        return sortOrder === 'asc' ? a.courseInfo.title.localeCompare(b.courseInfo.title) : b.courseInfo.title.localeCompare(a.courseInfo.title);
      } else if (sortKey === 'availability') {
        const aAvailability = getAvailabilityLength(a.availability);
        const bAvailability = getAvailabilityLength(b.availability);
        if (aAvailability === bAvailability) {
          return 0;
        }
        return sortOrder === 'asc' ? aAvailability - bAvailability : bAvailability - aAvailability;
      }
      return 0;
    });
  }
  return filterApplications;
}

const getAvailabilityLength = (availability: Record<string, string[]>) => {
  return Object.values(availability).flat()
  .filter(v => !!v && v !== '' && v !== 'Not Applicable')
  .reduce((count, value) => count + (value === 'Full Day' ? 3 : 1), 0);
}
