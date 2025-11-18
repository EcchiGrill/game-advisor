import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Skeleton } from '.';

describe('Skeleton', () => {
  it('renders with default skeleton classes', () => {
    const { getByTestId } = render(<Skeleton data-testid="skeleton" />);

    const el = getByTestId('skeleton');

    expect(el).toBeInTheDocument();
    expect(el.className).toContain('animate-pulse');
    expect(el.className).toContain('bg-primary/10');
  });

  it('merges custom className', () => {
    const { getByTestId } = render(
      <Skeleton data-testid="skeleton" className="custom" />
    );

    const el = getByTestId('skeleton');
    expect(el.className).toContain('custom');
  });
});
