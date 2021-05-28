import "./AboutMe.css";
import photo from "../../images/about-me__photo.jpg";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__profile">
          <img className="about-me__photo" src={photo} alt="Виталий"/>
      <h3 className="about-me__name">Виталий</h3>
      <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
      <p className="about-me__about">
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
        ушёл с постоянной работы.
      </p>
      <a className="about-me__social-links" href="https://www.facebook.com/profile.php?id=100014322246705">Facebook</a>
      <a className="about-me__social-links" href="https://github.com/VladislavKondratjev">Github</a>
      </div>
    </section>
  );
}
