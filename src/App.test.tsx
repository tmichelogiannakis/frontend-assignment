import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should have title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Track a Vessel'
    );
  });
});
