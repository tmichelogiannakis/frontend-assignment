import { useEffect, useState } from 'react';
import { Box, BoxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import MapGL, { Source, Layer, LayerProps } from 'react-map-gl';
import { Feature, Point, MultiLineString } from 'geojson';
import * as turf from '@turf/turf';
import {
  selectVesselPositions,
  selectActiveIndex
} from '../../store/vessel-track/vessel-track.selector';

// Default public token
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoidGhlbWljIiwiYSI6ImNrbHpqeGY2djNram4yd3FtdzI2d29vbzQifQ.cbG9JufdH2cafZsNtaR3pQ';

// props for route layer
const routeLayer: LayerProps = {
  id: 'vessel-line',
  source: 'vessel-line',
  type: 'line',
  layout: {},
  paint: {
    'line-color': '#035CEA',
    'line-width': 4
  },
  filter: ['==', '$type', 'LineString']
};

// props for point layer
const pointLayer: LayerProps = {
  id: 'vessel-point',
  source: 'vessel-point',
  type: 'symbol',
  layout: {
    'icon-image': 'ferry-15',
    'icon-rotate': ['get', 'bearing'],
    'icon-rotation-alignment': 'map',
    'icon-allow-overlap': true,
    'icon-ignore-placement': true
  }
};

/**
 * Map component.
 * Display the route, as MultiLineString, and the oldest position, as a Point of a vessel
 */
const Map = (props: BoxProps): JSX.Element => {
  const vesselPositions = useSelector(selectVesselPositions);
  const activeIndex = useSelector(selectActiveIndex) ?? 0;

  // holds vessel's route
  const [route, setRoute] = useState<Feature<MultiLineString> | undefined>(
    undefined
  );

  // holds vessel's position
  const [point, setPoint] = useState<Feature<Point> | undefined>(undefined);

  // when vesselPositions are changed
  // update vessel point and route
  useEffect(() => {
    if (vesselPositions) {
      const coordinates = [vesselPositions?.map(i => [i.LON, i.LAT])];
      setRoute({
        id: 'vessel-route',
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'MultiLineString',
          coordinates
        }
      });
    } else {
      setRoute(undefined);
    }
  }, [vesselPositions]);

  useEffect(() => {
    if (vesselPositions && activeIndex) {
      const coordinates = vesselPositions?.map(i => [i.LON, i.LAT]);

      setPoint({
        id: 'point',
        type: 'Feature',
        properties: {
          bearing: turf.bearing(
            turf.point(
              coordinates[
                activeIndex < coordinates.length - 1
                  ? activeIndex
                  : activeIndex - 1
              ]
            ),
            turf.point(
              coordinates[
                activeIndex < coordinates.length - 1
                  ? activeIndex + 1
                  : activeIndex
              ]
            )
          )
        },
        geometry: {
          type: 'Point',
          coordinates: coordinates[activeIndex]
        }
      });
    } else {
      setPoint(undefined);
    }
  }, [vesselPositions, activeIndex]);

  return (
    <Box {...props}>
      <MapGL
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {point && (
          <Source id={pointLayer.id} type="geojson" data={point}>
            <Layer {...pointLayer} />
          </Source>
        )}
        {route && (
          <Source id={routeLayer.id} type="geojson" data={route}>
            <Layer {...routeLayer} />
          </Source>
        )}
      </MapGL>
    </Box>
  );
};

export default Map;
