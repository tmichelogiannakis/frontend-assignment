const fetchVesselTrack = async (payload: {
  shipid: number;
  fromdate: string;
  todate: string;
}): Promise<Response> => {
  const { shipid, fromdate, todate } = payload;
  const response = await fetch(
    `https://services.marinetraffic.com/api/exportvesseltrack/${process.env.MARINETRAFFIC_API_KEY}/v:3/shipid:${shipid}/fromdate:${fromdate}/todate:${todate}/protocol:jsono`
  );

  return response;
};

export default fetchVesselTrack;
