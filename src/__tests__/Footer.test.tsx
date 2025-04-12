import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../FixedComponent/Footer';

test('renders footer content', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  // Adjust the text match below based on real content in your Footer component
  expect(screen.getByText(/©|teachteam|contact/i)).toBeInTheDocument();
});
