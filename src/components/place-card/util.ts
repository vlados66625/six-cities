type getDataPlaceCardProps = 'favorites' | 'cities' | 'near-places' | undefined

export function getDataPlaceCard(variant: getDataPlaceCardProps) {
  const dataPlaceCard = {
    articleClassName: '',
    imageWrapperClassname: '',
    infoClassName: '',
    imageWidth: 260,
    imageHeight: 200,
  };

  switch (variant) {
    case 'favorites':
      dataPlaceCard.articleClassName = 'favorites__card ';
      dataPlaceCard.imageWrapperClassname = 'favorites__image-wrapper ';
      dataPlaceCard.infoClassName = 'favorites__card-info ';
      dataPlaceCard.imageWidth = 150;
      dataPlaceCard.imageHeight = 110;
      break;
    case 'cities':
      dataPlaceCard.articleClassName = 'cities__card ';
      dataPlaceCard.imageWrapperClassname = 'cities__image-wrapper ';
      break;
    case 'near-places':
      dataPlaceCard.articleClassName = 'near-places__card ';
      dataPlaceCard.imageWrapperClassname = 'near-places__image-wrapper ';
      break;
  }

  return dataPlaceCard;
}
