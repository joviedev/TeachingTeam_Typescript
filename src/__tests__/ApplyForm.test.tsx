import { render, screen, fireEvent } from '@testing-library/react';
import ApplyForm from '../Pages/ApplyForm';
import { MemoryRouter } from 'react-router-dom';

// Mock useAuth to simulate a logged-in user
jest.mock('../utils/auth/AuthProvider', () => ({
  useAuth: () => ({
    userInfo: { email: 'test@example.com' }
  }),
}));

// Mock react-router-dom hooks (must come after importing MemoryRouter)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => ({ code: 'TEST101' }),
}));

test('renders form and updates input values', () => {
  render(
    <MemoryRouter>
      <ApplyForm />
    </MemoryRouter>
  );

  // Update selector based on your actual JSX, e.g., label, name, or placeholder
  const fullNameInput = screen.getByPlaceholderText("First Name, Last Name");

  fireEvent.change(fullNameInput, { target: { value: 'Jane Doe' } });

  expect(fullNameInput).toHaveValue('Jane Doe');
});
