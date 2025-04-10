import { FC, PropsWithChildren } from 'react';
import Footer from '../Footer';
import './style.css';

interface Props {
  className?: string;
}

const PageContainer: FC<PropsWithChildren & Props> = ({children, className}) => {
  return (
    <div className='container-wrapper'>
      <div className={`container ${className || ''}`}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageContainer;
