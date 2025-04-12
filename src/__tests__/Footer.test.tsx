import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../FixedComponent/Footer';
import { MemoryRouter } from 'react-router-dom';

test('renders footer content and contact info', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  // Check for expected text in the footer
  expect(screen.getByText(/contact/i)).toBeInTheDocument();
  expect(screen.getByText(/about/i)).toBeInTheDocument();
});
