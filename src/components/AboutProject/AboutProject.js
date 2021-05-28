import "./AboutProject.css";

export default function AboutProject(props) {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <article className="about-project__table">
        <div className="about-project__block">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__block">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </article>
      <div className="about-project__timeline">
        <div className="about-project__backend">
          <h4 className="about-project__backend-title">1 неделя</h4>
          <span className="about-project__weeks">Back-end</span>
        </div>
        <div className="about-project__frontend">
          <h4 className="about-project__frontend-title">4 недели</h4>
          <span className="about-project__weeks">Front-end</span>
        </div>
      </div>
    </section>
  );
}
