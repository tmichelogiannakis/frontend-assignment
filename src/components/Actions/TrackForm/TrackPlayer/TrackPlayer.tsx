import { useEffect, useState, useRef } from 'react';
import { Slider, Stack, StackProps, IconButton } from '@mui/material';
import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  Replay as ReplayIcon
} from '@mui/icons-material';
import DateTime from './DateTime/DateTime';

type TrackPlayerProps = StackProps & {
  speed: number;
  activeIndex: number;
  timestamps: number[];
  onActiveIndexChange: (index: number) => void;
};

/**
 * TrackPlayer component, shows a 'player' that controls the active index of the track positions
 */
const TrackPlayer = ({
  speed,
  activeIndex,
  timestamps,
  onActiveIndexChange,
  ...stackProps
}: TrackPlayerProps): JSX.Element => {
  const [autoplay, setAutoplay] = useState<boolean>(false);

  // holds time and set once time at the time of point 0
  const [time, setTime] = useState<number>(() => timestamps[activeIndex]);

  // keep interal
  const intervalRef = useRef<NodeJS.Timer>();

  // clear interval
  const resetTimeInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // update time when autoplay
  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        setTime(t => t + 1000);
      }, 1000 / speed);
    }
    return () => {
      resetTimeInterval();
    };
  }, [autoplay, speed]);

  // calculate active point when time changes
  // and inform parent component
  useEffect(() => {
    const index = timestamps.findIndex(element => time <= element);
    // if calculated index is negative has reached the end
    if (index < 0) {
      setAutoplay(false);
    }
    // if calculated index is positive and different than active do update
    if (index >= 0 && activeIndex !== index) {
      onActiveIndexChange(index);
    }
  }, [timestamps, time, activeIndex, onActiveIndexChange]);

  // toggle autoplay
  const handleAutoplayToggle = () => {
    setAutoplay(x => !x);
  };

  // set time at the time of point 0
  const handleReplayClick = () => {
    setTime(timestamps[0]);
    setAutoplay(true);
  };

  // set time at the time of point selected on slider
  const handleSliderChange = (_event: Event, value: number | number[]) => {
    setTime(timestamps[value as number]);
    setAutoplay(false);
  };

  return (
    <Stack direction="row" spacing={4} alignItems="center" {...stackProps}>
      {activeIndex === timestamps.length - 1 ? (
        <IconButton
          onClick={handleReplayClick}
          color="primary"
          aria-label="Replay"
        >
          <ReplayIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleAutoplayToggle}
          color="primary"
          aria-label={autoplay ? 'Pause' : 'Play'}
        >
          {autoplay ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      )}
      <Slider
        value={activeIndex}
        aria-label="slider"
        onChange={handleSliderChange}
        min={0}
        max={timestamps.length - 1}
      />
      <DateTime timestamp={time} />
    </Stack>
  );
};

export default TrackPlayer;
