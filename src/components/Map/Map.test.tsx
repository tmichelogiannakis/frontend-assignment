import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Map from './Map';
import { setupStore } from '../../store';

describe('Map', () => {
  it('should render without "vessel-track" data', async () => {
    const store = setupStore();
    const { container } = render(
      <Provider store={store}>
        <Map />
      </Provider>
    );
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
  it('should render with "vessel-track" data', async () => {
    const store = setupStore({
      'vessel-track': {
        status: 'idle',
        value: [
          {
            COURSE: '358',
            HEADING: '19',
            IMO: '9035876',
            LAT: 35.4905,
            LON: 24.07608,
            MMSI: '239672000',
            SHIP_ID: '211241',
            SPEED: '0',
            STATUS: '5',
            TIMESTAMP: '2022-02-13T15:54:50'
          },
          {
            COURSE: '358',
            HEADING: '19',
            IMO: '9035876',
            LAT: 35.49052,
            LON: 24.0761,
            MMSI: '239672000',
            SHIP_ID: '211241',
            SPEED: '0',
            STATUS: '5',
            TIMESTAMP: '2022-02-13T16:15:50'
          }
        ]
      }
    });
    const { container } = render(
      <Provider store={store}>
        <Map />
      </Provider>
    );
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});
