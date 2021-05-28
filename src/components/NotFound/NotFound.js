import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <p className="page-not-found__subtitle">Страницане найдена</p>
      <Link to="/" className="page-not-found__button button">
        Назад
      </Link>
    </section>
  );
}
