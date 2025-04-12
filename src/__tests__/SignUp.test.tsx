import { render, screen } from '@testing-library/react';
import SignUp from '../Component/SignUp';

test('renders maintenance message and headings', () => {
  render(<SignUp />);
  
  // Heading
  expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
  
  // Subtitle
  expect(screen.getByText(/Join us now/i)).toBeInTheDocument();
  
  // Maintenance message
  expect(screen.getByText(/Under Maintenance/i)).toBeInTheDocument();
});
