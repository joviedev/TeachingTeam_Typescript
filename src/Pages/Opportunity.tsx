import React, { useState, useRef } from 'react';
import CustomDropdown from '../FixedComponent/CustomDropdown';
import ScrollToggle from '../FixedComponent/ScrollToggle';
import teachingImage from '../assets/teaching.jpg';
import Footer from '../FixedComponent/Footer';
import SearchFilterBar from '../FixedComponent/SearchFilterBar';


const Opportunity: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedOpening, setSelectedOpening] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollAmount = index === 0 ? 0 : container.scrollWidth - container.clientWidth;
      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
      setCurrentSlide(index);
    }
  };

  const courseOptions = [
    { value: '', label: 'All Courses' },
    { value: 'vocational', label: 'Vocational' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor degree', label: 'Bachelor Degrees' },
    { value: 'master coursework', label: 'Master by Coursework' },
    { value: 'master research', label: 'Master by Research' },
  ];

  const locationOptions = [
    { value: '', label: 'Location' },
    { value: 'melbourne', label: 'Melbourne City' },
    { value: 'online', label: 'Online' },
  ];

  const openingOptions = [
    { value: '', label: 'Opening' },
    { value: 'apply now', label: 'Apply Now' },
    { value: 'semester 1', label: 'Semester 1' },
    { value: 'semester 2', label: 'Semester 2' },
    { value: 'summer', label: 'Summer Intake' },
  ];

  const courseCards = [
    {
      title: 'Vocational',
      description: 'Practical courses to support vocational pathways.',
      image: require('../assets/vocational.jpg'),
    },
    {
      title: 'Diploma',
      description: 'Industry-relevant training and applied knowledge.',
      image: require('../assets/diploma.jpg'),
    },
    {
      title: 'Bachelor Degrees',
      description: 'Undergraduate academic degrees for various disciplines.',
      image: require('../assets/bachelor.jpg'),
    },
    {
      title: 'Master by Coursework',
      description: 'Advanced coursework programs across fields.',
      image: require('../assets/coursework.jpg'),
    },
    {
      title: 'Master by Research',
      description: 'Research-based postgraduate degrees.',
      image: require('../assets/research.jpg'),
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.bannerWrapper}>
        <div style={styles.overlay} />
        <div style={styles.opportunityBanner}>
          <div style={styles.bannerText}>
            <h1 style={styles.bannerTitle}>Explore Casual Tutoring Roles</h1>
            <p style={styles.bannerSubtitle}>
              Discover opportunities that align with your academic path and location.
            </p>
          </div>
        </div>
        <SearchFilterBar
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedOpening={selectedOpening}
          setSelectedOpening={setSelectedOpening}
        />  
      </div>

      {/* Carousel */}
      <div style={styles.carouselContainer}>
        <div style={styles.carouselTrack} ref={carouselRef}>
          {courseCards.map((course, index) => (
            <div key={index} style={styles.carouselCard}>
              <img src={course.image} alt={course.title} style={styles.courseImage} />
              <div style={styles.courseCardContent}>
                <h3 style={styles.courseTitle}>{course.title}</h3>
                <p style={styles.courseDesc}>{course.description}</p>
                <button style={styles.courseButton}>Apply Now</button>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.dotsWrapper}>
        {[0, 1].map((dotIdx) => (
          <span
            key={dotIdx}
            style={{
              ...styles.dot,
              backgroundColor: currentSlide === dotIdx ? '#085DB7' : '#cbd5e1',
            }}
            onClick={() => scrollToSlide(dotIdx)}
          />
        ))}
        </div>
      </div>
    <ScrollToggle />
    <Footer />
    </div>
    
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
  },
  bannerWrapper: {
    backgroundImage: `url(${teachingImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '45px',
    paddingBottom: '45px',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 1,
  },
  opportunityBanner: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
    padding: '40px',
    margin: '20px auto',
    maxWidth: '1100px',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
  },
  bannerText: {
    maxWidth: '800px',
    textAlign: 'center',
  },
  bannerTitle: {
    fontSize: '36px',
    fontWeight: 700,
    marginBottom: '10px',
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  bannerSubtitle: {
    fontSize: '18px',
    color: '#f3f4f6',
    textShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
  searchBar: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(243, 249, 255, 0.65)',
    backdropFilter: 'blur(8px)',
    borderRadius: '12px',
    padding: '30px 30px 15px',
    margin: '30px auto 20px',
    maxWidth: '1100px',
    flexWrap: 'wrap',
  },
  selectWrapper: {
    position: 'relative',
    minWidth: '200px',
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 25px',
    border: 'none',
    borderRadius: '999px',
    color: '#ffffff',
    backgroundColor: '#085DB7',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '16px',
    justifyContent: 'center',
    textAlign: 'center',
  },
  icon: {
    fontSize: '22px',
    color: 'inherit',
  },
  browseAllWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  carouselContainer: {
    margin: '30px auto',
    padding: '10px 0',
    maxWidth: '1140px',
    overflow: 'hidden',
  },
  carouselTrack: {
    display: 'flex',
    overflowX: 'auto',
    gap: '20px',
    scrollSnapType: 'x mandatory',
    paddingBottom: '10px',
    scrollbarWidth: 'none',
  },
  carouselCard: {
    flex: '0 0 auto',
    width: '280px',
    scrollSnapAlign: 'start',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  courseImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
  },
  courseCardContent: {
    padding: '20px',
  },
  courseTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '10px',
    color: '#1F2937',
  },
  courseDesc: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '15px',
  },
  courseButton: {
    backgroundColor: '#085DB7',
    color: '#fff',
    fontWeight: 600,
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  dotsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    gap: '10px',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Opportunity;
