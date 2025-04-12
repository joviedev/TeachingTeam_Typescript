import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { ApplicationInterface } from '@/Pages/ApplyForm';
import { UserInfo } from '../auth/AuthProvider';
import { dummyUsers } from '../constant';

// Define the structure of the Inbox Context
type InboxContextType = {
  inboxCount: number;              // Total number of unread inbox messages
  setInboxCount: (count: number) => void; // Function to update the inbox count
  inboxMessage: ApplicationInterface[];  // List of application messages in the inbox
  checkInbox: (userInfo: UserInfo) => void; // Function to check and load inbox messages based on user information
};

// Create the InboxContext with a default value of null
const InboxContext = createContext<InboxContextType | null>(null);
// InboxProvider will wrap around the app and provide inbox-related data and functions
const InboxProvider = ({children}: PropsWithChildren) => {
  // State to store the number of unread inbox messages
  const [inboxCount, setInboxCount] = useState(0);
  // State to store the list of application messages in the inbox
  const [inboxMessage, setInboxMessage] = useState<ApplicationInterface[]>([]);


// Function to check inbox messages for the current user
const checkInbox = useCallback((userInfo: UserInfo) => {
  const { email, role } = userInfo || {};

  if (role === 'lecturer') {
    // If the user is a lecturer:
    // - Get the lecturer's email prefix (before the '@')
    const lecturer = email?.split('@')[0] || '';
    // - Fetch all applications submitted to this lecturer from localStorage
    const data = JSON.parse(localStorage.getItem(`${lecturer}Applications`) || '[]');
    // - Filter applications that have NOT been read by the lecturer
    const unReadMessages = data.filter((item: ApplicationInterface) => !item.isLecturerRead);

    // - Update the inbox count and messages
    setInboxCount(unReadMessages.length);
    setInboxMessage(unReadMessages);

  } else if (role === 'tutor') {
    // If the user is a tutor:

    console.log(dummyUsers); // (for debugging)

    const unReadMessages: ApplicationInterface[] = [];

    // Check each lecturer's applications
    dummyUsers.forEach((user) => {
      if (user.role === 'tutor') return; // Skip if the dummy user is a tutor (only check lecturers)

      const lecturer = user.email.split('@')[0];

      // Fetch all applications under that lecturer
      const data = JSON.parse(localStorage.getItem(`${lecturer}Applications`) || '[]');

      console.log('data', data); // (for debugging)

      // Find unread messages where:
      // - the application belongs to the tutor (applicantEmail matches)
      // - the status is not "processing" (means it's either "approved" or "rejected")
      // - the tutor has not yet read the application
      const unRead = data.filter((item: ApplicationInterface) => 
        item.applicantEmail === email &&
        (!!item.status && item.status !== 'processing') &&
        !item.isTutorRead
      );

      console.log(unRead); // (for debugging)

      // Add all unread messages to the list
      unReadMessages.push(...unRead);
    });

    // Update the inbox count and messages for the tutor
    setInboxCount(unReadMessages.length);
    setInboxMessage(unReadMessages);
  }
}, []);

// Create a memoized value to store the inbox context
const value = useMemo(() => ({
  inboxCount,       // Number of unread inbox messages
  setInboxCount,    // Function to update the inbox count manually
  inboxMessage,     // List of unread inbox messages
  checkInbox        // Function to check and update inbox messages
}), [checkInbox, inboxCount, inboxMessage]); // Recalculate value only if these dependencies change

// Provide the InboxContext to children components
return (
  <InboxContext.Provider
    value={value} // Pass the memoized value
  >
    {children}  
  </InboxContext.Provider>
);
};

export default InboxProvider;

export const useInbox = () => useContext(InboxContext) as InboxContextType;
