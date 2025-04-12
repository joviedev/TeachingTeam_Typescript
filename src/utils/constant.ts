/**
 * Site key used for Google reCAPTCHA verification.
 * Replace with your own reCAPTCHA site key when deploying.
 */
export const CAPTCHA_SITE_KEY = '6LerUwwrAAAAAN6kDX6p0h_JibgEx7xzZ51b15X1';

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
 * - Each object has a `value` (for logic) and a `label` (for UI).
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
 * - Typically mapped to applicant availability preferences.
 */
export const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

/**
 * Time slot options for availability forms.
 * 
 * - Includes half-day, full-day, and not applicable options.
 */
export const timeOptions = [
  { value: '', label: 'Select Time Slot' },         // Default option
  { value: '9am-12pm', label: '9am – 12pm' },
  { value: '1pm-5pm', label: '1pm – 5pm' },
  { value: '5pm-9pm', label: '5pm – 9pm' },
  { value: 'Full Day', label: 'Full Day' },
  { value: 'Not Applicable', label: 'Not Applicable' },
];

/**
 * Generic interface for dropdown/selectable options.
 */
interface Option {
  value: string;
  label: string;
}

/**
 * Status filter options for application views.
 * 
 * - Used to filter applications by current processing status.
 */
export const statusOptions: Option[] = [
  { value: '', label: 'All Applications' },         // Show all
  { value: 'processing', label: 'Processing' },     // Pending review
  { value: 'approved', label: 'Approved' },         // Accepted applications
  { value: 'rejected', label: 'Rejected' },         // Denied applications
];
