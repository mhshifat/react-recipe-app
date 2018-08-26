import React from "react";

const Recipe = props => (
  <div className="col-md-4" style={{ marginBottom: "2rem" }}>
    <div className="recipes__box">
      <img src={props.image} alt={props.title} className="recipe__box-img" />
      <div className="recipe__text">
        <h5 className="recipes__title">
          {props.title.length < 26
            ? props.title
            : `${props.title.substring(0, 25)}...`}
        </h5>
        <p className="recipes__subtitle">
          Publisher: <span>{props.publisher}</span>
        </p>
      </div>
      <button onClick={props.click} className="recipe_buttons">
        View Recipe
      </button>
    </div>
  </div>
);

export default Recipe;
