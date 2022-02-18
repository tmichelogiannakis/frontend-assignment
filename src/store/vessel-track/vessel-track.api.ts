const fetchVesselTrack = async (payload: {
  shipid: number;
  fromdate: string;
  todate: string;
}): Promise<Response> => {
  const { shipid, fromdate, todate } = payload;
  const response = await fetch(
    `https://services.marinetraffic.com/api/exportvesseltrack/cf8f05df0b57bfae43e762cc61fd381239c4c042/v:3/shipid:${shipid}/fromdate:${fromdate}/todate:${todate}/protocol:jsono`
  );

  return response;
};

export default fetchVesselTrack;
