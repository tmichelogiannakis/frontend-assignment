import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should have title', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Hello world');
  });
});
