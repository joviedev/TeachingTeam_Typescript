import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { ApplicationInterface } from '@/Pages/ApplyForm';
import { UserInfo } from '../auth/AuthProvider';
import { dummyUsers } from '../constant';

type InboxContextType = {
  inboxCount: number;
  setInboxCount: (count: number) => void;
  inboxMessage: ApplicationInterface[];
  checkInbox: (userInfo: UserInfo) => void;
};

const InboxContext = createContext<InboxContextType | null>(null);

const InboxProvider = ({children}: PropsWithChildren) => {
  const [inboxCount, setInboxCount] = useState(0);
  const [inboxMessage, setInboxMessage] = useState<ApplicationInterface[]>([]);

  const checkInbox = useCallback((userInfo: UserInfo) => {
    const { email, role } = userInfo || {};
    if (role === 'lecturer') {
      const lecturer = email?.split('@')[0] || '';
      const data = JSON.parse(localStorage.getItem(`${lecturer}Applications`) || '[]');
      const unReadMessages = data.filter((item: ApplicationInterface) => !item.isLecturerRead);
      setInboxCount(unReadMessages.length);
      setInboxMessage(unReadMessages);
    } else if (role === 'tutor') {
      console.log(dummyUsers);
      const unReadMessages: ApplicationInterface[] = [];
      dummyUsers.forEach((user) => {
        if (user.role === 'tutor') return;
        const lecturer = user.email.split('@')[0];
        const data = JSON.parse(localStorage.getItem(`${lecturer}Applications`) || '[]');
        console.log('data', data);
        const unRead = data.filter((item: ApplicationInterface) => 
          item.applicantEmail === email
          && (!!item.status && item.status !== 'processing')
          && !item.isTutorRead
        );
        console.log(unRead)
        unReadMessages.push(...unRead);
      });
      setInboxCount(unReadMessages.length);
      setInboxMessage(unReadMessages);
    }
  }, []);

  const value = useMemo(() => ({
    inboxCount,
    setInboxCount,
    inboxMessage,
    checkInbox
  }), [checkInbox, inboxCount, inboxMessage]);

  return (
    <InboxContext.Provider
      value={value}
    >
      {children}
    </InboxContext.Provider>
  );
};

export default InboxProvider;

export const useInbox = () => useContext(InboxContext) as InboxContextType;
