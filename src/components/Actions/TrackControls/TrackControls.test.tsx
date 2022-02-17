import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TrackControls from './TrackControls';
import { setupStore } from '../../../store';

const store = setupStore({
  'vessel-track': {
    status: 'idle',
    center: 0,
    ShowTrack: true,
    positions: [
      {
        MMSI: '239672000',
        IMO: '9035876',
        STATUS: '0',
        SPEED: '202',
        LON: '23.74925',
        LAT: '37.21778',
        COURSE: '177',
        HEADING: '176',
        TIMESTAMP: '2022-02-14T21:37:13',
        SHIP_ID: '***'
      },
      {
        MMSI: '239672000',
        IMO: '9035876',
        STATUS: '0',
        SPEED: '203',
        LON: '23.74992',
        LAT: '37.20548',
        COURSE: '177',
        HEADING: '176',
        TIMESTAMP: '2022-02-14T21:39:26',
        SHIP_ID: '***'
      },
      {
        MMSI: '239672000',
        IMO: '9035876',
        STATUS: '0',
        SPEED: '203',
        LON: '23.7506',
        LAT: '37.19228',
        COURSE: '177',
        HEADING: '175',
        TIMESTAMP: '2022-02-14T21:41:44',
        SHIP_ID: '***'
      }
    ]
  }
});

describe('TrackControls', () => {
  it('should trigger dispatch when click on slider', async () => {
    jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        (<TrackControls />
      </Provider>
    );

    // click on slider
    fireEvent.change(screen.getByRole('slider', { name: 'slider' }), {
      target: {
        value: 3
      }
    });

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  it('should trigger dispatch when click on zoom button', async () => {
    jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        (<TrackControls />
      </Provider>
    );

    // click on zoom
    fireEvent.click(screen.getByRole('button', { name: 'Zoom' }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  it('should trigger dispatch when click on Show track switcher', async () => {
    jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        (<TrackControls />
      </Provider>
    );

    // click on Show track
    fireEvent.click(screen.getByRole('checkbox', { name: 'Show track' }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
