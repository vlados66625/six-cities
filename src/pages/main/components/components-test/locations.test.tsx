import { render, screen } from '@testing-library/react';
import Locations from '../locations';
import { withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';
import { sixCities } from '../../../../const';
import { Mock } from 'vitest';
import { useActionCreators } from '../../../../hooks';
import userEvent from '@testing-library/user-event';

vi.mock('../../../../hooks', () => ({
  useActionCreators: vi.fn(),
}));

describe('Component: Locations', () => {
  const setCity = vi.fn();
  const cityToClick = sixCities[1];
  const selectedCity = sixCities[0];

  beforeEach(() => {
    vi.clearAllMocks();
    (useActionCreators as Mock).mockReturnValue({
      setCity,
    });
  });

  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<Locations selectedCity={selectedCity} />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(sixCities[0])).toBeInTheDocument();
  });

  it('должен вызывать setCity при клике на ссылку с городом', async () => {
    const componentWithStore = withStore(<Locations selectedCity={selectedCity} />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const link = screen.getByText(cityToClick);
    await userEvent.click(link);

    expect(setCity).toHaveBeenCalledWith(cityToClick);
    expect(setCity).toHaveBeenCalledTimes(1);
  });

  it('должен вызывать preventDefault при клике на ссылку с городом', () => {
    const componentWithStore = withStore(<Locations selectedCity={selectedCity} />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    const link = screen.getByText(cityToClick);

    const mockEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault');

    link.dispatchEvent(mockEvent);

    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });
});
