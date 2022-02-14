import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Box,
  BoxProps,
  Button,
  Stack,
  TextField,
  Typography,
  TypographyProps
} from '@mui/material';
import { fetchVesselTrackAsync } from '../../store/vessel-track/vessel-track.slice';

/**
 * Label component, a reusable component for SearchForm component
 */
const Label: FC<TypographyProps<'label'>> = ({ children, ...otherProps }) => {
  const { sx, ...rest } = otherProps;
  return (
    <Typography
      component="label"
      sx={{ display: 'inline-block', lineHeight: 1, mb: 1, ...sx }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

/**
 * SearchForm component.
 * Select a ship and a specific period of time to fetch historical positions
 */
const SearchForm = (props: BoxProps): JSX.Element => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<{
    shipid: string;
    days: string;
  }>({
    defaultValues: { shipid: '211241', days: '1' }
  });

  // when form is submitted
  // trigger state change to fetch  historical positions
  const onSubmit = handleSubmit(data => {
    dispatch(fetchVesselTrackAsync(data));
  });

  return (
    <Box {...props}>
      <Stack
        direction="row"
        spacing={4}
        alignItems="flex-end"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Box>
          <Label htmlFor="ship">Ship</Label>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            type="text"
            id="ship"
            {...register('shipid')}
          />
        </Box>
        <Box>
          <Label htmlFor="days">Days</Label>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            type="text"
            id="days"
            {...register('days')}
          />
        </Box>
        <Box>
          <Button variant="contained" disableElevation type="submit">
            Track
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default SearchForm;
