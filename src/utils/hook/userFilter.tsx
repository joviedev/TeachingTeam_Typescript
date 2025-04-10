import { useEffect, useMemo, useState } from 'react';
import { isEmpty } from '..';
import { ApplicationInterface } from '@/Pages/ApplyForm';

interface UserFilterProps {
  initialItems: ApplicationInterface[];
}

interface FilterProps {
  course?: string;
  selectedCount?: string;
}

const useApplicationFilter = ({initialItems}: UserFilterProps) => {
  const [items, setItems] = useState<ApplicationInterface[]>(initialItems);

  const [filters, setFilters] = useState<FilterProps>({});

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const accountSelectedObj = useMemo(() => {
    const obj = (items || []).reduce((acc, cur) => {
      const {status, applicantEmail} = cur;
      if (!acc[applicantEmail]) {
        acc[applicantEmail] = {
          email: applicantEmail,
          count: 0
        };
      } else if (status === 'approved') {
        acc.applicantEmail.count += 1;
      }
      return acc;
    }, {} as {[key: string] : {email: string, count: number}});
    const approvedCounts = Object.values(obj);
    const countArr = approvedCounts.map((item) => item.count);
    const maxCount = Math.max(...countArr);
    const minCount = Math.min(...countArr.filter((item) => item > 0));
    return approvedCounts.reduce((acc, cur) => {
      if (maxCount && cur.count === maxCount) {
        acc.mostSelected.push(cur.email);
      }
      if (minCount && cur.count === minCount) {
        acc.leastSelected.push(cur.email);
      }
      if (cur.count === 0) {
        acc.noSelected.push(cur.email);
      }
      return acc;
    }, {mostSelected: [], leastSelected: [], noSelected: []} as {[key: string]: string[]});
  }, [items]);

  const filteredItems = useMemo(() => {
    const validFilters = Object.entries(filters).filter(([_, value]) => !isEmpty(value));
    if (validFilters.length === 0) {
      return items;
    }
    return (items || []).filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (key === 'selectedCount') {
          return value ? accountSelectedObj[value].includes(item.applicantEmail) : true;
        } else if (key === 'course') {
          return item.courseInfo?.courseType.toLowerCase() === (value as string).toLowerCase();
        }
        return true;
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
