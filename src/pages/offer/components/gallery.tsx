import { MAX_GALLERY_IMAGES } from '../../../const';

type GalleryProps = {
  images: string[];
}


export default function Gallery({ images }: GalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container" data-testid="gallery">
      <div className="offer__gallery">
        {images.slice(0, MAX_GALLERY_IMAGES).map((image) => (
          <div className="offer__image-wrapper" key={image}>
            <img className="offer__image" src={image} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}
