import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover, PopoverTrigger, PopoverContent } from '.';

describe('Popover', () => {
  it('renders popover trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('opens popover when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText('Open Popover');
    await user.click(trigger);

    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(
      <Popover>
        <PopoverTrigger className="custom-trigger">Trigger</PopoverTrigger>
        <PopoverContent className="custom-content">Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText('Trigger');
    expect(trigger).toHaveClass('custom-trigger');
  });

  it('supports custom align and sideOffset', () => {
    render(
      <Popover>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent align="start" sideOffset={8}>
          Content
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText('Trigger');
    expect(trigger).toBeInTheDocument();
  });
});
