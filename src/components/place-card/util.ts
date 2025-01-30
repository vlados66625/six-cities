type getDataPlaceCardProps = {
  isFavoritesBlock?: boolean;
  isCitiesBlock?: boolean;
  isNearPlacesBlock?: boolean;
}

export function getDataPlaceCard({ isFavoritesBlock, isCitiesBlock, isNearPlacesBlock }: getDataPlaceCardProps) {
  const dataPlaceCard = {
    articleClassName: '',
    imageWrapperClassname: '',
    infoClassName: '',
    imageWidth: 260,
    imageHeight: 200,
  };

  if (isFavoritesBlock) {
    dataPlaceCard.articleClassName = 'favorites__card ';
    dataPlaceCard.imageWrapperClassname = 'favorites__image-wrapper ';
    dataPlaceCard.infoClassName = 'favorites__card-info ';
    dataPlaceCard.imageWidth = 150;
    dataPlaceCard.imageHeight = 110;
    return dataPlaceCard;
  }

  if (isCitiesBlock) {
    dataPlaceCard.articleClassName = 'cities__card ';
    dataPlaceCard.imageWrapperClassname = 'cities__image-wrapper ';
    return dataPlaceCard;
  }

  if (isNearPlacesBlock) {
    dataPlaceCard.articleClassName = 'near-places__card ';
    dataPlaceCard.imageWrapperClassname = 'near-places__image-wrapper ';
    return dataPlaceCard;
  }

  return dataPlaceCard;
}
