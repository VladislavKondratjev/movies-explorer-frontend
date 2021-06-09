import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

export default function Movies(props) {
  const { isMoviesLoading, loadingError, moviesData, saveMovie, delMovie, empty, savedMovies} = props;

  const [countCard, setCountCard] = React.useState({ repeat: 0, add: 0 });

  React.useEffect(() => {
    handleResize();
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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

  return (
    <section className="movies">
      <SearchForm onSearch={props.onSearch} filterShort={props.filterShort} />
      <MoviesCardList
        moviesData={moviesData}
        count={countCard}
        isMoviesLoading={isMoviesLoading}
        loadingError={loadingError}
        empty={empty}
        saveMovie={saveMovie} 
        delMovie={delMovie}
        savedMovies={savedMovies}
      />
    </section>
  );
}
// movies={props.movies}
// isMoviesLoading={props.isMoviesLoading}
// handleAddMoreMovies={props.handleAddMoreMovies}
// isMoviesError={props.isMoviesError}
// filteredMovies={props.filteredMovies}
// searchResults={props.searchResults}
// handleSaveMovie={props.handleSaveMovie}
// loadingError={props.loadingError}
// import { MoviesApi } from "../../utils/MoviesApi";

// const [isMoviesError, setIsMoviesError] = React.useState(false);
// // const [movies, setMovies] = React.useState([]);
    // // const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);
    // // const [filter, setFilter] = React.useState('');
    // const [searchQuery, setSearchQuery] = React.useState("");
    // const [filteredMovies, setFilteredMovies] = React.useState([]);
    // const [shortMovies, setShortMovies] = React.useState([]);
    // const [displayedMovies, setDisplayedMovies] = React.useState([]);
    // const [moviesCounter, setMoviesCounter] = React.useState(0);
    // const [searchButton, setSearchButton] = React.useState('')
    // const [checked, setChecked] = React.useState(false);
  
    // function handleSearchQuery(searchQuery) {
    //   setSearchQuery(searchQuery);
    //   localStorage.setItem('searchQuery', searchQuery)
    //   if (!props.movies.length) {
    //     props.onGetMovies()
    //     setIsMoviesError(false)
    //     // const shortFilms = handleShortMoviesFilter();
    //     // setShortMovies(shortFilms);
    //   }
    //   setSearchButton(searchQuery);
    // }
  
    // const filterMovies = (movies, searchQuery, checked) => {
    //   console.log(checked)
    //   if (checked) {
    //     movies.filter((movie) => {
    //       console.log(movie)
    //       return (((movie.nameRU && movie.nameRU.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) || (movie.nameEN && movie.nameEN.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)) && movie.duration < 40)
    //     })
    //   } else {
    //     return movies.filter((movie) => {
    //       return (movie.nameRU && movie.nameRU.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) || (movie.nameEN && movie.nameEN.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
    //     })
    //   }
    // }
  
    // const filtered = filterMovies(props.movies, searchQuery, checked);
    // console.log(filtered)
  
    // const searchResults = filtered.slice(moviesCounter, moviesCounter + 4);
    // console.log(searchResults)
  
    // function handleAddMoreMovies() {
    //   setDisplayedMovies([...displayedMovies, ...searchResults]);
    //   setMoviesCounter(moviesCounter + 4);
    // }
  
    // // return props.movies.filter((movie) => {
    //   //   return filtered && movie.duration < 40
    //   // })
    //   // setShortMovies(shortFilms);
      
    //   // setDisplayedMovies(shortFilms);
    //   // const shortFilms = handleShortMoviesFilter();
    //   const handleShortMoviesFilter = () => {
    //     setChecked(!checked);
    //   };
  
    // useEffect(() => {
    //   if (searchQuery) {
    //     // const filtered = filterMovies(props.movies, searchQuery, checked);
    //     console.log(filtered)
  
    //     const display = filtered.slice(0, 4);
    //     setFilteredMovies(filtered);
    //     setShortMovies(shortMovies);
    //     setDisplayedMovies(display);
    //     setMoviesCounter(4);
    //   }
    // }, [searchButton, props.movies, checked, searchQuery, shortMovies]);