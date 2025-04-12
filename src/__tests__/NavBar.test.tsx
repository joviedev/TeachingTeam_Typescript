import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../FixedComponent/NavBar';

describe('NavBar component', () => {
  const mockHandleSignOut = jest.fn();

  test('renders guest nav items', () => {
    render(
      <MemoryRouter>
        <NavBar
          isSignedIn={false}
          userRole="guest"
          handleSignOut={mockHandleSignOut}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Become a Tutor')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });
});
