import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function SavedMovies() {
  const [isOwn, setIsOwn] = React.useState(true);

  function handleCardDelete() {
    MoviesCard.remove();
  }

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList isOwn={isOwn} onCardDelete={handleCardDelete} />
    </section>
  );
}
