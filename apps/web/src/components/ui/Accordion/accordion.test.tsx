import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '.';

describe('Accordion', () => {
  it('renders accordion with items', () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    const content = container.querySelector('[role="region"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('hidden');
  });

  it('toggles content when trigger is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Item 1');
    const contentBefore = container.querySelector('[role="region"]');
    expect(contentBefore).toHaveAttribute('hidden');

    await user.click(trigger);

    const contentAfter = container.querySelector('[role="region"]');
    expect(contentAfter).toBeInTheDocument();
    expect(contentAfter).not.toHaveAttribute('hidden');
    expect(contentAfter).toHaveTextContent('Content 1');
  });

  it('supports multiple items', () => {
    const { container } = render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    const regions = container.querySelectorAll('[role="region"]');
    expect(regions).toHaveLength(2);
    // Content text is not rendered when accordion is closed
  });

  it('merges custom className', () => {
    const { container } = render(
      <Accordion type="single" collapsible className="custom-accordion">
        <AccordionItem value="item-1" className="custom-item">
          <AccordionTrigger className="custom-trigger">Item 1</AccordionTrigger>
          <AccordionContent className="custom-content">
            Content 1
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(container.firstChild).toHaveClass('custom-accordion');
  });
});
