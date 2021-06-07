import React from "react";
import "./SearchForm.css";
import search_button from "../../images/findButton.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

export default function SearchForm(props) {
  const [searchQuery, setSearchQuery] = React.useState('');

  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    props.handleSearchQuery(searchQuery);
  }

  return (
    <section className="search-form">
      <form action="" method="get" className="search-form__form" onSubmit={handleSearchSubmit}>
        <input
          name="search"
          placeholder="Фильм"
          type="search"
          className="search-form__input"
          required
          value={searchQuery || ''}
          onChange={handleChange}
        />
        <button type="submit" className="search-form__button button">
          <img src={search_button} alt="Поиск!" />
        </button>
      </form>
      <FilterCheckbox checked={props.checked} handler={props.handler}/>
    </section>
  );
}
