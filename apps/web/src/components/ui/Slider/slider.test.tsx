import { render, screen } from '@testing-library/react';
import { Slider } from '.';

describe('Slider', () => {
  it('renders slider component', () => {
    const { container } = render(<Slider defaultValue={[50]} />);

    const slider = container.querySelector('[role="slider"]');
    expect(slider).toBeInTheDocument();
  });

  it('supports defaultValue prop', () => {
    render(<Slider defaultValue={[25, 75]} />);

    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(1);
  });

  it('merges custom className', () => {
    const { container } = render(
      <Slider defaultValue={[50]} className="custom-slider" />
    );

    const slider = container.querySelector('[role="slider"]');
    expect(slider?.closest('.custom-slider')).toBeInTheDocument();
  });

  it('supports min and max props', () => {
    const { container } = render(
      <Slider defaultValue={[50]} min={0} max={100} />
    );

    const slider = container.querySelector('[role="slider"]');
    expect(slider).toBeInTheDocument();
  });

  it('supports step prop', () => {
    const { container } = render(<Slider defaultValue={[50]} step={10} />);

    const slider = container.querySelector('[role="slider"]');
    expect(slider).toBeInTheDocument();
  });
});
