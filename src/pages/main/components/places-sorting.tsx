import { useEffect, useState } from 'react';
import cn from 'classnames';
import { SortingOptions } from '../../../util';
import { useAppSelector } from '../../../hooks';
import { offersSelectors } from '../../../store/slices/offers';
import { useActionCreators } from '../../../hooks';
import { offersActions } from '../../../store/slices/offers';

export default function PlacesSorting(): JSX.Element {
  const [isSortingOpened, setIsSortingOpened] = useState(false);
  const [optionActive, setOptionActive] = useState(SortingOptions[0].name);

  const selectedCity = useAppSelector(offersSelectors.city);

  const { setSorting } = useActionCreators(offersActions);

  function handlePlacesOptionOnClick(name: string) {
    setIsSortingOpened(false);
    setOptionActive(name);
    setSorting(name);
  }

  useEffect(() => {
    setOptionActive(SortingOptions[0].name);
    setSorting(SortingOptions[0].name);
    setIsSortingOpened(false);
  }, [selectedCity, setSorting]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" onClick={() => setIsSortingOpened(!isSortingOpened)} tabIndex={0}>
        {optionActive}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={cn(
        'places__options places__options--custom',
        { 'places__options--opened': isSortingOpened })}
      >
        {SortingOptions.map(({ name }) => (
          <li
            className={cn('places__option',
              { 'places__option--active': optionActive === name })}
            key={name}
            onClick={() => handlePlacesOptionOnClick(name)}
            tabIndex={0}
          >
            {name}
          </li>
        ))}
      </ul>
    </form >
  );
}
