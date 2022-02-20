import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { add, formatISO9075 } from 'date-fns';
import {
  Box,
  BoxProps,
  Button,
  Stack,
  TextField,
  Autocomplete
} from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
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
  const vesselTrackSearch = useSelector(vesselTrackStore.selectSearch);

  const { control, handleSubmit, getValues, watch, setValue } = useForm<{
    ship: { label?: string; shipid?: number };
    fromdate: Date;
    todate: Date;
  }>({
    defaultValues: vesselTrackSearch
      ? {
          ship: vesselTrackSearch.ship,
          fromdate: new Date(vesselTrackSearch.fromdate),
          todate: new Date(vesselTrackSearch.todate)
        }
      : {
          ship: {},
          fromdate: add(utcNow, { days: -1 }),
          todate: utcNow
        }
  });

  const onSubmit = handleSubmit(data => {
    const { ship, fromdate, todate } = data;
    const { label, shipid } = ship;

    if (label && shipid) {
      const payload = {
        ship: { label, shipid },
        fromdate: formatISO9075(fromdate),
        todate: formatISO9075(todate)
      };
      // trigger state change to fetch ship's historical positions
      dispatch(vesselTrackStore.fetchVesselPositionsAsync(payload));
    }
  });

  // Hold options and loading state for mock autocomplete
  const [options, setOptions] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch vessels after 4 chars are typed in the autocomplete field
  const handleInputChange = async (
    _event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (!getValues('ship')?.shipid) {
      setValue('ship.label', value);
    }
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
        flexDirection="row"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Stack flexGrow={1} p={4} spacing={4}>
          <Stack flexDirection="row" alignItems="center" sx={{ width: '100%' }}>
            <Label htmlFor="ship">Ship</Label>
            <Controller
              name="ship"
              rules={{ required: true }}
              render={({ field: { onChange, ref } }) => (
                <Autocomplete
                  id="ship"
                  ref={ref}
                  getOptionLabel={option => option.label ?? ''}
                  options={options}
                  isOptionEqualToValue={(option, value) => {
                    if (!getValues('ship')?.shipid) {
                      return true;
                    }
                    return option.label === value.label;
                  }}
                  loading={loading}
                  onInputChange={handleInputChange}
                  blurOnSelect
                  onChange={(_event, value) => {
                    onChange(value);
                  }}
                  onClose={() => setOptions([])}
                  sx={{ flexGrow: 1 }}
                  value={getValues('ship')}
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
          </Stack>
          <Stack direction="row" spacing={4}>
            <Stack flexDirection="row" alignItems="center">
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
                      maxDateTime={watch('todate')}
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
            </Stack>
            <Stack flexDirection="row" alignItems="center">
              <Label htmlFor="todate">To</Label>
              <Controller
                name="todate"
                rules={{ required: true }}
                render={({ field: { onChange, ref, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      ref={ref}
                      value={value}
                      minDateTime={watch('fromdate')}
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
            </Stack>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          disableElevation
          type="submit"
          startIcon={<ChevronRightIcon />}
          aria-label="Search"
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
        />
      </Stack>
    </Box>
  );
};

export default SearchForm;
