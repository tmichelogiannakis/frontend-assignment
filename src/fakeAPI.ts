const vessels = [
  {
    TYPE: 'Vessel',
    ITEM_ID: 240389000,
    label: 'BLUE STAR MYCONOS',
    value: 'BLUE STAR MYCONOS',
    desc: '[GR] Ro-Ro/Passenger Ship',
    shipid: 212537,
    ANGLE: 200,
    SPEED: 0,
    SHIPTYPE: 6,
    SHIPNAME: 'BLUE STAR MYCONOS'
  },
  {
    TYPE: 'Vessel',
    ITEM_ID: 241159000,
    label: 'BLUE STAR PATMOS',
    value: 'BLUE STAR PATMOS',
    desc: '[GR] Ro-Ro/Passenger Ship',
    shipid: 214617,
    ANGLE: 172,
    SPEED: 0,
    SHIPTYPE: 6,
    SHIPNAME: 'BLUE STAR PATMOS'
  },
  {
    TYPE: 'Vessel',
    ITEM_ID: 239923000,
    label: 'BLUE STAR NAXOS',
    value: 'BLUE STAR NAXOS',
    desc: '[GR] Ro-Ro/Passenger Ship',
    shipid: 211731,
    ANGLE: 317,
    SPEED: 4,
    SHIPTYPE: 6,
    SHIPNAME: 'BLUE STAR NAXOS'
  },
  {
    TYPE: 'Vessel',
    ITEM_ID: 241087000,
    label: 'BLUE STAR DELOS',
    value: 'BLUE STAR DELOS',
    desc: '[GR] Ro-Ro/Passenger Ship',
    shipid: 214421,
    ANGLE: 359,
    SPEED: 0,
    SHIPTYPE: 6,
    SHIPNAME: 'BLUE STAR DELOS'
  },
  {
    TYPE: 'Vessel',
    ITEM_ID: 239924000,
    label: 'BLUE STAR PAROS',
    value: 'BLUE STAR PAROS',
    desc: '[GR] Ro-Ro/Passenger Ship',
    shipid: 211735,
    ANGLE: 179,
    SPEED: 0,
    SHIPTYPE: 6,
    SHIPNAME: 'BLUE STAR PAROS'
  },
  {
    TYPE: 'Vessel',
    ITEM_ID: 240672000,
    label: 'BLUE STAR CHIOS',
    value: 'BLUE STAR CHIOS',
    desc: '[GR] Ro-Ro/Passenger Ship',
    shipid: 213466,
    ANGLE: 65,
    SPEED: 251,
    SHIPTYPE: 6,
    SHIPNAME: 'BLUE STAR CHIOS'
  }
];

const sleep = (delay = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });

const fetchVessels = async () => {
  await sleep(1e3);
  return [...vessels];
};

export default fetchVessels;
