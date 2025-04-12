import { useEffect, useMemo, useState } from 'react';
import { isEmpty } from '..';
import { ApplicationInterface } from '@/Pages/ApplyForm';

// Props expected when initializing the custom user filter hook
interface UserFilterProps {
  initialItems: ApplicationInterface[]; 
  // initialItems: The initial list of applications to filter
}

// Structure of the filtering parameters
interface FilterProps {
  course?: string;         
  // course: Optional field to filter by course type

  selectedCount?: string;  
  // selectedCount: Optional field to filter by selection status 
  // (e.g., 'mostSelected', 'leastSelected', 'noSelected')
}

// Custom hook to filter application items based on selected filters
const useApplicationFilter = ({ initialItems }: UserFilterProps) => {
  // State to store the list of applications (can be filtered)
  const [items, setItems] = useState<ApplicationInterface[]>(initialItems);
  // State to store the current active filters (e.g., course type, selected count)
  const [filters, setFilters] = useState<FilterProps>({});
  // Update items whenever the initialItems passed to the hook change
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

// Memoized calculation: creates a map of applicantEmail -> { email, count of approved applications }
  const accountSelectedObj = useMemo(() => {
    const obj = (items || []).reduce((acc, cur) => {
      const {status, applicantEmail} = cur;
      // Initialize the applicant entry if it doesn't exist
      if (!acc[applicantEmail]) {
        acc[applicantEmail] = {
          email: applicantEmail,
          count: 0
        };
        // If application is approved, increment their count
      } else if (status === 'approved') {
        acc[applicantEmail].count += 1;
      }
      return acc; // Return the accumulator after each iteration
    }, {} as {[key: string] : {email: string, count: number}});
    const approvedCounts = Object.values(obj); 
// Convert the object { applicantEmail -> { email, count } } into an array of { email, count }

const countArr = approvedCounts.map((item) => item.count); 
// Extract an array of counts only (e.g., [2, 0, 1])

const maxCount = Math.max(...countArr); 
// Find the maximum number of approvals

const minCount = Math.min(...countArr.filter((item) => item > 0)); 
// Find the minimum number of approvals (ignoring 0)

return approvedCounts.reduce((acc, cur) => {
  if (maxCount && cur.count === maxCount) {
    acc.mostSelected.push(cur.email); 
    // Add email to mostSelected if they have the maximum number of approvals
  }
  if (minCount && cur.count === minCount) {
    acc.leastSelected.push(cur.email); 
    // Add email to leastSelected if they have the minimum (but > 0) approvals
  }
  if (cur.count === 0) {
    acc.noSelected.push(cur.email); 
    // Add email to noSelected if they have 0 approvals
  }
  return acc; // Accumulate the result
}, { mostSelected: [], leastSelected: [], noSelected: [] } as { [key: string]: string[] }); 
// Initialize the accumulator with empty arrays
  }, [items]);

  const filteredItems = useMemo(() => {
    const validFilters = Object.entries(filters).filter(([_, value]) => !isEmpty(value));
    // Only keep filters that have a non-empty value (ignore empty fields)
    
    if (validFilters.length === 0) {
      return items; 
      // If no filters are selected, return all items (no filtering needed)
    }
  
    return (items || []).filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (key === 'selectedCount') {
          // If filtering by selectedCount (mostSelected, leastSelected, noSelected)
          return value ? accountSelectedObj[value].includes(item.applicantEmail) : true;
        } else if (key === 'course') {
          // If filtering by course type (e.g., Diploma, Vocational, Bachelor)
          return item.courseInfo?.courseType.toLowerCase() === (value as string).toLowerCase();
        }
        return true; 
        // If other filters exist (future proofing), default to true (don't filter by unknown keys)
      });
    });
  }, [items, filters, accountSelectedObj]);
  

  return {
    filteredItems,
    filters,
    setFilters,
    setItems
  };
};

export default useApplicationFilter;
