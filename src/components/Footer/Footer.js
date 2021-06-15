import "./Footer.css";
import { useLocation } from "react-router-dom";

export default function Footer(props) {
  const location = useLocation();

  const footerClassName = `${
    location.pathname === "/sign-in" ||
    location.pathname === "/sign-up" ||
    location.pathname === "*"
      ? "footer_hidden"
      : "footer"
  }`;
  return (
    <footer className={footerClassName}>
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__content">
      <p className="footer__year">&copy; {new Date().getFullYear()}</p>
      <ul className="footer__links">
        <li className="footer__link-element">
          <a className="footer__link" href="https://praktikum.yandex.ru/">Яндекс.Практикум</a>
        </li>

        <li className="footer__link-element">
          <a className="footer__link" href="https://github.com/VladislavKondratjev">Github</a>
        </li>

        <li className="footer__link-element">
          <a className="footer__link" href="https://www.facebook.com/profile.php?id=100014322246705">Facebook</a>
        </li>
      </ul>
      </div>
    </footer>
  );
}
