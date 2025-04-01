import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BecomeTutor: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    qualifications: '',
    experience: '',
    references: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.email.includes('@')) newErrors.email = 'Valid email is required.';
    if (!form.qualifications.trim()) newErrors.qualifications = 'Please list your qualifications.';
    if (!form.experience.trim()) newErrors.experience = 'Experience description is required.';
    if (!form.references.trim()) newErrors.references = 'At least 2 references are required.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Submitted Application:', form);
      setSubmitted(true);
    }
  };

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: '#f9fafb', borderRadius: '1rem', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '1rem', textAlign: 'center' }}
      >
        Become a Tutor
      </motion.h1>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}
        >
          <h2 style={{ color: '#0369a1', fontWeight: 700, fontSize: '1.5rem' }}>Application Submitted!</h2>
          <p style={{ marginTop: '1rem', color: '#334155' }}>Thank you for applying to be a tutor. We'll be in touch soon.</p>
        </motion.div>
      ) : (
        <>
          <p style={{ marginBottom: '1.5rem', fontSize: '1rem', color: '#475569' }}>
            Join our tutoring team and help fellow students excel! Explore the requirements, responsibilities, and benefits before submitting your application.
          </p>

          <section style={{ marginBottom: '2rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1d4ed8' }}>Requirements</h2>
            <ul style={{ paddingLeft: '1.5rem', color: '#374151', lineHeight: '1.75' }}>
              <li>Must be a current student or graduate with good academic standing</li>
              <li>Provide proof of right to work (citizenship or visa)</li>
              <li>Minimum Distinction (70+) in the subject(s) you want to tutor</li>
              <li>Provide 2 academic or professional references</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1d4ed8' }}>Responsibilities & Benefits</h2>
            <ul style={{ paddingLeft: '1.5rem', color: '#374151', lineHeight: '1.75' }}>
              <li>Assist students in labs and tutorials</li>
              <li>Run study sessions and help with assignments (no solutions given)</li>
              <li>Gain teaching and leadership experience</li>
              <li>Flexible hours and paid opportunities</li>
            </ul>
          </section>

          <section style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1d4ed8' }}>Application Form</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} style={inputStyle} />
                {errors.fullName && <div style={errorStyle}>{errors.fullName}</div>}
              </div>
              <div>
                <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} style={inputStyle} />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>
              <div>
                <textarea name="qualifications" placeholder="List your qualifications" value={form.qualifications} onChange={handleChange} style={textareaStyle} />
                {errors.qualifications && <div style={errorStyle}>{errors.qualifications}</div>}
              </div>
              <div>
                <textarea name="experience" placeholder="Describe any relevant tutoring or teaching experience" value={form.experience} onChange={handleChange} style={textareaStyle} />
                {errors.experience && <div style={errorStyle}>{errors.experience}</div>}
              </div>
              <div>
                <textarea name="references" placeholder="List 2 references with contact info" value={form.references} onChange={handleChange} style={textareaStyle} />
                {errors.references && <div style={errorStyle}>{errors.references}</div>}
              </div>
              <button type="submit" style={{ backgroundColor: '#1d4ed8', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1rem' }}>
                Submit Application
              </button>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '0.75rem',
  border: '1px solid #cbd5e1',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  width: '100%',
  backgroundColor: '#f8fafc',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  height: '100px',
  resize: 'vertical',
};

const errorStyle: React.CSSProperties = {
  color: '#dc2626',
  fontSize: '0.875rem',
  marginTop: '0.25rem',
};

export default BecomeTutor;
