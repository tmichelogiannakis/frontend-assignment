import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import VesselTrack from './VesselTrack';
import { setupStore } from '../../store';

describe('VesselTrack', () => {
  it('should have title', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <VesselTrack />
      </Provider>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Track a Vessel'
    );
  });

  it('should show and close error', async () => {
    const store = setupStore({
      'vessel-track': {
        error: 'Something went wrong',
        showSearch: true,
        status: 'idle',
        center: 0,
        showRoute: true,
        positions: []
      }
    });
    jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <VesselTrack />
      </Provider>
    );

    // expect error Snackbar
    expect(screen.getByRole('presentation')).toBeInTheDocument();

    // close error alert
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    // expect dispatch action
    expect(store.dispatch).toHaveBeenCalled();

    // expect error Snackbar to disappear
    await waitFor(() => {
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });
  });
});
