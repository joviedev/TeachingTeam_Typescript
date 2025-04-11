import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component for TeachTeam.
 * 
 * - Automatically scrolls the page to the top whenever the route (URL path) changes.
 * - Improves user experience by preventing unexpected scroll positions between pages.
 */

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation(); // Get the current page path

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever path changes
  }, [pathname]);

  return null;
};

export default ScrollToTop;
