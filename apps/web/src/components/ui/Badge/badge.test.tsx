import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Badge } from '.';

describe('Badge', () => {
  it('renders children', () => {
    const { getByText } = render(<Badge>New</Badge>);

    const element = getByText('New');
    expect(element).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    const { getByText } = render(<Badge>Default</Badge>);

    const element = getByText('Default');
    expect(element.className).toContain('bg-primary');
    expect(element.className).toContain('text-primary-foreground');
  });

  it('applies destructive variant and merges custom className', () => {
    const { getByText } = render(
      <Badge variant="destructive" className="custom-class">
        Danger
      </Badge>
    );

    const element = getByText('Danger');
    expect(element.className).toContain('bg-destructive');
    expect(element.className).toContain('custom-class');
  });
});
