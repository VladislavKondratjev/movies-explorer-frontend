import React from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

export default function SavedMovies(props) {
  const { delMovie, savedMovies, isMoviesError, loadingError, isMoviesLoading, moviesData } = props;


  return (
    <section className="movies">
      <SearchForm onSearch={props.onSearch} filterShort={props.filterShort} />
      <MoviesCardList
        moviesData={moviesData}
        isMoviesLoading={isMoviesLoading}
        loadingError={loadingError}
        isMoviesError={isMoviesError}
        delMovie={delMovie}
        savedMovies={savedMovies}
        count={props.countCard}
      />
    </section>
  );
}
