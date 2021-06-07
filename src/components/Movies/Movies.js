import React, { useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
// import { MoviesApi } from "../../utils/MoviesApi";

export default function Movies(props) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isMoviesError, setIsMoviesError] = React.useState(false);
  // const [movies, setMovies] = React.useState([]);
  // const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);
  // const [filter, setFilter] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [shortMovies, setShortMovies] = React.useState([]);
  const [displayedMovies, setDisplayedMovies] = React.useState([]);
  const [moviesCounter, setMoviesCounter] = React.useState(0);
  const [searchButton, setSearchButton] = React.useState('')
  const [checked, setChecked] = React.useState(false);

  function handleSearchQuery(searchQuery) {
    setSearchQuery(searchQuery);
    localStorage.setItem('searchQuery', searchQuery)
    if (!props.movies.length) {
      props.onGetMovies()
      setIsMoviesError(false)
    }
    setSearchButton(searchQuery);
  }

  const filterMovies = (movies, searchQuery) => {
    return movies.filter((movie) => {
      return (movie.nameRU && movie.nameRU.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) || (movie.nameEN && movie.nameEN.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
    })
  }

  const filtered = filterMovies(props.movies, searchQuery);

  const searchResults = filtered.slice(moviesCounter, moviesCounter + 4);

  function handleAddMoreMovies() {
    setDisplayedMovies([...displayedMovies, ...searchResults]);
    setMoviesCounter(moviesCounter + 4);
  }

  function handleCardLike() {
    if (isLiked === false) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }
  
  const handlerShortMoviesFilter = () => {
    setChecked(!checked);
    setDisplayedMovies(!shortMovies);
    return props.movies.filter((movie) => {
      return ((movie.nameRU && movie.nameRU.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) || (movie.nameEN && movie.nameEN.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)) && movie.duration < 40
    })
  };

  useEffect(() => {
    const filtered = filterMovies(props.movies, searchQuery);
    // const shortFilms = handlerShortMoviesFilter();
    setFilteredMovies(filtered);
    setShortMovies(shortMovies);
    const display = filtered.slice(0, 4);
    setDisplayedMovies(display);
    setMoviesCounter(4);
  }, [searchButton, props.movies, searchQuery]);

  return (
    <section className="movies">
      <SearchForm
        handler={handlerShortMoviesFilter}
        checked={checked}
        handleSearchQuery={handleSearchQuery} />
      <MoviesCardList
        movies={displayedMovies}
        isLiked={isLiked}
        onCardLike={handleCardLike}
        isMoviesLoading={props.isMoviesLoading}
        handleAddMoreMovies={handleAddMoreMovies}
        isMoviesError={isMoviesError}
        filteredMovies={filteredMovies}
        searchResults={searchResults}
      />
    </section>
  );
}
