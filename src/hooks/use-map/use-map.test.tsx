import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import leaflet from 'leaflet';
import { City } from '../../types/city';

describe('useMap', () => {
  let mapRef: { current: HTMLDivElement };

  beforeEach(() => {
    vi.clearAllMocks();
    mapRef = { current: document.createElement('div') };
    vi.spyOn(leaflet, 'map');
  });

  const city: City = {
    name: 'Paris',
    location: { latitude: 52.52, longitude: 13.405, zoom: 10 },
  };

  it('должен создать карту при первом рендере', () => {
    renderHook(() => useMap(mapRef, city));

    expect(leaflet.map).toHaveBeenCalledTimes(1);
  });

  it('не должен пересоздавать карту при повторном рендере', () => {
    const { rerender } = renderHook(() => useMap(mapRef, city));
    rerender();
    expect(leaflet.map).toHaveBeenCalledTimes(1);
  });
});
