import { offersSlice } from '../../offers';
import { offersSelectors } from '../../offers';
import { createFakeOffersPreview } from '../../../../test-utils/factories/offers';
import { getFilteredByCityOffers, SortingOptions } from '../../../../util';
import { getRandomItemArray } from '../../../../util';
import { sixCities } from '../../../../const';

describe('offers selectors', () => {
  const fakeOffersPreview = createFakeOffersPreview(3);
  const fakeFavoritesOffers = createFakeOffersPreview(3).map((offer) => (
    {
      ...offer,
      isFavorite: true
    }
  ));
  const fakeCity = getRandomItemArray(sixCities);

  const state = {
    [offersSlice.name]: {
      city: fakeCity,
      offersPreview: fakeOffersPreview,
      favoritesOffers: fakeFavoritesOffers,
      isLoadingOffers: false,
      sortingName: SortingOptions[0].name,
    }
  };

  it('should return city from state', () => {
    const { city } = state[offersSlice.name];
    const result = offersSelectors.city(state);
    expect(result).toEqual(city);
  });

  it('should return offersPreview from state', () => {
    const { offersPreview } = state[offersSlice.name];
    const result = offersSelectors.offersPreview(state);
    expect(result).toEqual(offersPreview);
  });

  it('should return favoritesOffers from state', () => {
    const { favoritesOffers } = state[offersSlice.name];
    const result = offersSelectors.favoritesOffers(state);
    expect(result).toEqual(favoritesOffers);
  });

  it('should return favoritesOffersCount from state', () => {
    const { favoritesOffers } = state[offersSlice.name];
    const result = offersSelectors.favoritesOffersCount(state);
    expect(result).toEqual(favoritesOffers.length);
  });

  it('should return isLoadingOffers from state', () => {
    const { isLoadingOffers } = state[offersSlice.name];
    const result = offersSelectors.isLoadingOffers(state);
    expect(result).toEqual(isLoadingOffers);
  });

  describe('showOffers selector', () => {
    it('should return filtered offers by city', () => {
      const differentCity = sixCities.find((cityName) => cityName !== fakeCity);
      if (!differentCity) {
        throw new Error('Не удалось найти другой город');
      }
      const fakeOffersWithDifferentCity = createFakeOffersPreview(3).map((offer) => ({
        ...offer,
        city: { ...offer.city, name: differentCity },
      }));
      const testOffers = [...fakeOffersPreview, ...fakeOffersWithDifferentCity];

      const testState = {
        [offersSlice.name]: {
          ...state[offersSlice.name],
          offersPreview: testOffers,
        },
      };
      const expected = getFilteredByCityOffers(testOffers, fakeCity);
      const result = offersSelectors.showOffers(testState);
      expect(result).toEqual(expected);
    });

    it('should return offers without sorting if sortingName is "Popular"', () => {
      const sortingName = SortingOptions[0].name;
      const testState = {
        [offersSlice.name]: {
          ...state[offersSlice.name],
          sortingName,
        },
      };
      const expected = SortingOptions.find((option) => option.name === sortingName)?.functionSorting(getFilteredByCityOffers(fakeOffersPreview, fakeCity));
      const result = offersSelectors.showOffers(testState);
      expect(result).toEqual(expected);
    });

    it('should return sorted offers by sortingName "Price: low to high"', () => {
      const sortingName = SortingOptions[1].name;
      const testState = {
        [offersSlice.name]: {
          ...state[offersSlice.name],
          sortingName,
        },
      };
      const expected = SortingOptions.find((option) => option.name === sortingName)?.functionSorting(getFilteredByCityOffers(fakeOffersPreview, fakeCity));
      const result = offersSelectors.showOffers(testState);
      expect(result).toEqual(expected);
    });

    it('should return sorted offers by sortingName "Price: high to low"', () => {
      const sortingName = SortingOptions[2].name;
      const testState = {
        [offersSlice.name]: {
          ...state[offersSlice.name],
          sortingName,
        },
      };
      const expected = SortingOptions.find((option) => option.name === sortingName)?.functionSorting(getFilteredByCityOffers(fakeOffersPreview, fakeCity));
      const result = offersSelectors.showOffers(testState);
      expect(result).toEqual(expected);
    });

    it('should return sorted offers by sortingName "Top rated first"', () => {
      const sortingName = SortingOptions[3].name;
      const testState = {
        [offersSlice.name]: {
          ...state[offersSlice.name],
          sortingName,
        },
      };
      const expected = SortingOptions.find((option) => option.name === sortingName)?.functionSorting(getFilteredByCityOffers(fakeOffersPreview, fakeCity));
      const result = offersSelectors.showOffers(testState);
      expect(result).toEqual(expected);
    });
  });
});
