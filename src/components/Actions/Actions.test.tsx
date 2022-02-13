import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import Actions from './Actions';
import { setupStore } from '../../store';

const store = setupStore();

describe('Actions', () => {
  it('should have title', () => {
    render(
      <Provider store={store}>
        (<Actions />
      </Provider>
    );
    expect(screen.getByRole('heading')).toHaveTextContent('Track a Vessel');
  });
});
