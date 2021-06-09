import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import SavedMovies from "../SavedMovies/SavedMovies";
import { useLocation } from "react-router-dom";

export default function Movies(props) {
  const { switchTo, isMoviesLoading, loadingError, moviesData, saveMovie, onMovieDelete, empty, savedMovies, currentSaveMovies, nothingSaved } = props;
  const [countCard, setCountCard] = React.useState({ repeat: 0, add: 0 });
  const location = useLocation();
  const isOwn = `${location.pathname === "/saved-movies" ? true : false}`;

  function handleResize() {
    let w = window.innerWidth;
    if (w > 1160) {
      setCountCard({
        repeat: 8,
        add: 4
      });
    } else if (w > 1023) {
      setCountCard({
        repeat: 6,
        add: 3
      });
    } else if (w > 480) {
      setCountCard({
        repeat: 6,
        add: 2
      });

    } else {
      setCountCard({
        repeat: 5,
        add: 1
      });
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  React.useEffect(() => {
    handleResize();
  }, [])

  return (
    <section className="movies">
      <SearchForm onSearch={props.onSearch} filterShort={props.filterShort} />
      {switchTo === "movies"
        ?
        <MoviesCardList
          moviesData={moviesData}
          count={countCard}
          isMoviesLoading={isMoviesLoading}
          loadingError={loadingError}
          empty={empty}
          saveMovie={saveMovie}
          onMovieDelete={onMovieDelete}
          savedMovies={savedMovies}
        />
        :
        <SavedMovies
          savedMovies={savedMovies}
          onMovieDelete={onMovieDelete}
          currentSaveMovies={currentSaveMovies}
          isOwn={isOwn}
          nothingSaved={nothingSaved}
        />
      }
    </section>
  );
}
