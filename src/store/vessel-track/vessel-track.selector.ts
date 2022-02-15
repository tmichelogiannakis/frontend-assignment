import { RootState } from '..';
import VesselPosition from '../../types/vessel-position';

export const selectVesselPositions = (
  state: RootState
): VesselPosition[] | undefined => state['vessel-track'].value;

export const selectActiveIndex = (state: RootState): number | undefined =>
  state['vessel-track'].activeIndex;
