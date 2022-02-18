import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Actions from './Actions';
import { setupStore } from '../../store';

describe('Actions', () => {
  it('should show search in default state', async () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        (<Actions />
      </Provider>
    );
    fireEvent.click(screen.getByRole('heading', { name: 'Track a Vessel' }));
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Search' })
      ).toBeInTheDocument();
    });
  });

  it('should show track controls when vessel-track showSearch is false', async () => {
    const store = setupStore({
      'vessel-track': {
        showSearch: false,
        status: 'idle',
        center: 0,
        showRoute: true,
        positions: [
          {
            COURSE: '358',
            HEADING: '19',
            IMO: '9035876',
            LAT: '35.4905',
            LON: '24.07608',
            MMSI: '239672000',
            SHIP_ID: '211241',
            SPEED: '0',
            STATUS: '5',
            TIMESTAMP: '2022-02-13T15:54:50'
          }
        ]
      }
    });
    render(
      <Provider store={store}>
        (<Actions />
      </Provider>
    );
    fireEvent.click(screen.getByRole('heading', { name: 'Track a Vessel' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    });
  });
});
