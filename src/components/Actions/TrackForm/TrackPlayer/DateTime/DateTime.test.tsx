import { render, screen } from '@testing-library/react';
import DateTime from './DateTime';

describe('Datetime', () => {
  it('should render correct date and time', () => {
    render(<DateTime timestamp={1644866306000} />);
    expect(screen.getByText('2022-02-14')).toBeInTheDocument();
    expect(screen.getByText('21:18')).toBeInTheDocument();
  });
});
