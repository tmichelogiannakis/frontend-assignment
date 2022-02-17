import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { add, formatISO9075 } from 'date-fns';
import {
  Box,
  BoxProps,
  Button,
  Stack,
  TextField,
  Autocomplete
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Label from '../Label/Label';
import * as vesselTrackStore from '../../../store/vessel-track';
import fetchVessels from '../../../fakeAPI';
import Vessel from '../../../types/vessel';

// remove timezoneOffset from a Date
const withoutTimezoneOffset = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset();
  return add(date, { minutes: timezoneOffset });
};

const utcNow = withoutTimezoneOffset(new Date());

/**
 * SearchForm component.
 * Select a ship and a specific period of time to ship's historical positions
 */
const SearchForm = (props: BoxProps): JSX.Element => {
  const dispatch = useDispatch();

  const { control, handleSubmit, getValues } = useForm<{
    shipid: string;
    fromdate: Date;
    todate: Date;
  }>({
    defaultValues: {
      fromdate: add(utcNow, { days: -1 }),
      todate: utcNow
    }
  });

  const onSubmit = handleSubmit(data => {
    const payload = {
      shipid: data.shipid,
      fromdate: formatISO9075(data.fromdate),
      todate: formatISO9075(data.todate)
    };
    // trigger state change to fetch ship's historical positions
    dispatch(vesselTrackStore.fetchVesselPositionsAsync(payload));
  });

  // Hold options and loading state for mock autocomplete
  const [options, setOptions] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch vessels after 4 chars are typed in the autocomplete field
  const handleInputChange = async (
    _event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (value.length > 3) {
      setLoading(true);
      const data = await fetchVessels();
      setOptions([...data]);
      setLoading(false);
    }
  };

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
        <Box sx={{ width: 256 }}>
          <Label htmlFor="ship">Ship</Label>
          <Controller
            name="shipid"
            rules={{ required: true }}
            render={({ field: { onChange, ref } }) => (
              <Autocomplete
                id="ship"
                ref={ref}
                getOptionLabel={option => option.label}
                options={options}
                loading={loading}
                onInputChange={handleInputChange}
                blurOnSelect
                onChange={(_event, value) => {
                  onChange(value?.shipid);
                }}
                onClose={() => setOptions([])}
                renderInput={params => (
                  <TextField
                    {...params}
                    size="small"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      ...params.InputProps
                    }}
                  />
                )}
              />
            )}
            control={control}
          />
        </Box>
        <Box sx={{ width: 192 }}>
          <Label htmlFor="fromdate">From</Label>
          <Controller
            name="fromdate"
            rules={{ required: true }}
            render={({ field: { onChange, ref, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  minDateTime={add(utcNow, { days: -150 })}
                  maxDateTime={getValues('todate')}
                  inputFormat="yyyy-MM-dd HH:mm"
                  renderInput={params => (
                    <TextField
                      id="fromdate"
                      size="small"
                      variant="outlined"
                      fullWidth
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
            control={control}
          />
        </Box>
        <Box sx={{ width: 192 }}>
          <Label htmlFor="todate">To</Label>
          <Controller
            name="todate"
            rules={{ required: true }}
            render={({ field: { onChange, ref, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  ref={ref}
                  value={value}
                  minDateTime={getValues('fromdate')}
                  maxDateTime={utcNow}
                  onChange={onChange}
                  inputFormat="yyyy-MM-dd HH:mm"
                  renderInput={params => (
                    <TextField
                      id="todate"
                      size="small"
                      variant="outlined"
                      fullWidth
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
            control={control}
          />
        </Box>
        <Box>
          <Button variant="contained" disableElevation type="submit">
            Search
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default SearchForm;
