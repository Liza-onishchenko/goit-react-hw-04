import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  // обробник події інпуту
  const handleChange = (event) => {
    setInputValue(event.target.value); // що вводить користувач, передаємо в стейт
  };

  // обробник форми
  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() === "") {
      // Перевірка на порожнє або null значення
      toast.error("Please enter a search query"); // Сповіщення
      return; // Вихід з функції
    }

    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchBtn}>
          🔎
        </button>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          value={inputValue} // звязуємо стан з інпутом
          onChange={handleChange} // подія інпуту
          autoFocus
          className={css.searchInput}
        />
      </form>
    </header>
  );
};

export default SearchBar;
