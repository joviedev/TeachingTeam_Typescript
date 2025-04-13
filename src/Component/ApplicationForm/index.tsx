import CustomDropdown from '@/FixedComponent/CustomDropdown';
import { daysOfWeek, skillOptions, timeOptions } from '@/utils/constant';
import { useImperativeHandle, useState } from 'react';

// Apply props that ApplicationForm component can receive
interface ApplicationFormProps {
  // ref: is to allow the parent component to call functions inside ApplicationForm
  ref?: React.Ref<ApplicationFormHandle>;
  // readOnly: if it is true, then makes the form not editable
  readOnly?: boolean;
}

// This interface is to define what functions are available if the parent component uses 'ref' to control the form
export interface ApplicationFormHandle {
  // validateForm: is to check if the form is valid or not
  // If it is invalid, it will return false. If it is valid, it will return all the form data.
  validateForm: () => boolean | Record<string, any>;
  // we set this to allow setting the form fields from outside the component such as fill the form with existing data
  setFieldsValue: (values: Record<string, any>) => void; 
}

// ApplicationForm functional component
const ApplicationForm = ({ ref, readOnly = false }: ApplicationFormProps) => {
  // stores error messages for each field if the format is incorrect or invalid
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
    // stores selected available time slots for each day - select from our fixed data
  const [availability, setAvailability] = useState<{ [day: string]: string[] }>({});
  // list of skills selected by the user - select from our fixed data
  const [skills, setSkills] = useState<string[]>([]);
  // stores applicant's GPA as a string
  const [academicResult, setAcademicResult] = useState('');
  // stores applicant's previous job title
  const [previousRole, setPreviousRole] = useState('');
  // stores applicant's description text
  const [description, setDescription] = useState('');

  // useImperativeHandle allows the parent component to use 'ref' to call functions inside this form.
  useImperativeHandle(ref, () => {
    return {
  // parent can call this to check if the form is valid and get the form data.
      validateForm: handleSubmit,
      // parent can call this to set the form fields with given values.
      setFieldsValue: setFormFieldsValue
    };
  });

  // stores the basic text fields in the form, field listed below under this section
  const [form, setForm] = useState<Record<string, any>>({
    fullName: '',
    preferredName: '',
    gender: '',
    roleType: '',
  });

  // this section fills the form fields with given values from outside the component, parent can call this.
  // it updates all related states listed below including form, availability, skills, GPA, previous role, and description.
  const setFormFieldsValue = (values: Record<string, any>) => {
    const { availability, fullName, preferredName, gender, roleType, academicResult, skills } = values || {};
    // form is set to be updated together since it is all form field
    setForm({
      fullName,
      preferredName,
      gender,
      roleType
    });
    // set update others field seperately
    setAvailability(availability || {});
    setAcademicResult(academicResult || '');
    setSkills(skills || []);
    setPreviousRole(values.previousRole || '');
    setDescription(values.description || '');
  }

  // handleChanges function runs when user types in an input field 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the form state with the new value
    setForm({ ...form, [e.target.name]: e.target.value });

    // Special validation for the 'fullName' field as the user types
    if (e.target.name === 'fullName') {
      const newErrors = { ...errors };
      // this function is to check if full name matches the correct format
      if (!/^[A-Za-z]+,\s[A-Za-z]+$/.test(e.target.value)) {
        newErrors.fullName = 'Please enter your full name in the format: First Name, Last Name. Example: Jovie, Sin';
      } else {
        // Clean the error if format is correct
        newErrors.fullName = '';
      }
      //  Update error state here
      setErrors(newErrors);
    }
    // Clear error for the field being edited on other fields
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // handleDropdownChange function will run when user selects a value from a dropdown
  const handleDropdownChange = (name: string, value: string) => {
    // Update the form field with the selected value
    setForm({ ...form, [name]: value });
    // Clear any previous error for this dropdown field
    setErrors({ ...errors, [name]: '' });
  };

  // handleAvailabilityChange runs when user selects a time slot for a specific day
  const handleAvailabilityChange = (day: string, value: string) => {
    // If no time slot is selected, do nothing
    if (!value) return;
    // Get the current selected slots for that day
    const currentSlots = availability[day] || [];
    // If the same slot is already selected, do nothing to prevent any duplications
    if (currentSlots.includes(value)) return;
    // If user already selected 2 slots for that day, show an error and disable the selection
    if (currentSlots.length >= 2) {
      setErrors((prev) => ({ ...prev, [day]: 'You can select maximum 2 time slots.' }));
      return;
    }
    // Add the new time slot to the list for that day
    const newAvailability = { ...availability, [day]: [...currentSlots, value] };
    setAvailability(newAvailability);
    // Clear error message if any because user already made a valid selection
    setErrors((prev) => ({ ...prev, [day]: '' }));
  };
  // This function runs when user clicks to remove a selected time slot from a day
  const handleRemoveTimeSlot = (day: string, slot: string) => {
    // Remove the selected slot from the list for that day
    const newSlots = (availability[day] || []).filter((s) => s !== slot);
    setAvailability({ ...availability, [day]: newSlots });
    // If no slots are left after removal, show an error asking user to select at least 1 time slot
    if (newSlots.length === 0) {
      setErrors((prev) => ({ ...prev, [day]: `Please select at least 1 time slot for ${day}` }));
    }
  };
  // This function runs when user selects a new skill from the dropdown
  const handleSkillSelect = (skill: string) => {
    // Add the skill to the list only if it's not already selected
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };
  // This function runs when user clicks to remove a selected skill
  const handleSkillRemove = (skill: string) => {
    // Remove the selected skill from the skills list
    setSkills(skills.filter((s) => s !== skill));
  };
  // Checks if all form fields are correctly filled in
  const validate = () => {
    // Create a new object to store any error messages found during validation
    const newErrors: { [key: string]: string } = {};
    // Validation Rule 1: Full Name must be entered and match the format "First Name, Last Name"
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    else if (!/^[A-Za-z]+,\s[A-Za-z]+$/.test(form.fullName.trim())) {
      newErrors.fullName = 'Please enter your full name in the format: First Name, Last Name. Example: Jovie, Sin';
    }
    // Validation Rule 2: Gender must be selected
    if (!form.gender) newErrors.gender = 'Gender is required.';
    // Validation Rule 3: Previous Role must be entered (NEW validation added)
    if (!form.roleType) newErrors.roleType = 'Role Type is required.';
    // Validation Rule 4: At least one skill must be selected
    if (skills.length === 0) newErrors.skills = 'Please select at least one skill.';

    // Validation Rule 5: Availability must have at least one selected time slot per day
    daysOfWeek.forEach((day) => {
      if (!availability[day] || availability[day].length === 0) {
        newErrors[day] = `Please select a time slot for ${day}`;
      }

      // Validation Rule 6: GPA must be entered and must be a valid number ≤ 4.0
      // GPA validation (this part should ideally be outside the loop, but explaining as written)
      // Check if GPA is filled
      if (!academicResult.trim()) {
        newErrors.academicResult = 'GPA is required.';
        // Check if GPA is a valid number and not greater than 4.0
      } else if (isNaN(Number(academicResult)) || Number(academicResult) > 4.0) {
        newErrors.academicResult = 'GPA must be a number not greater than 4.0.';
      }
    });
    // Return all the collected errors
    return newErrors;
  };
  // This function runs when the form is submitted or when parent calls validateForm
  const handleSubmit = () => {
    // First, validate the form fields
    const validationErrors = validate();
    // If there are any errors, show them and stop the form from submitting
    if (Object.keys(validationErrors).length > 0) { 
      setErrors(validationErrors); // Display validation error messages
      return false; // Return false to indicate form is invalid
    }
    // If everything is valid, show the final application data on those fields
    const newApplication = {
      ...form,
      availability,
      skills,
      academicResult
    };
    return newApplication;
  };

  return (
    <div style={styles.container}>
      {/* Form wrapper with overall styling */}
      <form style={styles.formWrapper}>
        {/* Full Name section*/}
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Full Name</label>
          <input
            name="fullName"
            placeholder="First Name, Last Name"
            value={form.fullName}
            onChange={handleChange}
            onBlur={handleChange}
            style={{
              ...styles.input,
              cursor: readOnly ? 'not-allowed' : 'text' // If readOnly is true, then disable typing
            }}
            disabled={readOnly} // Completely disable input if form is read-only
          />
          {/* Show error message under Full Name if there is one */}
          {errors.fullName && <div style={styles.errorText}>{errors.fullName}</div>}
          {/* Instruction text to help user understand how to enter the name */}
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
            style={{
              ...styles.input,
              cursor: readOnly ? 'not-allowed' : 'text'
            }}
            disabled={readOnly}
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
          disabled={readOnly} // If readOnly is true, show disabled cursor
        />
        {errors.gender && <div style={styles.errorText}>{errors.gender}</div>} 

        {/* Role Type */}
        <CustomDropdown 
          value={form.roleType} // Current selected value from form state
          // Update form when user selects a role type
          onChange={(value: string) => handleDropdownChange('roleType', value)}
          options={[
            { value: '', label: 'Select Role Type' },
            { value: 'Part Time', label: 'Part Time' },
            { value: 'Full Time', label: 'Full Time' },
          ]}
          disabled={readOnly}
        />
        {errors.roleType && <div style={styles.errorText}>{errors.roleType}</div>}

        {/* Skills */}
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Skills</label>
          <CustomDropdown
            value="" // No pre-selected value
            onChange={handleSkillSelect} // Add skill to list when selected
            // Show only skills that are not being selected
            options={skillOptions.filter((opt) => !skills.includes(opt.value))}  
            placeholder="Select Skills (e.g., PHP, Python, ReactJS)"
            disabled={readOnly}
          />
          {errors.skills && <div style={styles.errorText}>{errors.skills}</div>}
          {/* Show selected skills as badges */}
          <div style={styles.skillsContainer}>
            {skills.map((skill) => (
              <div key={skill} style={styles.skillBadge}>
                {skill}
                <span
                  style={{
                    ...styles.removeSkill,
                    cursor: readOnly ? 'not-allowed' : 'pointer'
                  }}
                  onClick={() => {
                    if (!readOnly) {
                      handleSkillRemove(skill); // Remove skill when user clicks
                    }
                  }}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
        </div>


        {/* Previous Role */}
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Previous Role</label>
          <input
            name="previousRole"
            placeholder="Previous Role"
            value={previousRole}
            onChange={(e) => setPreviousRole(e.target.value)}
            style={{
              ...styles.input,
              cursor: readOnly ? 'not-allowed' : 'text'
            }}
            disabled={readOnly}
          />
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
                    disabled={readOnly}
                  />
                </div>

                {/* Show selected time slots as badges */}
                <div style={styles.skillsContainer}>
                  {(availability[day] || []).map((slot) => (
                    <div key={slot} style={styles.skillBadge}>
                      {slot}
                      <span
                        style={{
                          ...styles.removeSkill,
                          cursor: readOnly ? 'not-allowed' : 'pointer'
                        }}
                        onClick={() => {
                          if (!readOnly) {
                            handleRemoveTimeSlot(day, slot);
                          }
                        }}
                      >
                        ×
                      </span>
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
            style={{
              ...styles.input,
              cursor: readOnly ? 'not-allowed' : 'text'
            }}
            disabled={readOnly}
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
            style={{
              ...styles.input,
              height: '120px',
              cursor: readOnly ? 'not-allowed' : 'text'
            }}
          />
          {errors.description && <div style={styles.errorText}>{errors.description}</div>}
        </div>


        {/* Submit Button */}
        {/* <button type="submit" style={styles.button}>Submit Application</button> */}

      </form>
    </div>
  );
};

export default ApplicationForm;

// overall styling
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
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
