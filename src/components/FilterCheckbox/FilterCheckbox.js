import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox(props) {

  function hadleFiltredCheckBox(e) {
    let ckecked = e.target.checked;
    props.filterShort(ckecked);
  }

  return (
    <section className="filter">
      <dd>
        <input type="checkbox" className="slider" name="slider" id="slider" onClick={hadleFiltredCheckBox}/>
        <label htmlFor="slider"></label>
      </dd>
      <p className="filter__name">Короткометражки</p>
    </section>
  );
}
