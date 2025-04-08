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

const skillOptions = [
  { value: 'Python', label: 'Python' },
  { value: 'ReactJS', label: 'React.js' },
  { value: 'NodeJS', label: 'Node.js' },
  { value: 'ReactNative', label: 'React Native' },
  { value: 'Java', label: 'Java' },
  { value: 'C++', label: 'C++' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'SQL', label: 'SQL' },
  { value: 'HTML/CSS', label: 'HTML/CSS' },
  { value: 'SwiftUI', label: 'SwiftUI' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Kotlin', label: 'Kotlin' },
];

const ApplyForm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: '',
    preferredName: '',
    gender: '',
    roleType: '',
  });

  const [availability, setAvailability] = useState<{ [day: string]: string[] }>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [academicResult, setAcademicResult] = useState('');
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
    else if (!/^[A-Za-z]+,\s[A-Za-z]+$/.test(form.fullName.trim())) {
      newErrors.fullName = 'Please enter your full name in the format: First Name, Last Name. Example: Jovie, Sin';
    }

    if (!form.gender) newErrors.gender = 'Gender is required.';
    if (!form.roleType) newErrors.roleType = 'Role Type is required.';
    if (skills.length === 0) newErrors.skills = 'Please select at least one skill.';

    daysOfWeek.forEach((day) => {
      if (!availability[day] || availability[day].length === 0) {
        newErrors[day] = `Please select a time slot for ${day}`;
      }
    
     // GPA validation
    if (!academicResult.trim()) {
      newErrors.academicResult = 'GPA is required.';
    } else if (isNaN(Number(academicResult)) || Number(academicResult) > 4.0) {
      newErrors.academicResult = 'GPA must be a number not greater than 4.0.';
    }
    });

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Validate full name immediately
    if (e.target.name === 'fullName') {
      const newErrors = { ...errors };
      if (!/^[A-Za-z]+,\s[A-Za-z]+$/.test(e.target.value)) {
        newErrors.fullName = 'Please enter your full name in the format: First Name, Last Name. Example: Jovie, Sin';
      } else {
        newErrors.fullName = '';
      }
      setErrors(newErrors);
    }

    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleDropdownChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleAvailabilityChange = (day: string, value: string) => {
    if (!value) return;

    const currentSlots = availability[day] || [];

    if (currentSlots.includes(value)) return;

    if (currentSlots.length >= 2) {
      setErrors((prev) => ({ ...prev, [day]: 'You can select maximum 2 time slots.' }));
      return;
    }

    const newAvailability = { ...availability, [day]: [...currentSlots, value] };
    setAvailability(newAvailability);
    setErrors((prev) => ({ ...prev, [day]: '' }));
  };

  const handleRemoveTimeSlot = (day: string, slot: string) => {
    const newSlots = (availability[day] || []).filter((s) => s !== slot);
    setAvailability({ ...availability, [day]: newSlots });

    if (newSlots.length === 0) {
      setErrors((prev) => ({ ...prev, [day]: `Please select at least 1 time slot for ${day}` }));
    }
  };

  const handleSkillSelect = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const newApplication = {
        ...form,
        availability,
        skills,
        academicResult,
        submittedAt: new Date().toISOString(),
        course: selectedCourse, // Store the selected course name
      };
  
      // Determine which lecturer dashboard to save to
      let lecturerDashboard = '';
  
      if (selectedCourse?.toLowerCase().includes('diploma') || selectedCourse?.toLowerCase().includes('vocational')) {
        lecturerDashboard = 'lecturer1Applications';
      } else if (selectedCourse?.toLowerCase().includes('bachelor')) {
        lecturerDashboard = 'lecturer2Applications';
      } else {
        lecturerDashboard = 'lecturer3Applications';
      }
  
      // Get existing applications for that lecturer
      const existingApplications = JSON.parse(localStorage.getItem(lecturerDashboard) || '[]');
  
      // Save the new application
      const updatedApplications = [newApplication, ...existingApplications];
      localStorage.setItem(lecturerDashboard, JSON.stringify(updatedApplications));
  
      console.log('Application saved to', lecturerDashboard);
  
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
              {/* Full Name */}
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Full Name</label>
                <input
                  name="fullName"
                  placeholder="First Name, Last Name"
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={handleChange}
                  style={styles.input}
                />
                {errors.fullName && <div style={styles.errorText}>{errors.fullName}</div>}
                <div style={styles.instructionText}>
                  Please enter your full name in the format: <strong>First Name, Last Name</strong>.
                </div>
              </div>

              {/* Preferred Name */}
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Preferred Name</label>
                <input
                  name="preferredName"
                  placeholder="Preferred Name"
                  value={form.preferredName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

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

              {/* Role Type */}
              <CustomDropdown
                value={form.roleType}
                onChange={(value) => handleDropdownChange('roleType', value)}
                options={[
                  { value: '', label: 'Select Role Type' },
                  { value: 'Part Time', label: 'Part Time' },
                  { value: 'Full Time', label: 'Full Time' },
                ]}
              />
              {errors.roleType && <div style={styles.errorText}>{errors.roleType}</div>}

              {/* Skills */}
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Skills</label>
                <CustomDropdown
                  value=""
                  onChange={handleSkillSelect}
                  options={skillOptions.filter((opt) => !skills.includes(opt.value))}
                  placeholder="Select Skills (e.g., PHP, Python, ReactJS)"
                />
                {errors.skills && <div style={styles.errorText}>{errors.skills}</div>}
                <div style={styles.skillsContainer}>
                  {skills.map((skill) => (
                    <div key={skill} style={styles.skillBadge}>
                      {skill}
                      <span style={styles.removeSkill} onClick={() => handleSkillRemove(skill)}>×</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Section */}
              <div style={styles.availabilitySection}>
                {daysOfWeek.map((day) => (
                  <div key={day} style={styles.availabilityRow}>
                    <span style={styles.dayLabel}>{day}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        pointerEvents: (availability[day]?.length || 0) >= 2 ? 'none' : 'auto',
                        opacity: (availability[day]?.length || 0) >= 2 ? 0.6 : 1,
                        border: errors[day] ? '1px solid red' : '1px solid #bfdbfe',
                        borderRadius: '12px',
                        padding: '4px',
                      }}>
                        <CustomDropdown
                          value=""
                          onChange={(value) => handleAvailabilityChange(day, value)}
                          options={timeOptions}
                          placeholder="Select Time Slot"
                        />
                      </div>

                      {/* Show selected time slots as badges */}
                      <div style={styles.skillsContainer}>
                        {(availability[day] || []).map((slot) => (
                          <div key={slot} style={styles.skillBadge}>
                            {slot}
                            <span style={styles.removeSkill} onClick={() => handleRemoveTimeSlot(day, slot)}>×</span>
                          </div>
                        ))}
                      </div>

                      {/* Show error */}
                      {errors[day] && <div style={styles.errorText}>{errors[day]}</div>}
                    </div>
                  </div>
                ))}
              </div>   

              {/* GPA */}
              <div style={styles.inputWrapper}>
                <label style={styles.label}>GPA</label>
                <input
                  name="academicResult"
                  placeholder="Enter your GPA (e.g., 3.7)"
                  value={academicResult}
                  onChange={(e) => setAcademicResult(e.target.value)}
                  style={styles.input}
                />
                {errors.academicResult && <div style={styles.errorText}>{errors.academicResult}</div>}
                <div style={styles.instructionText}>
                  Please enter your GPA. Maximum GPA is <strong>4.0</strong>.
                </div>
              </div>


              {/* Submit Button */}
              <button type="submit" style={styles.button}>Submit Application</button>

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
    minHeight: '100vh' 
  },
  container: { 
    maxWidth: '900px', 
    margin: '0 auto', 
    padding: '40px 20px' 
  },
  courseTitleBox: { 
    marginBottom: '24px', 
    textAlign: 'center' 
  },
  courseTitleText: { 
    fontSize: '24px', 
    fontWeight: 700, 
    color: '#085DB7' 
  },
  headingMotion: { 
    fontSize: '36px', 
    fontWeight: 800, 
    color: '#085DB7', 
    marginBottom: '16px', 
    textAlign: 'center' 
  },
  subtextCenter: { 
    fontSize: '16px', 
    color: '#374151', 
    marginBottom: '20px', 
    textAlign: 'center' 
  },
  formWrapper: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '30px', 
    marginTop: '30px' 
  },
  inputWrapper: { 
    display: 'flex', 
    flexDirection: 'column', 
    marginBottom: '20px' 
  },
  label: { 
    fontWeight: 600, 
    marginBottom: '8px', 
    fontSize: '18px', 
    color: '#085DB7' 
  },
  input: { 
    width: '100%', 
    padding: '16px 20px', 
    borderRadius: '12px', 
    border: '1px solid #bfdbfe', 
    backgroundColor: '#f8fafc', 
    fontSize: '18px' 
  },
  instructionText: { 
    fontSize: '12px', 
    marginTop: '4px', 
    marginLeft: '2px',
  },
  errorText: { 
    color: '#dc2626', 
    fontSize: '12px', 
    marginTop: '4px' 
  },
  skillsContainer: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '10px', 
    marginTop: '10px' 
  },
  skillBadge: { 
    backgroundColor: '#E0F2FE', 
    color: '#0369A1', 
    padding: '6px 12px', 
    borderRadius: '20px', 
    display: 'flex', 
    alignItems: 'center', 
    fontSize: '14px', 
    fontWeight: 500 
  },
  removeSkill: { 
    marginLeft: '8px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    color: '#0369A1' 
  },
  availabilitySection: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '12px', 
    marginTop: '20px' 
  },
  availabilityRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '10px'
  },
  dayLabel: { 
    minWidth: '120px', 
    fontSize: '18px', 
    color: '#374151', 
    fontWeight: 500 
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
    marginTop: '20px' 
  },
  successBox: { 
    backgroundColor: '#e0f2fe', 
    padding: '10px', 
    borderRadius: '1px', 
    textAlign: 'center' 
  },
  successTitle: { 
    fontSize: '22px', 
    fontWeight: 700, 
    color: '#0369a1', 
    marginBottom: '10px' 
  },
  successText: { 
    fontSize: '16px', 
    color: '#334155' 
  }
};
