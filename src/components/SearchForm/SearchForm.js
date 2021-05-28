import "./SearchForm.css";
import search_button from "../../images/findButton.svg";
import FilterElement from "../FilterCheckbox/FilterCheckbox.js";

export default function SearchForm() {
  return (
    <section className="search-form">
      <form action="" method="get" className="search-form__form">
        <input
          name="s"
          placeholder="Фильм"
          type="search"
          className="search-form__input"
        />
        <button type="button" className="search-form__button button">
          <img src={search_button} alt="Поиск!" />
        </button>
      </form>
      <FilterElement />
    </section>
  );
}
