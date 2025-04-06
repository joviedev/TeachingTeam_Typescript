import React, { useState } from 'react';

const ApplyForm: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    previousRole: '',
    currentRole: '',
    experience: '',
    availability: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ✅ Word count function
  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  // ✅ Validation function
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!form.email.includes('@')) newErrors.email = 'Valid Email is required.';
    if (!form.previousRole.trim()) newErrors.previousRole = 'Previous Role is required.';
    if (!form.currentRole.trim()) newErrors.currentRole = 'Current Role is required.';
    if (!form.experience.trim()) newErrors.experience = 'Experience details are required.';
    if (!form.availability.trim()) newErrors.availability = 'Availability info is required.';
    return newErrors;
  };

  // ✅ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // If experience or availability, limit 250 words
    if (name === 'experience' || name === 'availability') {
      const words = value.trim().split(/\s+/);
      if (words.length <= 250) {
        setForm({ ...form, [name]: value });
      } else {
        setForm({ ...form, [name]: words.slice(0, 250).join(' ') });
      }
    } else {
      setForm({ ...form, [name]: value });
    }

    setErrors({ ...errors, [name]: '' });
  };

  // ✅ Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Application Submitted:', form);
      setSubmitted(true);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {submitted ? (
          <div style={styles.successBox}>
            <div style={styles.successTitle}>Application Submitted!</div>
            <p style={styles.successText}>Thank you for applying. We’ll get back to you soon.</p>
          </div>
        ) : (
          <>
            <div style={styles.heading}>Tutor Application Form</div>
            <p style={styles.subtext}>Fill in your details below to apply as a tutor.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '30px' }}>
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.fullName && <div style={styles.errorText}>{errors.fullName}</div>}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.email && <div style={styles.errorText}>{errors.email}</div>}
              </div>

              {/* Previous Role */}
              <div>
                <input
                  type="text"
                  name="previousRole"
                  placeholder="Previous Role (e.g. Student, TA, Tutor)"
                  value={form.previousRole}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.previousRole && <div style={styles.errorText}>{errors.previousRole}</div>}
              </div>

              {/* Current Role */}
              <div>
                <input
                  type="text"
                  name="currentRole"
                  placeholder="Current Role (e.g. Student, Graduate, Lecturer)"
                  value={form.currentRole}
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.currentRole && <div style={styles.errorText}>{errors.currentRole}</div>}
              </div>

              {/* Experience */}
              <div>
                <textarea
                  name="experience"
                  placeholder="Describe your tutoring or teaching experience"
                  value={form.experience}
                  onChange={handleChange}
                  style={styles.textarea}
                />
                {errors.experience && <div style={styles.errorText}>{errors.experience}</div>}
                <div style={{ textAlign: 'right', fontSize: '14px', color: getWordCount(form.experience) >= 250 ? '#dc2626' : '#6b7280' }}>
                  {getWordCount(form.experience)} / 250 words
                </div>
              </div>

              {/* Availability */}
              <div>
                <textarea
                  name="availability"
                  placeholder="Available days and times (e.g. Mon-Fri, 9AM-5PM)"
                  value={form.availability}
                  onChange={handleChange}
                  style={styles.textarea}
                />
                {errors.availability && <div style={styles.errorText}>{errors.availability}</div>}
                <div style={{ textAlign: 'right', fontSize: '14px', color: getWordCount(form.availability) >= 250 ? '#dc2626' : '#6b7280' }}>
                  {getWordCount(form.availability)} / 250 words
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={styles.button}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(8, 93, 183, 0.25)';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#085DB7';
                  e.currentTarget.style.color = '#fff';
                }}
              >
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

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  heading: {
    fontSize: '22px',
    fontWeight: 600,
    marginBottom: '12px',
  },
  subtext: {
    fontSize: '16px',
    color: '#374151',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    height: '100px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
    resize: 'vertical',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '12px',
    marginTop: '4px',
  },
  button: {
    backgroundColor: '#085DB7',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '30px',
    border: 'none',
    fontWeight: 600,
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
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
