import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import heroImage from '../assets/study-group2.jpg';
import applicationImage from '../assets/study-group4.jpg';

import ScrollToggle from '../FixedComponent/ScrollToggle';
import Footer from '../FixedComponent/Footer';

const styles: { [key: string]: React.CSSProperties } = {
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
    padding: '0 3rem',
  },
  overlay: {
    position: 'absolute',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sectionDivider: {
    borderTop: '1px solid #e5e7eb',
  },
  ctaSection: {
    padding: '5rem 1.5rem',
    background: 'linear-gradient(to right, #1d4ed8, #3b82f6)',
    color: 'white',
    textAlign: 'center',
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const About: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSelectionExpanded, setSelectionExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#1f2937', scrollBehavior: 'smooth' }}>
      <section style={styles.heroSection}>
        <div style={styles.overlay}></div>
        <motion.div
          style={{ position: 'relative', zIndex: 10, maxWidth: '768px' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: '1.25' }}>
            Empowering Tutors. Simplifying Selection.
          </h1>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: '#f3f4f6' }}>
            TeachTeam helps students and lecturers connect through an efficient tutoring platform.
            Apply, review, and collaborate – all in one place.
          </p>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'inline-block',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Learn How It Works
          </motion.a>
        </motion.div>
      </section>

      <div style={styles.sectionDivider} />

      <section id="features" style={{ backgroundColor: 'white', padding: '5rem 1.5rem' }}>
        <motion.h2
          style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', color: '#1e40af', marginBottom: '3rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          How TeachTeam Helps
        </motion.h2>
        <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {['For Tutors', 'For Lecturers'].map((title, i) => (
            <motion.div
              key={title}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
              style={{
                backgroundColor: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <h3 style={{ fontSize: '1.5rem', color: '#1d4ed8', fontWeight: 600, marginBottom: '1rem' }}>{title}</h3>
              <ul style={{ paddingLeft: '1.25rem', color: '#374151' }}>
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

      <section id="how-to-apply" style={{ backgroundColor: '#f3f4f6', padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <motion.img
            src={applicationImage}
            alt="Students collaborating"
            style={{ borderRadius: '1rem', width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Accordion
              title="How do I apply?"
              expanded={isExpanded}
              toggle={() => setIsExpanded(!isExpanded)}
            >
              <p>To apply, log in or create an account on TeachTeam and follow these steps:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem' }}>
                <li>Upload proof of right to work (citizenship or visa)</li>
                <li>Provide your full name and contact details</li>
                <li>List your qualifications and education</li>
                <li>Add employment history</li>
                <li>Submit two references with contact info</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Your profile will remain active for two years and can be updated anytime.
              </p>
            </Accordion>
            <Accordion
              title="How does the selection process work?"
              expanded={isSelectionExpanded}
              toggle={() => setSelectionExpanded(!isSelectionExpanded)}
            >
              <p>Recruitment and appointment are based on merit and equal opportunity principles.</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem' }}>
                <li>A right to work in Australia with no relevant work restrictions</li>
                <li>Formal tertiary qualifications and/or relevant work experience (AQF)</li>
                <li>Strong verbal and written communication and interpersonal skills</li>
                <li>Relevant and recent industry or academic experience</li>
                <li>Working with Children Check and membership verification if required</li>
              </ul>
            </Accordion>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <OptionCard title="Become a Tutor" route="/become-a-tutor" />
              <OptionCard title="Opportunity" route="/opportunity" />
            </div>
          </motion.div>
        </div>
      </section>

      <div style={styles.sectionDivider} />

      <motion.section
        style={styles.ctaSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
          Ready to join TeachTeam?
        </h3>
        <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
          Sign up today and start shaping the future of tutoring at the School of Computer Science.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            style={{
              backgroundColor: 'white',
              color: '#1d4ed8',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
            }}
          >
            Create Account
          </motion.a>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            style={{
              border: '2px solid white',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
            }}
          >
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
        padding: '1.25rem 1.5rem',
        borderRadius: '0.5rem',
        border: '1px solid #bfdbfe',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '1.125rem',
        fontWeight: 600,
        color: '#1e40af',
        transition: 'background 0.2s ease',
      }}
    >
      <span>{title}</span>
      <span style={{ fontSize: '1.5rem' }}>➔</span>
    </motion.button>
  );
};

const Accordion: React.FC<{
  title: string;
  expanded: boolean;
  toggle: () => void;
  children: React.ReactNode;
}> = ({ title, expanded, toggle, children }) => (
  <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
    <div
      onClick={toggle}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1d4ed8' }}>{title}</h3>
      <span style={{ color: '#facc15', fontSize: '1.75rem', fontWeight: 'bold' }}>
        {expanded ? '−' : '+'}
      </span>
    </div>
    {expanded && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ marginTop: '1rem' }}
      >
        {children}
      </motion.div>
    )}
  </div>
);

export default About;
