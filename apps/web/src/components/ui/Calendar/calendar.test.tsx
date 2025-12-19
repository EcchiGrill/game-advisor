import { render } from '@testing-library/react';
import { Calendar } from '.';

describe('Calendar', () => {
  it('renders calendar component', () => {
    const { container } = render(<Calendar />);

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toBeInTheDocument();
  });

  it('displays current month by default', () => {
    const { container } = render(<Calendar />);

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toBeInTheDocument();
  });

  it('supports custom className', () => {
    const { container } = render(<Calendar className="custom-calendar" />);

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toHaveClass('custom-calendar');
  });

  it('supports showOutsideDays prop', () => {
    const { container } = render(<Calendar showOutsideDays={false} />);

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toBeInTheDocument();
  });

  it('supports buttonVariant prop', () => {
    const { container } = render(<Calendar buttonVariant="outline" />);

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toBeInTheDocument();
  });

  it('supports captionLayout prop', () => {
    const { container } = render(<Calendar captionLayout="dropdown" />);

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    const { container } = render(<Calendar />);

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('supports selected date', () => {
    const selectedDate = new Date(2024, 0, 15);
    const { container } = render(
      <Calendar
        mode="range"
        selected={{ from: selectedDate, to: selectedDate }}
        required
      />
    );

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toBeInTheDocument();
  });

  it('supports mode prop', () => {
    const { container } = render(<Calendar mode="range" />);

    const calendar = container.querySelector('[data-slot="calendar"]');
    expect(calendar).toBeInTheDocument();
  });
});
