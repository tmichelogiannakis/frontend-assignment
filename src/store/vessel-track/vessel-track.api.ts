import VesselPosition from '../../types/vessel-position';

const fetchVesselTrack = async (payload: {
  shipid: string;
  fromdate: string;
  todate: string;
}): Promise<VesselPosition[]> => {
  const { shipid, fromdate, todate } = payload;
  const response = await fetch(
    `https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:3/shipid:${shipid}/fromdate:${fromdate}/todate:${todate}/protocol:jsono`
  );
  const data = await response.json();
  if (response.status != 200) {
    throw data;
  }
  return data;
};

export default fetchVesselTrack;
