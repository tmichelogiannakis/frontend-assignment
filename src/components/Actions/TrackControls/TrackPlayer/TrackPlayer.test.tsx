import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TrackPlayer from './TrackPlayer';

describe('TrackPlayer', () => {
  it('should trigger onActiveIndexChange when click on autoplay', async () => {
    const mockActiveIndexChangeHandler = jest.fn();
    render(
      <TrackPlayer
        speed={6000}
        activeIndex={0}
        timestamps={[
          1644861291000, 1644861416000, 1644861547000, 1644861680000,
          1644861812000, 1644861932000, 1644862064000, 1644862193000,
          1644862316000, 1644862444000
        ]}
        onActiveIndexChange={mockActiveIndexChangeHandler}
      />
    );

    // click on play button
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));

    await waitFor(() => {
      expect(mockActiveIndexChangeHandler).toHaveBeenCalled();
    });
  });

  it('should trigger onActiveIndexChange when click on slider', async () => {
    const mockActiveIndexChangeHandler = jest.fn();
    render(
      <TrackPlayer
        speed={6000}
        activeIndex={0}
        timestamps={[
          1644861291000, 1644861416000, 1644861547000, 1644861680000,
          1644861812000, 1644861932000, 1644862064000, 1644862193000,
          1644862316000, 1644862444000
        ]}
        onActiveIndexChange={mockActiveIndexChangeHandler}
      />
    );

    // click on slider
    fireEvent.change(screen.getByRole('slider', { name: 'slider' }), {
      target: {
        value: 3
      }
    });

    await waitFor(() => {
      expect(mockActiveIndexChangeHandler).toHaveBeenCalled();
    });
  });

  it('should trigger onActiveIndexChange when click on replay', async () => {
    const mockActiveIndexChangeHandler = jest.fn();
    render(
      <TrackPlayer
        speed={6000}
        activeIndex={9}
        timestamps={[
          1644861291000, 1644861416000, 1644861547000, 1644861680000,
          1644861812000, 1644861932000, 1644862064000, 1644862193000,
          1644862316000, 1644862444000
        ]}
        onActiveIndexChange={mockActiveIndexChangeHandler}
      />
    );

    // click on replay button
    fireEvent.click(screen.getByRole('button', { name: 'Replay' }));

    await waitFor(() => {
      expect(mockActiveIndexChangeHandler).toHaveBeenCalled();
    });
  });
});
