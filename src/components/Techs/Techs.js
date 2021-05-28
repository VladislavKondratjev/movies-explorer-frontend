import "./Techs.css";

export default function Techs(props) {
  return (
    <section className="techs" id="techs">
      <div className="techs__content">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__heading">7 технологий</h3>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      <ul className="techs__techs">
        <li className="techs__techs-name">HTML</li>
        <li className="techs__techs-name">CSS</li>
        <li className="techs__techs-name">JS</li>
        <li className="techs__techs-name">React</li>
        <li className="techs__techs-name">Git</li>
        <li className="techs__techs-name">Express.js</li>
        <li className="techs__techs-name">mongoDB</li>
      </ul>
      </div>
    </section>
  );
}
