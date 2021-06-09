import React from "react";
import "./SearchForm.css";
import search_button from "../../images/findButton.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

export default function SearchForm(props) {
  const [searchQuery, setSearchQuery] = React.useState('');
  // const [inputErr, setInputErr] = useState('');

  function handleChange(e) {
    setSearchQuery(e.target.value);
    // setInputErr('');
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    // props.handleSearchQuery(searchQuery);
    if (searchQuery !== '') {
      return props.onSearch(searchQuery);
    }
    // setInputErr('Нужно ввести ключевое слово');
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
      <FilterCheckbox filterShort={props.filterShort}/>
    </section>
  );
}
