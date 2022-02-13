import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchForm from './SearchForm';
import { setupStore } from '../../store';

const store = setupStore();

describe('SearchForm', () => {
  it('should submit', async () => {
    jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    // input ship
    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Ship'
      }),
      {
        target: { value: 'shipid' }
      }
    );

    // input days
    fireEvent.change(
      screen.getByRole('textbox', {
        name: 'Days'
      }),
      {
        target: { value: '4' }
      }
    );

    // try submit
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Track'
      })
    );

    // expect form submmited
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
