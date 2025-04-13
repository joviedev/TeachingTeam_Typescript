import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/study-group2.jpg';
import applicationImage from '../assets/study-group4.jpg';
import ScrollToggle from '../FixedComponent/ScrollToggle';
import Footer from '../FixedComponent/Footer';

// Define animation variants for cards using Framer Motion.
// Cards will fade in and slide up with a slight delay based on their index.
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

// About page component.
// Manages expand/collapse state for FAQ accordions and handles navigation.
const About: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Controls expansion of "How do I apply?" section
  const [isSelectionExpanded, setSelectionExpanded] = useState(false); // Controls expansion of "How does the selection process work?" section
  const navigate = useNavigate(); // Hook for navigation to other pages

  return (
    <div style={styles.pageWrapper}>
      {/* Hero Banner Section */}
      <section style={styles.heroSection}>
        <div style={styles.overlay}></div>
        <motion.div
          style={{ position: 'relative', zIndex: 10, maxWidth: '768px' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 style={styles.heroTitle}>Empowering Tutors. Simplifying Selection.</h1>
          <p style={styles.heroText}>
            TeachTeam helps students and lecturers connect through an efficient tutoring platform.
            Apply, review, and collaborate – all in one place.
          </p>
          {/* Scroll to Features Section Button */}
          <motion.a href="#features" whileHover={{ scale: 1.05 }} style={styles.heroButton}>
            Learn How It Works
          </motion.a>
        </motion.div>
      </section>

      <div style={styles.sectionDivider} />

      {/* Features Section */}
      <section id="features" style={styles.section}>
        <motion.h2 style={styles.sectionTitle} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          How TeachTeam Helps
        </motion.h2>
        {/* Feature Cards */}
        <div style={styles.grid}>
          {['For Tutors', 'For Lecturers'].map((title, i) => (
            <motion.div
              key={title}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
              style={styles.card}
            >
              <h3 style={styles.cardTitle}>{title}</h3>
              <ul style={{ paddingLeft: '20px', color: '#374151' }}>
                {i === 0 ? (
                  <>
                    <li>Apply for open tutoring roles easily</li>
                    <li>Showcase your skills & availability</li>
                    <li>Maintain an active tutoring profile</li>
                  </>
                ) : (
                  <>
                    <li>Browse and shortlist qualified applicants</li>
                    <li>Rank tutors based on your preferences</li>
                    <li>Provide feedback and manage matches</li>
                  </>
                )}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <div style={styles.sectionDivider} />

      {/* How to Apply */}
      <section id="how-to-apply" style={styles.section}>
        <div style={{ display: 'grid', gap: '48px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <motion.img src={applicationImage} alt="Students collaborating" style={styles.img} initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} />
          <motion.div style={styles.applicationbox} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <Accordion title="How do I apply?" expanded={isExpanded} toggle={() => setIsExpanded(!isExpanded)}>
              <p>To apply, log in or create an account on TeachTeam and follow these steps:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '16px' }}>
                <li>Upload proof of right to work (citizenship or visa)</li>
                <li>Provide your full name and contact details</li>
                <li>List your qualifications and education</li>
                <li>Add employment history</li>
                <li>Submit two references with contact info</li>
              </ul>
              <p style={{ marginTop: '16px' }}>Your profile will remain active for two years and can be updated anytime.</p>
            </Accordion>

            <Accordion title="How does the selection process work?" expanded={isSelectionExpanded} toggle={() => setSelectionExpanded(!isSelectionExpanded)}>
              <p>Recruitment and appointment are based on merit and equal opportunity principles.</p>
              <ul style={{ paddingLeft: '20px', marginTop: '16px' }}>
                <li>A right to work in Australia with no relevant work restrictions</li>
                <li>Formal tertiary qualifications and/or relevant work experience (AQF)</li>
                <li>Strong verbal and written communication and interpersonal skills</li>
                <li>Relevant and recent industry or academic experience</li>
                <li>Working with Children Check and membership verification if required</li>
              </ul>
            </Accordion>

            <div style={styles.optionCardGroup}>
              <OptionCard title="Become a Tutor" route="/become-a-tutor" />
              <OptionCard title="Opportunity" route="/opportunity" />
            </div>
          </motion.div>
        </div>
      </section>

      <div style={styles.sectionDivider} />

      {/* CTA */}
      <motion.section style={styles.ctaSection} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <h3 style={styles.ctaTitle}>Ready to join TeachTeam?</h3>
        <p style={styles.ctaText}>Sign up today and start shaping the future of tutoring at the School of Computer Science.</p>
        <div style={styles.ctaButtonGroup}>
          <motion.a href="/signup" whileHover={{ scale: 1.05 }} style={{ backgroundColor: 'white', color: '#1d4ed8', fontWeight: 600, padding: '12px 24px', borderRadius: '9999px', textDecoration: 'none' }}>
            Create Account
          </motion.a>
          <motion.a href="/login" whileHover={{ scale: 1.05 }} style={{ border: '2px solid white', color: 'white', padding: '12px 24px', borderRadius: '9999px', textDecoration: 'none' }}>
            Sign In
          </motion.a>
        </div>
      </motion.section>

      <div style={styles.sectionDivider} />
      <Footer />
      <ScrollToggle />
    </div>
  );
};

const OptionCard: React.FC<{ title: string; route: string }> = ({ title, route }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      onClick={() => navigate(route)}
      style={{
        backgroundColor: '#eff6ff',
        padding: '20px 24px',
        borderRadius: '8px',
        border: '1px solid #bfdbfe',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 600,
        color: '#1e40af',
      }}
    >
      <span>{title}</span>
      <span style={{ fontSize: '24px' }}>➔</span>
    </motion.button>
  );
};

const Accordion: React.FC<{
  title: string;
  expanded: boolean;
  toggle: () => void;
  children: React.ReactNode;
}> = ({ title, expanded, toggle, children }) => (
  <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
    <div onClick={toggle} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1d4ed8' }}>{title}</h3>
      <span style={{ color: '#facc15', fontSize: '28px', fontWeight: 'bold' }}>{expanded ? '−' : '+'}</span>
    </div>
    {expanded && (
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.4 }} style={{ marginTop: '16px' }}>
        {children}
      </motion.div>
    )}
  </div>
);

export default About;

// Styling for About - act as landing page too
const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    fontFamily: 'sans-serif',
    color: '#1f2937',
    scrollBehavior: 'smooth',
  },
  heroSection: {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '90vh',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    padding: '0 48px',
  },
  heroTitle: {
    fontSize: '40px',
    fontWeight: 800,
    marginBottom: '24px',
    lineHeight: '1.25',
  },
  heroText: {
    fontSize: '18px',
    marginBottom: '32px',
    color: '#f3f4f6',
  },
  heroButton: {
    display: 'inline-block',
    backgroundColor: '#085DB7',
    color: 'white',
    padding: '12px 32px',
    borderRadius: '9999px',
    fontWeight: 500,
    textDecoration: 'none',
  },
  overlay: {
    position: 'absolute',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sectionDivider: {
    borderTop: '1px solid #e5e7eb',
  },
  section: {
    padding: '80px 24px',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 700,
    textAlign: 'center',
    color: '#085DB7',
    marginBottom: '48px',
  },
  card: {
    backgroundColor: '#f9fafb',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  cardTitle: {
    fontSize: '24px',
    color: '#085DB7',
    fontWeight: 600,
    marginBottom: '16px',
  },
  grid: {
    display: 'grid',
    gap: '48px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  },
  img: {
    borderRadius: '16px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  applicationbox: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  optionCardGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  ctaSection: {
    padding: '80px 24px',
    background: '#085DB7',
    color: 'white',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '16px',
  },
  ctaText: {
    fontSize: '18px',
    marginBottom: '32px',
  },
  ctaButtonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
};