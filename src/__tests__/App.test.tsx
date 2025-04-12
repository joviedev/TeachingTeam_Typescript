import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders App component with navigation', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Replace this with something you know appears in the App
  // e.g. a navigation link or a text component
  expect(screen.getByText(/about/i)).toBeInTheDocument();
});
