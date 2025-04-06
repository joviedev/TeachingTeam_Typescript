import React, { useState } from 'react';
import CustomDropdown from '../FixedComponent/CustomDropdown';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeOptions = [
  { value: '', label: 'Select Time Slot' },
  { value: '9am-12pm', label: '9am – 12pm' },
  { value: '1pm-5pm', label: '1pm – 5pm' },
  { value: '5pm-9pm', label: '5pm – 9pm' },
  { value: 'Full Day', label: 'Full Day' },
];

const ApplyForm: React.FC = () => {
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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!form.email.includes('@')) newErrors.email = 'Valid Email is required.';
    if (!form.gender) newErrors.gender = 'Gender is required.';
    if (!form.previousRole) newErrors.previousRole = 'Previous Role is required.';
    if (form.previousRole === 'Other' && !form.previousRoleOther.trim()) newErrors.previousRoleOther = 'Please specify other previous role.';
    if (!form.currentRole) newErrors.currentRole = 'Current Role is required.';
    if (form.currentRole === 'Other' && !form.currentRoleOther.trim()) newErrors.currentRoleOther = 'Please specify other current role.';
    if (!form.field) newErrors.field = 'Field is required.';
    if (!form.experience.trim()) newErrors.experience = 'Experience is required.';
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
      console.log('Application Submitted:', { ...form, availability });
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
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.fullName && <div style={styles.errorText}>{errors.fullName}</div>}

              {/* Preferred Name */}
              <input
                type="text"
                name="preferredName"
                placeholder="Preferred Name"
                value={form.preferredName}
                onChange={handleChange}
                style={styles.input}
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.email && <div style={styles.errorText}>{errors.email}</div>}

              {/* Gender */}
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

              {/* Previous Role */}
              <CustomDropdown
                value={form.previousRole}
                onChange={(value) => handleDropdownChange('previousRole', value)}
                options={[
                  { value: '', label: 'Previous Role' },
                  { value: 'Student', label: 'Student' },
                  { value: 'TA', label: 'Teaching Assistant' },
                  { value: 'Tutor', label: 'Tutor' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
              {form.previousRole === 'Other' && (
                <input
                  type="text"
                  name="previousRoleOther"
                  placeholder="Specify Other Previous Role"
                  value={form.previousRoleOther}
                  onChange={handleChange}
                  style={styles.input}
                />
              )}
              {errors.previousRole && <div style={styles.errorText}>{errors.previousRole}</div>}
              {errors.previousRoleOther && <div style={styles.errorText}>{errors.previousRoleOther}</div>}

              {/* Current Role */}
              <CustomDropdown
                value={form.currentRole}
                onChange={(value) => handleDropdownChange('currentRole', value)}
                options={[
                  { value: '', label: 'Current Role' },
                  { value: 'Student', label: 'Student' },
                  { value: 'Graduate', label: 'Graduate' },
                  { value: 'Lecturer', label: 'Lecturer' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
              {form.currentRole === 'Other' && (
                <input
                  type="text"
                  name="currentRoleOther"
                  placeholder="Specify Other Current Role"
                  value={form.currentRoleOther}
                  onChange={handleChange}
                  style={styles.input}
                />
              )}
              {errors.currentRole && <div style={styles.errorText}>{errors.currentRole}</div>}
              {errors.currentRoleOther && <div style={styles.errorText}>{errors.currentRoleOther}</div>}

              {/* Field */}
              <CustomDropdown
                value={form.field}
                onChange={(value) => handleDropdownChange('field', value)}
                options={[
                  { value: '', label: 'Select Field' },
                  { value: 'Computer Science', label: 'Computer Science' },
                  { value: 'Business', label: 'Business' },
                  { value: 'Engineering', label: 'Engineering' },
                  { value: 'Design', label: 'Design' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
              {errors.field && <div style={styles.errorText}>{errors.field}</div>}

              {/* Experience */}
              <textarea
                name="experience"
                placeholder="Describe your tutoring or teaching experience (max 250 characters)"
                value={form.experience}
                onChange={handleChange}
                style={styles.textarea}
                maxLength={250}
              />
              {errors.experience && <div style={styles.errorText}>{errors.experience}</div>}
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#64748b' }}>
                {form.experience.length} / 250 characters
              </div>

              {/* Availability */}
              <div style={styles.availabilitySection}>
                {daysOfWeek.map((day) => (
                  <div key={day} style={styles.availabilityRow}>
                    <span>{day}</span>
                    <CustomDropdown
                      value={availability[day] || ''}
                      onChange={(value) => handleAvailabilityChange(day, value)}
                      options={timeOptions}
                    />
                    {errors[day] && <div style={styles.errorText}>{errors[day]}</div>}
                  </div>
                ))}
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

// -------------------- Styles --------------------
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
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '100px',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
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
