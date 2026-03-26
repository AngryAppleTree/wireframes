import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {

    it('renders the logo', () => {
        render(<Header />);
        expect(screen.getByAltText(/Scottish Courts and Tribunals Service/i)).toBeInTheDocument();
    });
});
