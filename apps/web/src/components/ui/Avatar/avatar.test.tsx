import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from '.';

describe('Avatar', () => {
  it('renders fallback content', () => {
    const { getByText } = render(
      <Avatar>
        <AvatarImage src="test.png" alt="User avatar" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );

    const fallback = getByText('AB');
    expect(fallback).toBeInTheDocument();
    expect(fallback.className).toContain('bg-muted');
  });

  it('merges custom className on Avatar root', () => {
    const { getByTestId } = render(
      <Avatar data-testid="avatar" className="custom-class" />
    );

    const root = getByTestId('avatar');
    expect(root.className).toContain('rounded-full');
    expect(root.className).toContain('custom-class');
  });
});
