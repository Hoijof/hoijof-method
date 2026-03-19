import { render, screen } from '@testing-library/react';
import Terms from '../app/terms/page';

describe('Terms of Service Page', () => {
  it('renders page at terms route', () => {
    render(<Terms />);
    expect(screen.getByRole('heading', { name: /terms of service/i })).toBeInTheDocument();
  });

  it('displays contact email', () => {
    render(<Terms />);
    expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
  });

  it('includes service description', () => {
    render(<Terms />);
    const elements = screen.getAllByText(/hoijof builder/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('includes liability disclaimer', () => {
    render(<Terms />);
    expect(screen.getByText(/limitation of liability/i, { exact: false })).toBeInTheDocument();
  });

  it('includes user responsibilities', () => {
    render(<Terms />);
    expect(screen.getByText(/user responsibilities/i, { exact: false })).toBeInTheDocument();
  });
});