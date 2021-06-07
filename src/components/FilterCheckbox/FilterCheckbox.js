import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox(props) {

  return (
    <section className="filter">
      <dd>
        <input type="checkbox" className="slider" name="slider" id="slider" checked={props.checked} onChange={props.handler}/>
        <label htmlFor="slider"></label>
      </dd>
      <p className="filter__name">Короткометражки</p>
    </section>
  );
}
