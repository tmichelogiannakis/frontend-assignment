import VesselPosition from '../../types/vessel-position';

const fetchVesselTrack = async (payload: {
  shipid: string;
  days: string;
}): Promise<VesselPosition[]> => {
  const { shipid, days } = payload;
  const response = await fetch(
    `https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:3/shipid:${shipid}/days:${days}/protocol:jsono`
  );
  const data = await response.json();
  if (response.status != 200) {
    throw data;
  }
  return data;
};

export default fetchVesselTrack;
