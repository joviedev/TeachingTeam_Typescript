import CustomDropdown from '@/FixedComponent/CustomDropdown';
import { daysOfWeek, skillOptions, timeOptions } from '@/utils/constant';
import { useImperativeHandle, useState } from 'react';

interface ApplicationFormProps {
  ref?: React.Ref<ApplicationFormHandle>;
  readOnly?: boolean;
}

export interface ApplicationFormHandle {
  validateForm: () => boolean | Record<string, any>;
  setFieldsValue: (values: Record<string, any>) => void;
}

const ApplicationForm = ({ ref, readOnly = false }: ApplicationFormProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [availability, setAvailability] = useState<{ [day: string]: string[] }>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [academicResult, setAcademicResult] = useState('');
  const [previousRole, setPreviousRole] = useState('');
  const [description, setDescription] = useState('');

  useImperativeHandle(ref, () => {
    return {
      validateForm: handleSubmit,
      setFieldsValue: setFormFieldsValue
    };
  });

  const [form, setForm] = useState<Record<string, any>>({
    fullName: '',
    preferredName: '',
    gender: '',
    roleType: '',
  });

  const setFormFieldsValue = (values: Record<string, any>) => {
    const { availability, fullName, preferredName, gender, roleType, academicResult, skills } = values || {};
    setForm({
      fullName,
      preferredName,
      gender,
      roleType
    });
    setAvailability(availability || {});
    setAcademicResult(academicResult || '');
    setSkills(skills || []);
    setPreviousRole(values.previousRole || '');
    setDescription(values.description || '');
  }

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

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
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
      <form
        style={styles.formWrapper}
      >
        {/* Full Name */}
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
              cursor: readOnly ? 'not-allowed' : 'text'
            }}
            disabled={readOnly}
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
          disabled={readOnly}
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
          disabled={readOnly}
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
            disabled={readOnly}
          />
          {errors.skills && <div style={styles.errorText}>{errors.skills}</div>}
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
                      handleSkillRemove(skill);
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
