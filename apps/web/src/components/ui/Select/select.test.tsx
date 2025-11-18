import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '.';

describe('Select', () => {
  it('renders trigger', () => {
    const { getByRole } = render(
      <Select>
        <SelectTrigger>Open</SelectTrigger>
        <SelectContent></SelectContent>
      </Select>
    );

    const trigger = getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Open');
  });

  it('opens content when clicked', () => {
    const { getByRole, getByText } = render(
      <Select>
        <SelectTrigger>Select value</SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = getByRole('combobox');
    fireEvent.click(trigger);

    expect(getByText('One')).toBeInTheDocument();
  });

  it('selects an item and updates SelectValue', () => {
    const { getByRole, getByText } = render(
      <Select defaultValue="one">
        <SelectTrigger>
          <SelectValue placeholder="Choose value" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
          <SelectItem value="two">Two</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = getByRole('combobox');

    fireEvent.click(trigger);

    fireEvent.click(getByText('Two'));

    expect(trigger).toHaveTextContent('Two');
  });
});
