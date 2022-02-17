import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, BoxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import MapGL, { Source, Layer, LayerProps, MapRef } from 'react-map-gl';
import { WebMercatorViewport } from '@math.gl/web-mercator';
import { Feature, Point, MultiLineString } from 'geojson';
import * as turf from '@turf/turf';
import * as vesselTrackStore from '../../store/vessel-track';
import MapPopup from './MapPopup/MapPopup';

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
    'icon-image': 'vessel',
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
  // select from vessel-track state
  const vesselPositions = useSelector(vesselTrackStore.selectPositions);
  const activePositionIndex = useSelector(
    vesselTrackStore.selectActivePositionIndex
  );
  const vesselTrackCenter = useSelector(vesselTrackStore.selectCenter);
  const vesselTrackShowTrack = useSelector(vesselTrackStore.selectShowTrack);
  const activePossition =
    vesselPositions && activePositionIndex
      ? vesselPositions[activePositionIndex]
      : undefined;

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
      const coordinates = [
        vesselPositions?.map(i => [Number(i.LON), Number(i.LAT)])
      ];
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
    if (activePossition) {
      setPoint({
        id: 'point',
        type: 'Feature',
        properties: {
          bearing: Number(activePossition.HEADING)
        },
        geometry: {
          type: 'Point',
          coordinates: [
            Number(activePossition.LON),
            Number(activePossition.LAT)
          ]
        }
      });
    } else {
      setPoint(undefined);
    }
  }, [activePossition]);

  const mapRef = useRef<MapRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMapLoad = (e: mapboxgl.MapboxEvent<undefined>) => {
    const map = e.target;
    map.loadImage('/vessel.png', (error, image) => {
      if (error) {
        throw error;
      }
      if (!map.hasImage('vessel')) {
        map.addImage('vessel', image as ImageBitmap, { sdf: true });
      }
    });
  };

  const fitBounds: [[number, number], [number, number]] | undefined =
    useMemo(() => {
      if (route) {
        const [minX, minY, maxX, maxY] = turf.bbox(route);
        return [
          [minX, minY],
          [maxX, maxY]
        ];
      }
    }, [route]);

  useEffect(() => {
    if (vesselTrackCenter && fitBounds) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const { width, height } = rect;
        const { longitude, latitude, zoom, bearing } = new WebMercatorViewport({
          width,
          height
        }).fitBounds(fitBounds, {
          padding: 40,
          maxZoom: 16
        });
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom,
          bearing,
          duration: 200
        });
      }
    }
  }, [vesselTrackCenter, fitBounds]);

  return (
    <Box ref={containerRef} {...props}>
      <MapGL
        initialViewState={{
          zoom: 0
        }}
        onLoad={handleMapLoad}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        ref={mapRef}
      >
        {point && (
          <Source id={pointLayer.id} type="geojson" data={point}>
            <Layer {...pointLayer} />
          </Source>
        )}
        {route && vesselTrackShowTrack && (
          <Source id={routeLayer.id} type="geojson" data={route}>
            <Layer {...routeLayer} />
          </Source>
        )}
        {activePossition && <MapPopup position={activePossition} />}
      </MapGL>
    </Box>
  );
};

export default Map;
