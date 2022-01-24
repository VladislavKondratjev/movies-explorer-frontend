import "./AboutMe.css";
import photo from "../../images/about-me__photo.jpg";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__profile">
        <img className="about-me__photo" src={photo} alt="Виталий" />
        <h3 className="about-me__name">Владислав</h3>
        <p className="about-me__subtitle">Фронтенд-разработчик, 26 лет</p>
        <p className="about-me__about">
          Мне нравится фронтенд разработка тем, что ты видишь результат своей работы,
          делаешь что-то полезное для пользователей. Помимо курсов Яндекса, проходил
          бесплатные курсы на курсере, люблю слушать подкаст “Запуск завтра” и читаю статьи
          на Хабре. Увлекаюсь янгтаймерами и автомобильной темой, активным
          отдыхом, прогулками с друзьями и фотографирую всё это на старый полароид.
        </p>
        <a className="about-me__social-links" href="https://t.me/vkondratjev">Telegram</a>
        <a className="about-me__social-links" href="https://github.com/VladislavKondratjev">Github</a>
      </div>
    </section>
  );
}
