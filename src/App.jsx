import axios from "axios";
import { fetchImages } from "./components/services/api";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import css from "./components/App/App.module.css";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!query) return;

      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);

        if (data.results.length === 0) {
          setError("No images found for this search term.");
        } else {
          setImages((prevImages) => [...prevImages, ...data.results]); // Додаємо нові зображення до старих
          setTotalPages(data.total_pages); // Зберігаємо загальну кількість сторінок
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // обробляє події натискання на зображення
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  //обробляє події закриття модального вікна
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className={css.container}>
        <Toaster />
        <SearchBar onSubmit={handleSearch} />
        <ImageGallery images={images} onImageClick={openModal} />
        {error && images.length === 0 && <ErrorMessage message={error} />}
        {isLoading && <Loader />}
        {images &&
          Array.isArray(images) &&
          images.length > 0 &&
          page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      </div>
    </>
  );
}

export default App;
