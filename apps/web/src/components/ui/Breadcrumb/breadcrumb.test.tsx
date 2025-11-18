import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '.';

describe('Breadcrumb', () => {
  it('renders a breadcrumb nav with items and current page', () => {
    const { getByRole, getByText } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    const nav = getByRole('navigation', { name: /breadcrumb/i });
    expect(nav).toBeInTheDocument();

    const home = getByText('Home');
    expect(home).toHaveAttribute('href', '/');

    const current = getByText('Dashboard');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current).toHaveAttribute('role', 'link');
  });

  it('BreadcrumbLink supports asChild and custom element', () => {
    const Custom = (props: ComponentProps<'button'>) => (
      <button type="button" {...props} />
    );

    const { getByRole } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Custom>Click me</Custom>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    const btn = getByRole('button', { name: 'Click me' });
    expect(btn).toBeInTheDocument();
  });

  it('renders separator and ellipsis with proper semantics', () => {
    const { getByText, getAllByRole } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    const separators = getAllByRole('listitem');
    expect(separators.length).toBeGreaterThanOrEqual(1);

    const more = getByText('More');
    expect(more).toBeInTheDocument();
  });
});
