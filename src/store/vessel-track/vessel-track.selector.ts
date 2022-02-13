import { RootState } from '..';

export const selectVesselTrackValues = (state: RootState) =>
  state['vessel-track'].value;
