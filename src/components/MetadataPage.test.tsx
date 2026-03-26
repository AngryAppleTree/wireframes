import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { MetadataPage } from './MetadataPage';

describe('MetadataPage Component', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <MetadataPage onSubmit={() => {}} onBack={() => {}} onCancel={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders the form title correctly', () => {
    render(<MetadataPage onSubmit={() => {}} onBack={() => {}} onCancel={() => {}} />);
    expect(
      screen.getByRole('heading', { name: /Please provide information about this interview/i })
    ).toBeInTheDocument();
  });

  it('renders all required form fields', () => {
    render(<MetadataPage onSubmit={() => {}} onBack={() => {}} onCancel={() => {}} />);

    // Check text inputs
    expect(screen.getByLabelText(/Commissioner name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Witness name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Case reference/i)).toBeInTheDocument();

    // Check date input
    const dateInput = screen.getByLabelText(/Interview date/i);
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute('type', 'date');

    // Check select input
    const locationSelect = screen.getByLabelText(/Interview location/i);
    expect(locationSelect).toBeInTheDocument();
  });

  it('contains the dynamically sorted interview locations in alphabetical order', () => {
    render(<MetadataPage onSubmit={() => {}} onBack={() => {}} onCancel={() => {}} />);

    const locationSelect = screen.getByLabelText(/Interview location/i);
    const options = Array.from(locationSelect.querySelectorAll('option'));

    // Ignore the default "Select a location" placeholder at index 0
    const optionValues = options.slice(1).map((opt) => opt.value);

    expect(optionValues).toEqual([
      'Aberdeen',
      'Dundee',
      'Edinburgh',
      'Glasgow',
      'Inverness',
      'North Strathclyde',
      'Remote evidence suite',
      'South Strathclyde',
    ]);
  });

  it('triggers onCancel when cancel is clicked', async () => {
    const handleCancel = vi.fn();
    render(<MetadataPage onSubmit={() => {}} onBack={() => {}} onCancel={handleCancel} />);

    await userEvent.click(screen.getByRole('button', { name: /Cancel and go back/i }));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('displays error messages when submitting an empty form', async () => {
    const handleSubmit = vi.fn();
    render(<MetadataPage onSubmit={handleSubmit} onBack={() => {}} onCancel={() => {}} />);

    await userEvent.click(screen.getByRole('button', { name: /Submit metadata/i }));

    expect(screen.getByText(/Error: Please enter the commissioner name./i)).toBeInTheDocument();
    expect(screen.getByText(/Error: Please select an interview location./i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
