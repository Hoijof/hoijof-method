import { render, screen } from '@testing-library/react';
import Privacy from '../app/privacy/page';

describe('Privacy Policy Page', () => {
  it('renders page at privacy route', () => {
    render(<Privacy />);
    expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument();
  });

  it('displays contact email', () => {
    render(<Privacy />);
    expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
  });

  it('includes data collection section', () => {
    render(<Privacy />);
    expect(screen.getByText(/data we collect/i)).toBeInTheDocument();
  });

  it('includes adsense disclosure', () => {
    render(<Privacy />);
    const elements = screen.getAllByText(/google adsense/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('includes user rights section', () => {
    render(<Privacy />);
    expect(screen.getByText(/your rights/i, { exact: false })).toBeInTheDocument();
  });
});