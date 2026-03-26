import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
    it('renders the button with children text', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders a primary button by default', () => {
        render(<Button>Primary</Button>);
        const button = screen.getByRole('button', { name: /primary/i });
        expect(button).toHaveClass('btn', 'btn-primary');
    });

    it('renders a secondary button when secondary prop is passed', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByRole('button', { name: /secondary/i });
        expect(button).toHaveClass('btn', 'btn-secondary');
    });

    it('calls onClick handler when clicked', async () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);

        await userEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
