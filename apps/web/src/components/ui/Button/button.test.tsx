import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  it('renders as a <button> with text', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button');

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Click me');
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>
    );

    const btn = screen.getByRole('button');

    expect(btn.className).toContain('h-12');
  });

  it('supports asChild and renders inner element', () => {
    render(
      <Button asChild>
        <a href="/profile">Profile</a>
      </Button>
    );

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link.className).toContain('inline-flex');
  });
});
