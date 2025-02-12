import leaflet from 'leaflet';
import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { City } from '../types/city';
import { Map } from 'leaflet';

export default function useMap(
  mapRef: MutableRefObject<HTMLDivElement | null>,
  city: City
): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current);

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }

    if (isRenderedRef.current) {
      map?.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }

  }, [mapRef, city, map]);

  return map;
}

