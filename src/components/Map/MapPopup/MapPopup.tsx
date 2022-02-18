import { useMemo } from 'react';
import { Box } from '@mui/material';
import { Popup } from 'react-map-gl';
import VesselPosition from '../../../types/vessel-position';
import { NavigationalStatusMap } from '../../../constants';

type MapPopupProps = {
  position: VesselPosition;
};

/**
 * MapPopup component.
 * Display a popup over the Point of a vessel
 */
const MapPopup = ({ position }: MapPopupProps): JSX.Element => {
  const speed = `${(Number(position.SPEED) * 0.1852).toFixed(1)} Kph`;

  // place popup opposite of the moving direction
  const popupAnchor = useMemo(() => {
    const heading = Number(position.HEADING);
    if (heading <= 22.5) {
      return 'top';
    }
    if (heading > 22.5 && heading <= 67.5) {
      return 'top-right';
    }
    if (heading > 67.5 && heading <= 112.5) {
      return 'right';
    }
    if (heading > 112.5 && heading <= 157.5) {
      return 'bottom-right';
    }
    if (heading > 157.5 && heading <= 202.5) {
      return 'bottom';
    }
    if (heading > 202.5 && heading <= 247.5) {
      return 'bottom-left';
    }
    if (heading > 247.5 && heading <= 292.5) {
      return 'left';
    }
    if (heading > 292.5 && heading <= 337.5) {
      return 'top-left';
    }
    if (heading > 337.5) {
      return 'top';
    }
    return 'center';
  }, [position.HEADING]);

  return (
    <Popup
      longitude={Number(position.LON)}
      latitude={Number(position.LAT)}
      anchor={popupAnchor}
      closeButton={false}
      closeOnClick={false}
    >
      <Box>
        Status: <strong>{NavigationalStatusMap[position.STATUS]}</strong>
      </Box>
      <Box>
        Speed: <strong>{speed}</strong>
      </Box>
    </Popup>
  );
};

export default MapPopup;
