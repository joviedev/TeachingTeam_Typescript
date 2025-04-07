import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../FixedComponent/CustomDropdown';
import { motion } from 'framer-motion';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const timeOptions = [
  { value: '', label: 'Select Time Slot' },
  { value: '9am-12pm', label: '9am – 12pm' },
  { value: '1pm-5pm', label: '1pm – 5pm' },
  { value: '5pm-9pm', label: '5pm – 9pm' },
  { value: 'Full Day', label: 'Full Day' },
  { value: 'Not Applicable', label: 'Not Applicable' },
];

const ApplyForm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    preferredName: '',
    email: '',
    gender: '',
    previousRole: '',
    previousRoleOther: '',
    currentRole: '',
    currentRoleOther: '',
    field: '',
    experience: '',
  });

  const [availability, setAvailability] = useState<{ [day: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const isSignedIn = localStorage.getItem('isSignedIn');
    if (isSignedIn !== 'true') {
      localStorage.setItem('redirectAfterLogin', 'apply');
      navigate('/login');
    } else {
      const course = localStorage.getItem('selectedCourse');
      setSelectedCourse(course);
    }
  }, [navigate]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Invalid Email Format.';
    }
    if (!form.gender) newErrors.gender = 'Gender is required.';
    daysOfWeek.forEach(day => {
      if (!availability[day]) newErrors[day] = `Select time for ${day}`;
    });
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleDropdownChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleAvailabilityChange = (day: string, value: string) => {
    setAvailability({ ...availability, [day]: value });
    setErrors({ ...errors, [day]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const newApplication = { ...form, availability, submittedAt: new Date().toISOString() };
      localStorage.setItem('applications', JSON.stringify([newApplication, ...applications]));
      setSubmitted(true);

      localStorage.removeItem('selectedCourse');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {selectedCourse && (
          <div style={styles.courseTitleBox}>
            <h2 style={styles.courseTitleText}>Applying for: {selectedCourse}</h2>
          </div>
        )}

        {submitted ? (
          <div style={styles.successBox}>
            <div style={styles.successTitle}>Application Submitted!</div>
            <p style={styles.successText}>
              Thank you, <strong>{form.preferredName || form.fullName}</strong>, for submitting your application.
            </p>
            <p style={styles.successText}>
              We’ve received your availability and details. Our team will review your profile shortly.
            </p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={styles.headingMotion}
            >
              Tutor Application Form
            </motion.div>

            <p style={styles.subtextCenter}>Fill in your details below to apply as a tutor.</p>

            <form onSubmit={handleSubmit} style={styles.formWrapper}>
              <input
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.fullName && <div style={styles.errorText}>{errors.fullName}</div>}

              <input
                name="preferredName"
                placeholder="Preferred Name"
                value={form.preferredName}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.email && <div style={styles.errorText}>{errors.email}</div>}

              <CustomDropdown
                value={form.gender}
                onChange={(value) => handleDropdownChange('gender', value)}
                options={[
                  { value: '', label: 'Select Gender' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Non-Binary', label: 'Non-Binary' },
                  { value: 'Prefer not to say', label: 'Prefer not to say' },
                ]}
              />
              {errors.gender && <div style={styles.errorText}>{errors.gender}</div>}

              <div style={styles.availabilitySection}>
                {daysOfWeek.map((day) => (
                  <div key={day} style={styles.availabilityRow}>
                    <span style={styles.dayLabel}>{day}</span>
                    <CustomDropdown
                      value={availability[day] || ''}
                      onChange={(value) => handleAvailabilityChange(day, value)}
                      options={timeOptions}
                    />
                    {errors[day] && <div style={styles.errorText}>{errors[day]}</div>}
                  </div>
                ))}
              </div>

              <button type="submit" style={styles.button}>
                Submit Application
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyForm;

const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  courseTitleBox: {
    marginBottom: '24px',
    textAlign: 'center',
  },
  courseTitleText: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#085DB7',
  },
  headingMotion: {
    fontSize: '36px',
    fontWeight: 800,
    color: '#085DB7',
    marginBottom: '16px',
    textAlign: 'center',
  },
  subtextCenter: {
    fontSize: '16px',
    color: '#374151',
    marginBottom: '20px',
    textAlign: 'center',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    marginTop: '30px',
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '12px',
    border: '1px solid #bfdbfe',
    backgroundColor: '#f8fafc',
    fontSize: '18px',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '12px',
    marginTop: '4px',
  },
  availabilitySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '20px',
  },
  availabilityRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
  dayLabel: {
    minWidth: '120px',
    fontSize: '18px',
    color: '#374151',
    fontWeight: 500,
  },
  button: {
    backgroundColor: '#085DB7',
    color: '#fff',
    padding: '16px 20px',
    borderRadius: '30px',
    border: 'none',
    fontWeight: 600,
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  successBox: {
    backgroundColor: '#e0f2fe',
    padding: '2rem',
    borderRadius: '0.75rem',
    textAlign: 'center',
  },
  successTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#0369a1',
    marginBottom: '10px',
  },
  successText: {
    fontSize: '16px',
    color: '#334155',
  },
};
