import { MutableRefObject } from 'react';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';
import { useEffect } from 'react';
import { OfferPreview, DetailedOffer } from '../../types/offer-types';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { offersSelectors } from '../../store/slices/offers';

type MapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  offersPreview: OfferPreview[];
  currentOffer?: DetailedOffer;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

export default function Map({ mapRef, offersPreview, currentOffer }: MapProps): null {
  const city = currentOffer?.city || offersPreview[0]?.city;
  const map = useMap(mapRef, city);
  const idFocusCard = useAppSelector(offersSelectors.idFocusCard);

  useEffect(() => {
    if (map) {
      const markerLayer = leaflet.layerGroup().addTo(map);
      offersPreview.forEach((offerPreview) => {
        leaflet
          .marker({
            lat: offerPreview.location.latitude,
            lng: offerPreview.location.longitude,
          }, {
            icon: idFocusCard === offerPreview.id ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(markerLayer);
      });

      if (currentOffer) {
        leaflet
          .marker({
            lat: currentOffer.location.latitude,
            lng: currentOffer.location.longitude,
          }, {
            icon: idFocusCard ? defaultCustomIcon : currentCustomIcon,
          })
          .addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offersPreview, idFocusCard, currentOffer]);

  return null;
}
