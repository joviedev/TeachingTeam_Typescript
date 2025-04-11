import { FC, PropsWithChildren } from 'react';
import Footer from '../Footer';
import './style.css';

// Props for PageContainer
interface Props {
  className?: string;
}

/**
 * PageContainer component for TeachTeam.
 * 
 * - Provides a consistent page layout wrapper across different pages.
 * - Wraps page content inside a container and adds a Footer at the bottom.
 * - Allows optional extra CSS class names for custom page styling.
 * - Uses PropsWithChildren to support nested child elements inside the container.
 */

const PageContainer: FC<PropsWithChildren & Props> = ({children, className}) => {
  return (
    <div className='container-wrapper'>
      {/* Main page content area */}
      <div className={`container ${className || ''}`}>
        {children}
      </div>
      {/* Always display the Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default PageContainer;
