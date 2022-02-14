import { RootState } from '..';
import VesselPosition from '../../types/vessel-position';

export const selectVesselPositions = (
  state: RootState
): VesselPosition[] | undefined => state['vessel-track'].value;
