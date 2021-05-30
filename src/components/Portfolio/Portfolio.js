import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__links-element">
          <a className="portfolio__link" href="https://vladislavkondratjev.github.io/how-to-learn/">
            Статичный сайт
          </a>
          <a className="portfolio__link" href="https://vladislavkondratjev.github.io/how-to-learn/">↗</a>
        </li>
        <li className="portfolio__links-element">
          <a className="portfolio__link" href="https://vladislavkondratjev.github.io/russian-travel/">
            Адаптивный сайт
          </a>
          <a className="portfolio__link" href="https://vladislavkondratjev.github.io/russian-travel/">↗</a>
        </li>
        <li className="portfolio__links-element">
          <a className="portfolio__link" href="https://vkondratjev.nomoredomains.icu/">
            Одностраничное приложение
          </a>
          <a className="portfolio__link" href="https://vkondratjev.nomoredomains.icu/">↗</a>
        </li>
      </ul>
    </section>
  );
}
