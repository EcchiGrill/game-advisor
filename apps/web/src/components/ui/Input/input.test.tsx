import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Input } from '.';

describe('Input', () => {
  it('renders an input element', () => {
    const { getByRole } = render(<Input type="text" />);
    const input = getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('supports different types', () => {
    const { getByTestId } = render(
      <Input type="password" data-testid="input" />
    );

    const input = getByTestId('input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('merges custom className', () => {
    const { getByTestId } = render(
      <Input className="custom" data-testid="input" />
    );

    const input = getByTestId('input');
    expect(input.className).toContain('custom');
  });
});
