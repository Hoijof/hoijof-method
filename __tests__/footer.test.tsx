import { render, screen } from '@testing-library/react';
import Footer from '../app/components/Footer';

describe('Footer Component', () => {
  it('renders footer with logo and branding', () => {
    render(<Footer />);
    expect(screen.getByText(/Hoijof Builder/i)).toBeInTheDocument();
  });

  it('renders link to privacy policy', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /privacy policy/i });
    expect(link).toHaveAttribute('href', '/privacy');
  });

  it('renders link to terms of service', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /terms of service/i });
    expect(link).toHaveAttribute('href', '/terms');
  });

  it('renders link to cookie policy', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /cookie policy/i });
    expect(link).toHaveAttribute('href', '/cookies');
  });

  it('renders contact email', () => {
    render(<Footer />);
    expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
  });

  it('renders copyright notice', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year}`, 'i'))).toBeInTheDocument();
  });
});