import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '.';

describe('Pagination', () => {
  it('renders pagination nav with items and ellipsis', () => {
    const { getByRole, getByText } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationEllipsis />
        </PaginationContent>
      </Pagination>
    );

    const nav = getByRole('navigation', { name: /pagination/i });
    expect(nav).toBeInTheDocument();

    const page1 = getByText('1');
    expect(page1).toBeInTheDocument();

    const more = getByText('More pages');
    expect(more).toBeInTheDocument();
  });

  it('renders Previous and Next links with accessible labels', () => {
    const { getByLabelText } = render(
      <>
        <PaginationPrevious href="#" />
        <PaginationNext href="#" />
      </>
    );

    const prev = getByLabelText('Go to previous page');
    const next = getByLabelText('Go to next page');

    expect(prev).toBeInTheDocument();
    expect(next).toBeInTheDocument();
  });

  it('marks active page link with aria-current="page"', () => {
    const { getByText } = render(
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    );

    const link = getByText('2');
    expect(link).toHaveAttribute('aria-current', 'page');
  });
});
