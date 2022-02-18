import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch
} from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import * as vesselTrackStore from '../../../store/vessel-track';
import TrackPlayer from './TrackPlayer/TrackPlayer';
import Label from '../Label/Label';

/**
 * TrackControls component that give controls for the point and route of the selected vessel
 */
const TrackControls = (): JSX.Element | null => {
  const dispatch = useDispatch();

  // select vessel positions
  const vesselPositions = useSelector(vesselTrackStore.selectPositions);

  // select the active index
  const activePositionIndex = useSelector(
    vesselTrackStore.selectActivePositionIndex
  );

  // select vessel track show route flag
  const vesselTrackShowRoute = useSelector(vesselTrackStore.selectShowRoute);

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

  const handleShowRouteChange = () => {
    dispatch(vesselTrackStore.togleShowRoute());
  };

  const [speed, setSpeed] = useState<number>(60);

  const handleSpeedChange = (event: SelectChangeEvent<number>) => {
    setSpeed(event.target.value as number);
  };

  const handleBackClick = () => {
    dispatch(vesselTrackStore.showSearch());
  };

  if (timestamps && timestamps.length > 0) {
    return (
      <Stack direction="row">
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          aria-label="Back"
          onClick={handleBackClick}
          sx={{
            flexShrink: 0,
            width: 140,
            height: 140,
            borderRadius: 0,
            '.MuiButton-startIcon': {
              m: 0,
              svg: {
                fontSize: 64
              }
            }
          }}
          startIcon={<ChevronLeftIcon />}
        />
        <Stack flexGrow={1} p={4} spacing={4}>
          <TrackPlayer
            speed={speed}
            activeIndex={activePositionIndex ?? 0}
            onActiveIndexChange={handleActiveIndexChange}
            timestamps={timestamps}
          />
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Label htmlFor="speed">Speed</Label>
              <Select
                id="speed"
                size="small"
                variant="outlined"
                fullWidth
                value={speed}
                onChange={handleSpeedChange}
                sx={{ width: 160 }}
                aria-label="Speed"
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
                    onChange={handleShowRouteChange}
                    checked={vesselTrackShowRoute}
                  />
                }
                label="Show track"
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return null;
};

export default TrackControls;
