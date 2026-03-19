import { render, screen } from '@testing-library/react';
import Privacy from '../../app/privacy/page';
import Terms from '../../app/terms/page';
import Cookies from '../../app/cookies/page';

describe('Legal Pages Integration', () => {
  describe('Contact Information', () => {
    it('displays contact email on privacy policy page', () => {
      render(<Privacy />);
      expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
    });

    it('displays contact email on terms of service page', () => {
      render(<Terms />);
      expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
    });

    it('displays contact email on cookie policy page', () => {
      render(<Cookies />);
      expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
    });
  });
});