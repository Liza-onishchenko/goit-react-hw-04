import { useEffect } from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root"); // Налаштування елементів, які буде закрито на фоні

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
    overflow: "auto",
    borderRadius: "4px",
    padding: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Змінюй на бажаний колір
  },
};

const ImageModal = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!image) {
    return null;
  }
  console.log("Modal isOpen:", isOpen, "Image:", image);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={css.modalContent}>
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className={css.modalImg}
        />
        <button onClick={onClose} className={css.modalBtn}></button>
      </div>
    </Modal>
  );
};

export default ImageModal;
