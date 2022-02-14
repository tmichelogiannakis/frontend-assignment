import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchVesselTrack from './vessel-track.api';
import VesselPosition from '../../types/vessel-position';

const initialState = {
  value: undefined,
  status: 'idle',
  error: undefined
} as {
  value?: VesselPosition[];
  status: 'idle' | 'loading';
  error?: unknown;
};

export const fetchVesselTrackAsync = createAsyncThunk(
  'vessel-track/fetch',
  async (payload: { shipid: string; days: string }) => {
    try {
      const data = await fetchVesselTrack(payload);
      return { data };
    } catch (error) {
      return {
        error: 'Something went wrong'
      };
    }
  }
);

export const vesselTrackSlice = createSlice({
  name: 'vessel-track',
  initialState,
  reducers: {
    //
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVesselTrackAsync.pending, state => {
        state.value = undefined;
        state.error = undefined;
        state.status = 'loading';
      })
      .addCase(fetchVesselTrackAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload?.data;
        state.error = action.payload?.error;
      });
  }
});

export default vesselTrackSlice.reducer;
