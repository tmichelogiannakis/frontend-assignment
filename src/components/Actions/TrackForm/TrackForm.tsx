import { useDispatch, useSelector } from 'react-redux';
import { Box, BoxProps } from '@mui/material';
import {
  selectActiveIndex,
  selectVesselPositions
} from '../../../store/vessel-track/vessel-track.selector';
import { updateActiveIndex } from '../../../store/vessel-track/vessel-track.slice';
import TrackPlayer from './TrackPlayer/TrackPlayer';
import { useCallback } from 'react';

/**
 * TrackForm component that give controls for the point and route of the selected vessel
 */
const TrackForm = (props: BoxProps): JSX.Element | null => {
  const dispatch = useDispatch();

  // select vessel positions
  const vesselPositions = useSelector(selectVesselPositions);

  // select the active index
  const index = useSelector(selectActiveIndex) ?? 0;

  // calculate positions' timestamps
  const timestamps = vesselPositions?.map(vp =>
    new Date(vp.TIMESTAMP).getTime()
  );

  // dispatch active index update when TrackPlayer triggers event
  const handleActiveIndexChange = useCallback(
    (value: number) => {
      dispatch(updateActiveIndex(value));
    },
    [dispatch]
  );

  return timestamps ? (
    <Box {...props}>
      <TrackPlayer
        activeIndex={index}
        onActiveIndexChange={handleActiveIndexChange}
        speed={600}
        timestamps={timestamps}
      />
    </Box>
  ) : null;
};

export default TrackForm;
