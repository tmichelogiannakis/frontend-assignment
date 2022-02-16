import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchForm from './SearchForm';
import { setupStore } from '../../../store';

const store = setupStore();

describe('SearchForm', () => {
  it('should submit', async () => {
    jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    // search for a ship
    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Ship'
      }),
      {
        target: { value: 'BLUE' }
      }
    );
    await waitFor(() => {
      fireEvent.click(screen.getByText('BLUE STAR DELOS'));
    });

    // try submit
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Search'
      })
    );

    // expect form submmited
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
