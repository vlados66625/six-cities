type getDataPlaceCardProps = {
  isFavoritesCard?: boolean;
  isCitiesCard?: boolean;
  isNearPlacesCard?: boolean;
}

export function getDataPlaceCard({ isFavoritesCard, isCitiesCard, isNearPlacesCard }: getDataPlaceCardProps) {
  const dataPlaceCard = {
    articleClassName: '',
    imageWrapperClassname: '',
    infoClassName: '',
    imageWidth: 260,
    imageHeight: 200,
  };

  if (isFavoritesCard) {
    dataPlaceCard.articleClassName = 'favorites__card ';
    dataPlaceCard.imageWrapperClassname = 'favorites__image-wrapper ';
    dataPlaceCard.infoClassName = 'favorites__card-info ';
    dataPlaceCard.imageWidth = 150;
    dataPlaceCard.imageHeight = 110;
    return dataPlaceCard;
  }

  if (isCitiesCard) {
    dataPlaceCard.articleClassName = 'cities__card ';
    dataPlaceCard.imageWrapperClassname = 'cities__image-wrapper ';
    return dataPlaceCard;
  }

  if (isNearPlacesCard) {
    dataPlaceCard.articleClassName = 'near-places__card ';
    dataPlaceCard.imageWrapperClassname = 'near-places__image-wrapper ';
    return dataPlaceCard;
  }

  return dataPlaceCard;
}
