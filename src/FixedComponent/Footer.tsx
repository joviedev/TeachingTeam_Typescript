import React from 'react';
import { Link } from 'react-router-dom';

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    padding: '3rem 1.5rem',
    marginTop: '2.5rem',
  },
  heading: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#1e3a8a',
    marginBottom: '1rem',
  },
  link: {
    color: '#1e40af',
    fontWeight: 500,
    textDecoration: 'none',
  },
  listItem: {
    marginBottom: '0.5rem',
  },
  bottomBar: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #d1d5db',
    paddingTop: '1rem',
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '2rem',
    gap: '0.5rem',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  column: {
    flex: '1 1 220px',
    padding: '0 1rem',
    marginBottom: '2rem',
  },
};

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.row}>
        {/* Contact */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Contact</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={styles.listItem}><a href="#" style={styles.link}>Online enquiry</a></li>
            <li style={styles.listItem}>Future students: <span style={styles.link}>1800 626 481</span></li>
            <li style={styles.listItem}>Current students: <span style={styles.link}>1800 72 4357</span></li>
            <li style={styles.listItem}>International agents: <span style={styles.link}>+61 2 6620 3876</span></li>
            <li style={styles.listItem}>24/7 Mental Health: <span style={styles.link}>1300 782 676</span></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={styles.listItem}><a href="#" style={styles.link}>Directory</a></li>
            <li style={styles.listItem}><Link to="/become-a-tutor" style={styles.link}>How to apply</Link></li>
            <li style={styles.listItem}><a href="#" style={styles.link}>News</a></li>
            <li style={styles.listItem}><a href="#" style={styles.link}>Careers</a></li>
            <li style={styles.listItem}><a href="#" style={styles.link}>A-Z Courses</a></li>
          </ul>
        </div>

        {/* Info For */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Information for</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={styles.listItem}>Students</li>
            <li style={styles.listItem}>Lecturers</li>
            <li style={styles.listItem}>Alumni</li>
            <li style={styles.listItem}>Partners</li>
            <li style={styles.listItem}>Staff</li>
          </ul>
        </div>

        {/* About */}
        <div style={styles.column}>
          <h4 style={styles.heading}>About</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={styles.listItem}>Our Team</li>
            <li style={styles.listItem}>Vision & Mission</li>
            <li style={styles.listItem}>Privacy Policy</li>
            <li style={styles.listItem}>Terms of Service</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={styles.bottomBar}>
        <p>© {new Date().getFullYear()} TeachTeam, RMIT University</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#" style={{ ...styles.link, fontWeight: 400 }}>Feedback</a>
          <a href="#" style={{ ...styles.link, fontWeight: 400 }}>Accessibility</a>
          <a href="#" style={{ ...styles.link, fontWeight: 400 }}>Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
