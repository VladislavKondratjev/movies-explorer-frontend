import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox() {

  return (
    <section className="filter">
      <dd>
        <input type="checkbox" className="slider" name="slider" id="slider" />
        <label htmlFor="slider"></label>
      </dd>
      <p className="filter__name">Короткометражки</p>
    </section>
  );
}
