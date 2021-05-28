import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";

export default function Movies() {
  const [isLiked, setIsLiked] = React.useState(false);
  function handleCardLike() {
    if (isLiked === false) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }

  return (
    <section className="movies">
      <SearchForm />
      <Preloader />
      <MoviesCardList isLiked={isLiked} onCardLike={handleCardLike} />
    </section>
  );
}
