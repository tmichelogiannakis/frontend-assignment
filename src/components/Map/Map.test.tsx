import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Map from './Map';
import { setupStore } from '../../store';

const store = setupStore();

describe('Map', () => {
  it('should have title', () => {
    render(
      <Provider store={store}>
        <Map />
      </Provider>
    );
    expect(screen.getByRole('heading')).toHaveTextContent('MAP');
  });
});
