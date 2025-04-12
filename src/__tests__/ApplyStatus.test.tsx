import { render, screen } from '@testing-library/react';
import ApplyStatus from '../FixedComponent/ApplyStatus';

test('displays user-friendly status label for processing', () => {
  render(<ApplyStatus status="processing" />);
  expect(screen.getByText('Pending')).toBeInTheDocument();
});

test('displays Approved when status is approved', () => {
  render(<ApplyStatus status="approved" />);
  expect(screen.getByText('Approved')).toBeInTheDocument();
});

test('displays Rejected when status is rejected', () => {
  render(<ApplyStatus status="rejected" />);
  expect(screen.getByText('Rejected')).toBeInTheDocument();
});
