import { Box, BoxProps, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectVesselTrackValues } from '../../store/vessel-track/vessel-track.selector';

const Map = (props: BoxProps): JSX.Element => {
  const vesselTrackValues = useSelector(selectVesselTrackValues);

  return (
    <Box {...props}>
      <Box>
        <Typography variant="h1">MAP</Typography>
        <Typography>Results: {vesselTrackValues?.length ?? 0}</Typography>
      </Box>
    </Box>
  );
};

export default Map;
