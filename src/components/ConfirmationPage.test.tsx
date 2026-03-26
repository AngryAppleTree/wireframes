import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { ConfirmationPage } from './ConfirmationPage';

describe('ConfirmationPage Component', () => {
    it('should not have any accessibility violations', async () => {
        const { container } = render(<ConfirmationPage onRestart={() => { }} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('renders title and subtext correctly', () => {
        render(<ConfirmationPage onRestart={() => { }} />);

        expect(screen.getByRole('heading', {
            name: /Thank you for submitting an audio \/ video file for a transcript/i
        })).toBeInTheDocument();

        expect(screen.getByText(/The transcription service runs overnight. You should receive a word document around 8pm this evening/i)).toBeInTheDocument();
    });

    it('triggers onRestart when the button is clicked', async () => {
        const handleRestart = vi.fn();
        render(<ConfirmationPage onRestart={handleRestart} />);

        await userEvent.click(screen.getByRole('button', { name: /Submit another file/i }));
        expect(handleRestart).toHaveBeenCalledTimes(1);
    });
});
