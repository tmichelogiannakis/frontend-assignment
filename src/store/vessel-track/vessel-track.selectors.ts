import { RootState } from '..';
import VesselPosition from '../../types/vessel-position';

export const selectPositions = (
  state: RootState
): VesselPosition[] | undefined => state['vessel-track'].positions;

export const selectActivePositionIndex = (
  state: RootState
): number | undefined => state['vessel-track'].activePositionIndex;

export const selectCenter = (state: RootState): number =>
  state['vessel-track'].center;

export const selectShowTrack = (state: RootState): boolean =>
  state['vessel-track'].ShowTrack;
