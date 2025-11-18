import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Textarea } from '.';

describe('Textarea', () => {
  it('renders a textarea elementt', () => {
    const { getByRole } = render(<Textarea />);
    const element = getByRole('textbox');
    expect(element).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { getByTestId } = render(
      <Textarea className="custom" data-testid="textarea" />
    );

    const element = getByTestId('textarea');
    expect(element.className).toContain('custom');
  });

  it('supports placeholder', () => {
    const { getByPlaceholderText } = render(
      <Textarea placeholder="Write something..." />
    );

    const element = getByPlaceholderText('Write something...');
    expect(element).toBeInTheDocument();
  });
});
