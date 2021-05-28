import "./Promo.css";
import praktikum_logo from "../../images/title__background.png"
export default function Promo(props) {
  return (
    <section className="promo">
      <div className="promo__content">
        <img className="promo__background" src={praktikum_logo} alt="Логотип Практикума"/>
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
    </section>
  );
}
