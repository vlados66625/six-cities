import { render, screen } from '@testing-library/react';
import PlacesSorting from '../places-sorting';
import { withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';
import { useActionCreators, useAppSelector } from '../../../../hooks';
import { Mock } from 'vitest';
import { SortingOptions } from '../../../../util';
import userEvent from '@testing-library/user-event';
import { sixCities } from '../../../../const';

vi.mock('../../../../hooks', () => ({
  useActionCreators: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: PlacesSorting', () => {
  const setSorting = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useActionCreators as Mock).mockReturnValue({
      setSorting,
    });
    (useAppSelector as Mock).mockReturnValue(sixCities[0]);
  });

  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<PlacesSorting />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('sorting-form')).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('должен открыть меню при клике на кнопку сортировки', async () => {
    const componentWithStore = withStore(<PlacesSorting />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const sortingOptions = screen.getByTestId('sorting-type');
    await userEvent.click(sortingOptions);

    expect(screen.getByTestId('sorting-options')).toHaveClass('places__options--opened');
  });

  it('должен вызывать setSorting при клике на опцию сортировки и закрывать меню', async () => {
    const componentWithStore = withStore(<PlacesSorting />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const sortingOptions = screen.getByTestId('sorting-type');
    await userEvent.click(sortingOptions);
    const sortingOption = SortingOptions[2].name;
    const sortingOptionElement = screen.getByText(sortingOption);
    await userEvent.click(sortingOptionElement);

    expect(setSorting).toHaveBeenCalledTimes(2);
    expect(setSorting).toHaveBeenCalledWith(sortingOption);
    expect(screen.getByTestId('sorting-options')).not.toHaveClass('places__options--opened');
  });
});
