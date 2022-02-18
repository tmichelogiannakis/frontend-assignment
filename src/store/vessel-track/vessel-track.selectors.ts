import { RootState } from '..';
import VesselPosition from '../../types/vessel-position';
import { VesselPositionsSearch } from '../../types/vessel-positions-search';

export const selectPositions = (
  state: RootState
): VesselPosition[] | undefined => state['vessel-track'].positions;

export const selectActivePositionIndex = (
  state: RootState
): number | undefined => state['vessel-track'].activePositionIndex;

export const selectCenter = (state: RootState): number =>
  state['vessel-track'].center;

export const selectShowRoute = (state: RootState): boolean =>
  state['vessel-track'].showRoute;

export const selectShowSearch = (state: RootState): boolean =>
  state['vessel-track'].showSearch;

export const selectSearch = (
  state: RootState
): VesselPositionsSearch | undefined => state['vessel-track'].search;
