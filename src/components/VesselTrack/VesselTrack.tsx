import { useSelector, useDispatch } from 'react-redux';
import { Alert, Box, Snackbar } from '@mui/material';
import Map from '../Map/Map';
import Actions from '../Actions/Actions';
import * as vesselTrackStore from '../../store/vessel-track';

const VesselTrack = (): JSX.Element => {
  const dispatch = useDispatch();
  const vesselTrackError = useSelector(vesselTrackStore.selectError);

  const handleDialogClose = () => {
    dispatch(vesselTrackStore.clearError());
  };

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'relative'
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!vesselTrackError}
        autoHideDuration={8000}
        onClose={handleDialogClose}
      >
        <Alert onClose={handleDialogClose} severity="error">
          {vesselTrackError}
        </Alert>
      </Snackbar>
      <Map
        sx={{
          height: '100%'
        }}
      />
      <Actions
        sx={{
          position: 'fixed',
          padding: 4,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          left: 0,
          right: 0
        }}
      />
    </Box>
  );
};

export default VesselTrack;
