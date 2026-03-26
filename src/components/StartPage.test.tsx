import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { StartPage } from './StartPage';

describe('StartPage Component', () => {
    it('should not have any accessibility violations', async () => {
        const { container } = render(<StartPage onStart={() => { }} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('renders the main heading and introductory text', () => {
        render(<StartPage onStart={() => { }} />);

        // Check main heading
        expect(screen.getByRole('heading', {
            name: /Use this service to obtain a transcript from a recording of an Evidence by Commission \(EBC\) procedure/i
        })).toBeInTheDocument();

        // Check paragraphs
        expect(screen.getByText(/Evidence by Commission \(EBC\) is a legal procedure/i)).toBeInTheDocument();
        expect(screen.getByText(/To support the EBC process, Justiciary teams can now use/i)).toBeInTheDocument();
    });

    it('renders the start button', () => {
        render(<StartPage onStart={() => { }} />);

        // Check button exists
        expect(screen.getByRole('button', { name: /Start the transcription upload service now/i })).toBeInTheDocument();
    });
});
