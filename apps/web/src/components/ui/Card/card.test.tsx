import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '.';

describe('Card components', () => {
  it('renders Card with correct base class', () => {
    const { getByTestId } = render(<Card data-testid="card">Hello</Card>);

    const el = getByTestId('card');
    expect(el).toBeInTheDocument();
    expect(el.className).toContain('rounded-xl');
    expect(el).toHaveTextContent('Hello');
  });

  it('merges custom className', () => {
    const { getByTestId } = render(
      <Card data-testid="card" className="custom-class" />
    );

    const el = getByTestId('card');
    expect(el.className).toContain('custom-class');
  });

  it('renders nested components correctly', () => {
    const { getByText } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Body')).toBeInTheDocument();
    expect(getByText('Footer')).toBeInTheDocument();
  });
});
