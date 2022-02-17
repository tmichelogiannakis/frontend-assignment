import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchVesselTrack from './vessel-track.api';
import VesselPosition from '../../types/vessel-position';

const initialState = {
  positions: undefined,
  activePositionIndex: undefined,
  center: 0,
  ShowTrack: true,
  status: 'idle',
  error: undefined
} as {
  positions?: VesselPosition[];
  activePositionIndex?: number;
  center: number;
  ShowTrack: boolean;
  status: 'idle' | 'loading';
  error?: unknown;
};

export const fetchVesselPositionsAsync = createAsyncThunk(
  'vessel-track/fetch',
  async (payload: { shipid: string; fromdate: string; todate: string }) => {
    try {
      const response = await fetchVesselTrack(payload);
      const data = await response.json();
      if (response.status != 200) {
        throw data;
      }
      return {
        data
      };
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
    updateActivePositionIndex: (state, action: PayloadAction<number>) => {
      state.activePositionIndex = action.payload;
    },
    centerOnTrack: state => {
      state.center += 1;
    },
    toogleShowTrack: state => {
      state.ShowTrack = !state.ShowTrack;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVesselPositionsAsync.pending, state => {
        state.positions = undefined;
        state.error = undefined;
        state.activePositionIndex = undefined;
        state.status = 'loading';
      })
      .addCase(fetchVesselPositionsAsync.fulfilled, (state, action) => {
        const data = action.payload?.data;
        state.status = 'idle';
        state.positions = data;
        // if data initialize activePositionIndex and do center map
        state.activePositionIndex = data ? 1 : undefined;
        state.center = data ? 1 : 0;
        state.error = action.payload?.error;
      });
  }
});

export const { updateActivePositionIndex, centerOnTrack, toogleShowTrack } =
  vesselTrackSlice.actions;

export default vesselTrackSlice.reducer;
