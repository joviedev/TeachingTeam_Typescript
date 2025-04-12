import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomDropdown from '../FixedComponent/CustomDropdown';

test('shows dropdown options after click', async () => {
  const mockOnChange = jest.fn();

  render(
    <CustomDropdown
      value="" // No default selection
      onChange={mockOnChange}
      options={[
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
      ]}
    />
  );

  // Click on the dropdown trigger
  const trigger = screen.getByText(/arrow_drop_down/i);
  await userEvent.click(trigger);

  // Assert option becomes visible
  expect(screen.getByText('Option A')).toBeInTheDocument();
});
