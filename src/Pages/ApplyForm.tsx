import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomDropdown from '../FixedComponent/CustomDropdown';
import { motion } from 'framer-motion';
import { courses } from '../Data/CourseList';
import { useAuth } from '../utils/auth/AuthProvider';
import { daysOfWeek, skillOptions, timeOptions } from '../utils/constant';

// Define the structure for a Course object
export type CourseType = {
  code: string;           // Unique course code 
  title: string;          // Course title 
  description: string;    // Short description of the course
  location: string;       // Campus location 
  courseType: string;     // Course type 
  role?: string;          // (Optional) Role associated 
  opening: string;        // Opening session 
  date: string;           // Course starting date
  time: string;           // Course timing 
  spacesLeft: number;     // Number of spaces left for applicants
};

// Define the structure for an Applicant's submitted Application
export interface ApplicationInterface {
  fullName: string;                // Applicant's full legal name (First Name, Last Name)
  preferredName: string;           // Applicant's preferred name
  gender: string;                  // Applicant's gender
  roleType: string;                // Role type applying for 
  availability: { [day: string]: string[] }; // Availability mapping
  skills: string[];                // List of skills selected by applicant 
  academicResult: string;          // Applicant's GPA
  previousRole?: string;           // (Optional) Previous role held 
  description?: string;            // (Optional) Applicant's short self-description
  submittedAt: string;             // ISO timestamp of when application was submitted
  courseInfo: CourseType;          // The course the applicant is applying for 
  applicantEmail: string;          // Applicant's email address
  status?: string;                 // (Optional) Application status 
  isLecturerRead?: boolean;        // (Optional) Whether lecturer has read the application
  isTutorRead?: boolean;           // (Optional) Whether tutor has read lecturer's review
  reviewContent?: string;          // (Optional) Lecturer's review content for the applicant
  id?: string;                     // (Optional) Unique ID of the application
};

const ApplyForm: React.FC = () => {
  const [submitError, setSubmitError] = useState<string>(''); 
  const navigate = useNavigate();  // Hook to programmatically navigate between routes
  const { code } = useParams();    // Get dynamic URL parameter (course code) from the route
  const { userInfo } = useAuth();  // Get current logged-in user info from AuthProvider
  // State to hold the selected course details based on URL code
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  // State to hold form input values (user-entered data)
  const [form, setForm] = useState({
    fullName: '',       // Applicant's full name
    preferredName: '',  // Applicant's preferred name (optional)
    gender: '',         // Selected gender
    roleType: '',       // Selected role type (e.g., Part Time / Full Time)
  });

    // State to hold applicant's weekly availability 
    const [availability, setAvailability] = useState<{ [day: string]: string[] }>({});
    // State to hold applicant's selected skills 
    const [skills, setSkills] = useState<string[]>([]);
    // State to store applicant's GPA result
    const [academicResult, setAcademicResult] = useState('');
    // State to store applicant's previous role (optional)
    const [previousRole, setPreviousRole] = useState('');
    // State to store applicant's personal description (optional)
    const [description, setDescription] = useState('');
    // State to indicate whether the form has been successfully submitted
    const [submitted, setSubmitted] = useState(false); 
    // State to store form validation errors (key: field name, value: error message)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    // When the component mounts or the course code changes,
    // find and set the selected course information from the courses list
    useEffect(() => {
      const targetCourse = courses.find((course) => course.code === code);
      if (targetCourse) {
        setSelectedCourse(targetCourse);
      }
    }, [code]);
  

  // useEffect(() => {
  //   const isSignedIn = localStorage.getItem('isSignedIn');
  //   if (isSignedIn !== 'true') {
  //     localStorage.setItem('redirectAfterLogin', 'apply');
  //     navigate('/login');
  //   } else {
  //     const course = localStorage.getItem('selectedCourse');
  //     setSelectedCourse(course);
  //   }
  // }, [navigate]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    // Check if full name is provided
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    // Check if full name follows the format: "First Name, Last Name"
    else if (!/^[A-Za-z]+,\s[A-Za-z]+$/.test(form.fullName.trim())) {
      newErrors.fullName = 'Please enter your full name in the format: First Name, Last Name. Example: Jovie, Sin';
    }
    // Check if gender is selected
    if (!form.gender) newErrors.gender = 'Gender is required.';
    // Check if role type is selected
    if (!form.roleType) newErrors.roleType = 'Role Type is required.';
    // Check if at least one skill is selected
    if (skills.length === 0) newErrors.skills = 'Please select at least one skill.';
    // Loop through each day of the week
    daysOfWeek.forEach((day) => {
      // Check if availability is selected for each day
      if (!availability[day] || availability[day].length === 0) {
        newErrors[day] = `Please select a time slot for ${day}`;
      }
    
     // GPA validation
    if (!academicResult.trim()) {
      newErrors.academicResult = 'GPA is required.'; // GPA field must not be empty
    } else if (isNaN(Number(academicResult)) || Number(academicResult) > 4.0) { // GPA must be a valid number <= 4.0
      newErrors.academicResult = 'GPA must be a number not greater than 4.0.';
    }
    });

    return newErrors; // Return all accumulated validation errors
  };
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update form field value
    setForm({ ...form, [e.target.name]: e.target.value });
    // Validate full name immediately
    if (e.target.name === 'fullName') {
      const newErrors = { ...errors }; 
      // Create a copy of the current errors object so we don't mutate state directly
      if (!/^[A-Za-z]+,\s[A-Za-z]+$/.test(e.target.value)) {
        // Check if the fullName does NOT match the format: FirstName, LastName
        newErrors.fullName = 'Please enter your full name in the format: First Name, Last Name. Example: Jovie, Sin';
      } else {
        // If valid format, clear the fullName error
        newErrors.fullName = '';
      }
      setErrors(newErrors); // Update the errors state immediately after checking fullName
    }
    // Regardless of which field was changed (gender, roleType, etc.), clear its specific error
    setErrors({ ...errors, [e.target.name]: '' });
  };
  
  const handleDropdownChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value }); // Update the form state field when a dropdown value is selected
    setErrors({ ...errors, [name]: '' }); // Clear any existing validation error for this field
  };

  const handleAvailabilityChange = (day: string, value: string) => {
    if (!value) return; // If no time slot is selected, exit the function early

    const currentSlots = availability[day] || []; // Get the current selected time slots for the given day. 
    // If none exist yet, initialize as an empty array.

    if (currentSlots.includes(value)) return; // If the selected time slot already exists for that day, do nothing (prevent duplicates).
    if (currentSlots.length >= 2) {
      // If already 2 slots selected, show an error: 
      setErrors((prev) => ({ ...prev, [day]: 'You can select maximum 2 time slots.' }));
      return;
    }

    const newAvailability = { ...availability, [day]: [...currentSlots, value] };
    // Create a new availability object by copying the existing one 
    // and adding the new selected time slot to the day's slots.
    setAvailability(newAvailability); // Update the state with the new availability.
    setErrors((prev) => ({ ...prev, [day]: '' })); // Clear any error for this day after successful selection.
  };

  const handleRemoveTimeSlot = (day: string, slot: string) => {
    const newSlots = (availability[day] || []).filter((s) => s !== slot);
    // Remove the selected time slot from the day's list.
    setAvailability({ ...availability, [day]: newSlots });
    // Update the availability state without the removed time slot.
    if (newSlots.length === 0) { // If no slots left for this day after removal, show an error.
      setErrors((prev) => ({ ...prev, [day]: `Please select at least 1 time slot for ${day}` }));
    }
  };
  // Add a skill to the selected skills list if it is not already added
  const handleSkillSelect = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]); // Add new skill to the existing list
    }
  };
  // Remove a skill from the selected skills list
  const handleSkillRemove = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill)); // Keep only skills that are NOT the one being removed
  };

  // Prevent the default form submission behavior 
  // otherwise the page would reload and we would lose all form data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Run validation function to check if the user filled the form properly
    const validationErrors = validate();
    // If there are validation errors, save them into state so we can display red error messages next to fields
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Stop the form from submitting if validation fails
      return; 
    }

    // Extract the courseType from the selected course. 
    // If no course is selected, default to an empty object.
    const { courseType } = selectedCourse || {};

    // Convert courseType to lowercase for easier comparison. 
    // If courseType is undefined, default to an empty string.
    const lowerCourseType = courseType?.toLowerCase() || '';
  
    let lecturerDashboardName = ''; // Initialize a variable to store which lecturer dashboard to save the application to.
    
    // If the course is a diploma or vocational course, save to lecturer 1's dashboard.
    if (lowerCourseType.includes('diploma') || lowerCourseType.includes('vocational')) {
      lecturerDashboardName = 'lecturer1Applications';
      // If the course is a bachelor course, save to lecturer 2's dashboard.
    } else if (lowerCourseType.includes('bachelor')) {
      lecturerDashboardName = 'lecturer2Applications';
    } else {
      // If the course is neither diploma, vocational, nor bachelor, save to lecturer 3's dashboard (default for master's or other courses).
      lecturerDashboardName = 'lecturer3Applications';
    }

    // Retrieve existing applications from localStorage based on the lecturer dashboard name.
    // If there are no existing applications yet, default to an empty array.
    const existingApplications = JSON.parse(localStorage.getItem(lecturerDashboardName) || '[]');
  
    // Check if there is already an application submitted by the same user (same email address) for the same course (same course code).
    const isDuplicate = existingApplications.some((app: ApplicationInterface) =>
      app.applicantEmail === userInfo?.email && app.courseInfo.code === selectedCourse?.code
    );
    // If a duplicate application is found, set an error message and stop the form submission.
    if (isDuplicate) {
      setSubmitError('You have already submitted an application for this course.');
      return;
    }
      // Build a new application object with all the form data
      const newApplication = {
        ...form,                      // fullName, preferredName, gender, roleType
        availability,                 // Availability per day
        skills,                       // Selected skills
        academicResult,               // GPA
        previousRole,                 // Previous role (optional)
        description,                  // Personal description (optional)
        status: 'processing',          // Initial application status
        submittedAt: new Date().toISOString(), // Timestamp of submission
        courseInfo: selectedCourse,    // Selected course details
        applicantEmail: userInfo?.email, // Email of the applicant
        id: String(+new Date())        // Unique ID generated from timestamp
      };

// Add the new application to the beginning of the list
const updatedApplications = [newApplication, ...existingApplications];

// Save the updated list back to localStorage
localStorage.setItem(lecturerDashboardName, JSON.stringify(updatedApplications));

// Set submitted state to true to show success message
setSubmitted(true);
  
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {selectedCourse && (
          <div style={styles.courseTitleBox}>
            <h2 style={styles.courseTitleText}>Applying for: {selectedCourse.title}</h2>
          </div>
        )}
        {submitError && (
          <div style={styles.errorBox}>
            {submitError}
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
                onChange={(value: string) => handleDropdownChange('roleType', value)}
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

              {/* Previous Role */}
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Previous Role</label>
                <input
                  name="previousRole"
                  placeholder="Enter your previous role"
                  value={previousRole}
                  onChange={(e) => setPreviousRole(e.target.value)}
                  style={styles.input}
                />
                {errors.previousRole && <div style={styles.errorText}>{errors.previousRole}</div>}
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

              {/* Describe Yourself */}
              <div style={styles.inputWrapper}>
                <label style={styles.label}>Describe Yourself</label>
                <textarea
                  name="description"
                  placeholder="Please enter your description, limited to 250 characters"
                  value={description}
                  onChange={(e) => {
                    let v = e.target.value;
                    if (v.length > 250) {
                      v = v.slice(0, 250);
                    }
                    setDescription(v)
                  }}
                  style={{...styles.input, height: '120px'}}
                />
                {errors.description && <div style={styles.errorText}>{errors.description}</div>}
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

// Styling for ApplyForm
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
  },
  errorBox: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '12px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontWeight: 600,
    textAlign: 'center',
  }
  
};
