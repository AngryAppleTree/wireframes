import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders StartPage by default', () => {
    render(<App />);
    const heading = screen.getByRole('heading', {
      name: /Use this service to obtain a transcript from a recording of an Evidence by Commission \(EBC\) procedure/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
