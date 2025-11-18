import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '.';

describe('Tooltip', () => {
  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();

    const { getByText, findAllByText } = render(
      <TooltipProvider delayDuration={0}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = getByText('Hover me');
    await user.hover(trigger);

    const matches = await findAllByText('Tooltip text');
    const contentDiv = matches.find(
      (element) => element.tagName.toLowerCase() === 'div'
    );

    expect(contentDiv).toBeDefined();
    expect(contentDiv).toBeVisible();
  });

  it('merges custom className on content', async () => {
    const user = userEvent.setup();

    const { getByText, findAllByText } = render(
      <TooltipProvider delayDuration={0}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent className="custom-class">Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = getByText('Hover me');
    await user.hover(trigger);

    const matches = await findAllByText('Tooltip text');
    const contentDiv = matches.find(
      (element) => element.tagName.toLowerCase() === 'div'
    );

    expect(contentDiv).toBeDefined();
    expect(contentDiv!.className).toContain('custom-class');
  });
});
