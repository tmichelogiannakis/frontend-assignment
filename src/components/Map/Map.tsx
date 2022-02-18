import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, BoxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import MapGL, { Source, Layer, LayerProps, MapRef } from 'react-map-gl';
import { WebMercatorViewport } from '@math.gl/web-mercator';
import { Feature, Point, MultiLineString } from 'geojson';
import * as turf from '@turf/turf';
import * as vesselTrackStore from '../../store/vessel-track';
import MapPopup from './MapPopup/MapPopup';

// props for route layer
const routeLayer: LayerProps = {
  id: 'vessel-line',
  source: 'vessel-line',
  type: 'line',
  layout: {},
  paint: {
    'line-color': '#ce93d8',
    'line-width': 2
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
  const vesselTrackShowRoute = useSelector(vesselTrackStore.selectShowRoute);
  const activePossition =
    vesselPositions && activePositionIndex
      ? vesselPositions[activePositionIndex]
      : undefined;

  const route: Feature<MultiLineString> | undefined = useMemo(() => {
    if (vesselPositions) {
      const coordinates = [
        vesselPositions?.map(i => [Number(i.LON), Number(i.LAT)])
      ];
      return {
        id: 'vessel-route',
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'MultiLineString',
          coordinates
        }
      };
    }
  }, [vesselPositions]);

  const point: Feature<Point> | undefined = useMemo(() => {
    if (activePossition) {
      return {
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
      };
    }
  }, [activePossition]);

  // reference of MapGL
  const mapRef = useRef<MapRef>(null);
  // reference of parent Box of MapGL
  const containerRef = useRef<HTMLDivElement>(null);

  // add custom marker
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

  // bounds based on route MultiLineString
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

  // when vesselTrackCenter changed value do recenter the map on route bounds
  useEffect(() => {
    if (vesselTrackCenter && fitBounds) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const { width, height } = rect;
        const { longitude, latitude, zoom, bearing } = new WebMercatorViewport({
          width,
          height
        }).fitBounds(fitBounds, {
          padding: 80,
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
          zoom: 1
        }}
        onLoad={handleMapLoad}
        mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        ref={mapRef}
      >
        {point && (
          <Source id={pointLayer.id} type="geojson" data={point}>
            <Layer {...pointLayer} />
          </Source>
        )}
        {route && vesselTrackShowRoute && (
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
