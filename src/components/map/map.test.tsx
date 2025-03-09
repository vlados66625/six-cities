import { render } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import leaflet from 'leaflet';
import Map from './map';
import { createFakeOffersPreview } from '../../test-utils/mock/offers';
import { useAppSelector } from '../../hooks';
import useMap from '../../hooks/use-map/use-map';
import { MutableRefObject } from 'react';

vi.mock('../../hooks/use-map');
vi.mock('../../hooks', () => ({
  useAppSelector: vi.fn()
}));

vi.mock('leaflet', async () => {
  const actual = await vi.importActual<typeof import('leaflet')>('leaflet');
  return {
    ...actual,
    marker: vi.fn(() => ({ addTo: vi.fn() })),
    layerGroup: vi.fn(() => ({ addTo: vi.fn(), clearLayers: vi.fn() })),
  };
});

describe('Map component', () => {
  let mapRef: MutableRefObject<HTMLElement | null>;
  const offersPreview = createFakeOffersPreview(3);

  beforeEach(() => {
    mapRef = { current: document.createElement('div') };
    (useMap as Mock).mockReturnValue({
      addLayer: vi.fn(),
      removeLayer: vi.fn()
    });
    (useAppSelector as Mock).mockReturnValue(null);
    vi.spyOn(leaflet, 'marker');
  });

  it('рендеринг без сбоев', () => {
    render(<Map mapRef={mapRef} offersPreview={offersPreview} />);
  });

  it('вызывает useMap с корректными аргументами', () => {
    render(<Map mapRef={mapRef} offersPreview={offersPreview} />);
    expect(useMap).toHaveBeenCalledWith(mapRef, offersPreview[0].city);
  });

  it('создает маркеры для каждого offerPreview', () => {
    render(<Map mapRef={mapRef} offersPreview={offersPreview} />);
    expect(leaflet.marker).toHaveBeenCalledTimes(offersPreview.length);
  });

  it('использует правильные значки для сфокусированной карточки', () => {
    (useAppSelector as Mock).mockReturnValue(offersPreview[0].id);
    render(<Map mapRef={mapRef} offersPreview={offersPreview} />);
    expect(leaflet.marker).toHaveBeenCalledWith(
      expect.objectContaining({ lat: offersPreview[0].location.latitude, lng: offersPreview[0].location.longitude }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      expect.objectContaining({ icon: expect.any(Object) })
    );
  });

  it('удаляет маркерный слой при размонтировании', () => {
    const { unmount } = render(<Map mapRef={mapRef} offersPreview={offersPreview} />);
    unmount();
    if (useMap(mapRef, offersPreview[0].city)) {
      expect(useMap(mapRef, offersPreview[0].city)!.removeLayer).toHaveBeenCalled();
    }
  });
});
