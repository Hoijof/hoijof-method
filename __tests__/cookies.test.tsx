import { render, screen } from '@testing-library/react';
import Cookies from '../app/cookies/page';

describe('Cookie Policy Page', () => {
  it('renders page at cookies route', () => {
    render(<Cookies />);
    expect(screen.getByRole('heading', { name: /cookie policy/i })).toBeInTheDocument();
  });

  it('displays contact email', () => {
    render(<Cookies />);
    expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
  });

  it('includes cookie types section', () => {
    render(<Cookies />);
    expect(screen.getByText(/types of cookies/i, { exact: false })).toBeInTheDocument();
  });

  it('includes adsense disclosure', () => {
    render(<Cookies />);
    const elements = screen.getAllByText(/google adsense/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('includes cookie management instructions', () => {
    render(<Cookies />);
    expect(screen.getByText(/managing your cookies/i, { exact: false })).toBeInTheDocument();
  });
});