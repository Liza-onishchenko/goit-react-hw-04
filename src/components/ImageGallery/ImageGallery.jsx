import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  console.log(images);
  return (
    <>
      <ul className={css.list}>
        {images !== null &&
          images.map((image) => (
            <li key={image.id} className={css.listCard}>
              <ImageCard image={image} onImageClick={onImageClick} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default ImageGallery;
