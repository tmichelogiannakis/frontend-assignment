import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchVesselTrack from './vessel-track.api';
import VesselPosition from '../../types/vessel-position';
import { VesselPositionsSearch } from '../../types/vessel-positions-search';

const initialState = {
  search: undefined,
  showSearch: true,
  positions: undefined,
  activePositionIndex: undefined,
  center: 0,
  showRoute: true,
  status: 'idle',
  error: undefined
} as {
  search?: VesselPositionsSearch;
  showSearch: boolean;
  positions?: VesselPosition[];
  activePositionIndex?: number;
  center: number;
  showRoute: boolean;
  status: 'idle' | 'loading';
  error?: string;
};

export const fetchVesselPositionsAsync = createAsyncThunk(
  'vessel-track/fetch',
  async (payload: VesselPositionsSearch) => {
    const {
      fromdate,
      todate,
      ship: { shipid }
    } = payload;
    try {
      const response = await fetchVesselTrack({
        fromdate,
        todate,
        shipid
      });
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
    togleShowRoute: state => {
      state.showRoute = !state.showRoute;
    },
    showSearch: state => {
      state.showSearch = true;
      // clear data
      state.positions = undefined;
      state.activePositionIndex = undefined;
      state.center = 0;
    },
    clearError: state => {
      state.error = undefined;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVesselPositionsAsync.pending, (state, action) => {
        state.search = action.meta.arg as VesselPositionsSearch;
        state.status = 'loading';
        state.positions = undefined;
        state.error = undefined;
        state.activePositionIndex = undefined;
        state.center = 0;
      })
      .addCase(fetchVesselPositionsAsync.fulfilled, (state, action) => {
        const data = action.payload?.data;
        state.status = 'idle';
        state.positions = data;
        // if data initialize activePositionIndex and do center map
        state.activePositionIndex = data ? 0 : undefined;
        state.center = data ? 1 : 0;
        state.showSearch = !data;
        state.error = action.payload?.error;
      });
  }
});

export const {
  updateActivePositionIndex,
  centerOnTrack,
  togleShowRoute,
  showSearch,
  clearError
} = vesselTrackSlice.actions;

export default vesselTrackSlice.reducer;
