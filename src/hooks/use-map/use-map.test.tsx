import { act, renderHook } from '@testing-library/react';
import useMap from './use-map';
import leaflet from 'leaflet';

// vi.mock('leaflet', async () => {
//   const actual = await vi.importActual<typeof import('leaflet')>('leaflet');
//   return {
//     ...actual,
//     map: vi.fn(() => ({ setView: vi.fn() })),
//     tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
//   };
// });

describe('useMap', () => {
  let mapRef: { current: HTMLDivElement };

  beforeEach(() => {
    vi.clearAllMocks();
    mapRef = { current: document.createElement('div') };
    vi.spyOn(leaflet, 'map');
  });

  const city = {
    name: 'Paris',
    location: { latitude: 52.52, longitude: 13.405, zoom: 10 },
  };

  it('должен создать карту при первом рендере', () => {
    act(() => {
      renderHook(() => useMap(mapRef, city));
    });

    expect(leaflet.map).toHaveBeenCalledTimes(1);
  });

  it('должен обновлять центр карты при изменении города', () => {
    const { result, rerender } = renderHook(
      ({ city }) => useMap(mapRef, city),
      { initialProps: { city } }
    );

    const newCity = {
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
    };

    rerender({ city: newCity });
    expect(leaflet.map().setView).toHaveBeenCalledWith([48.8566, 2.3522], 12);
  });

  it('не должен пересоздавать карту при повторном рендере', () => {
    const { rerender } = renderHook(() => useMap(mapRef, city));
    rerender();
    expect(leaflet.map).toHaveBeenCalledTimes(1);
  });
});
