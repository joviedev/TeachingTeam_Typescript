
/**
 * Site key used for Google reCAPTCHA verification.
 * Replace with your own reCAPTCHA site key when deploying.
 */

// recaptcha v2 key - link from jovie's google account
export const CAPTCHA_SITE_KEY = '6LerUwwrAAAAAN6kDX6p0h_JibgEx7xzZ51b15X1'; 

/**
 * User type definition for authentication and user management.
 */

export type User = {
  email: string;
  password: string;
  role: string;
};

/**
 * Dummy user accounts for testing login functionality.
 * 
 * - Includes both tutors and lecturers.
 * - Each user has a predefined email, password, and role.
 */

export const dummyUsers = [
  { email: 'tutor1@tutor.com', password: 'Tutor123!', role: 'tutor' },
  { email: 'tutor2@tutor.com', password: 'Tutor234!', role: 'tutor' },
  { email: 'tutor3@tutor.com', password: 'Tutor345!', role: 'tutor' },
  { email: 'lecturer1@lecturer.com', password: 'Lecturer123!', role: 'lecturer' },
  { email: 'lecturer2@lecturer.com', password: 'Lecturer234!', role: 'lecturer' },
  { email: 'lecturer3@lecturer.com', password: 'Lecturer345!', role: 'lecturer' },
];

/**
 * Predefined skill options available for application forms.
 * 
 * - Each object has a `value` (for logic) and a `label` (for UI display).
 */

export const skillOptions = [
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

/**
 * Days of the week used for availability selection.
 * 
 * - Typically mapped to tutor or applicant availability.
 */

export const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Time slot options for availability selection in application forms.
 * 
 * - Includes half-day, full-day, and not applicable options.
 */

export const timeOptions = [
  // { value: '', label: 'Select Time Slot' }, default placeholder
  { value: '9am-12pm', label: '9am – 12pm' },
  { value: '1pm-5pm', label: '1pm – 5pm' },
  { value: '5pm-9pm', label: '5pm – 9pm' },
  { value: 'Full Day', label: 'Full Day' },
  { value: 'Not Applicable', label: 'Not Applicable' },
];

/**
 * Generic option type used for dropdown/selectable lists.
 */

interface Option {
  value: string;
  label: string;
  
}
/**
 * Status filter options for tutor application views.
 * 
 * - Used to filter applications by their current processing status.
 */

export const statusOptions: Option[] = [
  { value: '', label: 'All Applications' },
  { value: 'processing', label: 'Processing' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' }
];
