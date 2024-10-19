import css from "./ImageCard.module.css";

const ImageCard = ({ image, onImageClick }) => {
  return (
    <div className={css.ImageCard} onClick={() => onImageClick(image)}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;
