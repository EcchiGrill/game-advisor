import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Label } from '.';

describe('Label', () => {
  it('renders with base classes', () => {
    const { getByText } = render(<Label>Username</Label>);
    const label = getByText('Username');

    expect(label).toBeInTheDocument();
    expect(label.className).toContain('text-sm');
    expect(label.className).toContain('font-medium');
  });

  it('merges custom className', () => {
    const { getByText } = render(<Label className="custom-class">Label</Label>);

    const label = getByText('Label');
    expect(label.className).toContain('custom-class');
  });

  it('supports htmlFor attribute', () => {
    const { getByText } = render(
      <>
        <Label htmlFor="email-input">Email</Label>
        <input id="email-input" />
      </>
    );

    const label = getByText('Email');

    expect(label).toHaveAttribute('for', 'email-input');
  });
});
