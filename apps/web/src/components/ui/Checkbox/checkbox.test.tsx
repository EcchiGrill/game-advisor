import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Checkbox } from '.';

describe('Checkbox', () => {
  it('renders with role="checkbox"', () => {
    const { getByRole } = render(<Checkbox />);

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('toggles checked state when clicked', () => {
    const { getByRole } = render(<Checkbox />);

    const checkbox = getByRole('checkbox');

    expect(checkbox).toHaveAttribute('data-state', 'unchecked');

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'checked');

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('merges custom className', () => {
    const { getByRole } = render(<Checkbox className="custom-class" />);

    const checkbox = getByRole('checkbox');
    expect(checkbox.className).toContain('custom-class');
  });
});
