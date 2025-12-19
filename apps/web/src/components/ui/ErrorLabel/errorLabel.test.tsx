import { render, screen } from '@testing-library/react';
import { ErrorLabel } from '.';

describe('ErrorLabel', () => {
  it('renders error message', () => {
    render(<ErrorLabel message="This is an error" />);

    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('displays AlertCircle icon', () => {
    const { container } = render(<ErrorLabel message="Error message" />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('applies error styling classes', () => {
    const { container } = render(<ErrorLabel message="Error message" />);

    const errorLabel = container.firstChild as HTMLElement;
    expect(errorLabel).toHaveClass('bg-error/10');
    expect(errorLabel).toHaveClass('border-error/30');
    expect(errorLabel).toHaveClass('text-error');
  });

  it('renders different error messages', () => {
    const { rerender } = render(<ErrorLabel message="First error" />);
    expect(screen.getByText('First error')).toBeInTheDocument();

    rerender(<ErrorLabel message="Second error" />);
    expect(screen.getByText('Second error')).toBeInTheDocument();
    expect(screen.queryByText('First error')).not.toBeInTheDocument();
  });
});
