import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  BoxProps,
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch
} from '@mui/material';
import * as vesselTrackStore from '../../../store/vessel-track';
import TrackPlayer from './TrackPlayer/TrackPlayer';
import Label from '../Label/Label';

/**
 * TrackControls component that give controls for the point and route of the selected vessel
 */
const TrackControls = (props: BoxProps): JSX.Element | null => {
  const dispatch = useDispatch();

  // select vessel positions
  const vesselPositions = useSelector(vesselTrackStore.selectPositions);

  // select the active index
  const activePositionIndex =
    useSelector(vesselTrackStore.selectActivePositionIndex) ?? 0;

  // select vessel track show route flag
  const vesselTrackShowTrack = useSelector(vesselTrackStore.selectShowTrack);

  // calculate positions' timestamps
  const timestamps = vesselPositions?.map(vp =>
    new Date(vp.TIMESTAMP).getTime()
  );

  // dispatch active index update when TrackPlayer triggers event
  const handleActiveIndexChange = useCallback(
    (value: number) => {
      dispatch(vesselTrackStore.updateActivePositionIndex(value));
    },
    [dispatch]
  );

  const handeZoomClick = () => {
    dispatch(vesselTrackStore.centerOnTrack());
  };

  const handleShowTrackChange = () => {
    dispatch(vesselTrackStore.toogleShowTrack());
  };

  const [speed, setSpeed] = useState<number>(60);

  const handleSpeedChange = (event: SelectChangeEvent<number>) => {
    setSpeed(event.target.value as number);
  };

  return timestamps ? (
    <Box {...props}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={4}>
          <Label htmlFor="Speed">Speed</Label>
          <Select
            id="Speed"
            size="small"
            variant="outlined"
            fullWidth
            value={speed}
            onChange={handleSpeedChange}
          >
            <MenuItem value={1}>Realtime</MenuItem>
            <MenuItem value={10}>Slow(1:10)</MenuItem>
            <MenuItem value={60}>Normal(1:60)</MenuItem>
            <MenuItem value={600}>x10</MenuItem>
            <MenuItem value={3600}>x60</MenuItem>
            <MenuItem value={18000}>x300</MenuItem>
            <MenuItem value={36000}>x600</MenuItem>
          </Select>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Button onClick={handeZoomClick} color="secondary">
            Zoom
          </Button>
          <FormControlLabel
            labelPlacement="start"
            control={
              <Switch
                onChange={handleShowTrackChange}
                checked={vesselTrackShowTrack}
              />
            }
            label="Show track"
          />
        </Stack>
      </Stack>
      <TrackPlayer
        speed={speed}
        activeIndex={activePositionIndex}
        onActiveIndexChange={handleActiveIndexChange}
        timestamps={timestamps}
      />
    </Box>
  ) : null;
};

export default TrackControls;
