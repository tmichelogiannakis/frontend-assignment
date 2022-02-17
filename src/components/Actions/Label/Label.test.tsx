import { render, screen } from '@testing-library/react';
import Label from './Label';

describe('Label', () => {
  it('should submit', () => {
    render(
      <>
        <Label htmlFor="input-id">Label</Label>
        <input name="name" id="input-id" />
      </>
    );

    expect(screen.getByRole('textbox', { name: 'Label' })).toBeInTheDocument();
  });
});
