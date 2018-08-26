import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./App.css";

import FormComponent from "./components/Form";
import RecipeComponent from "./components/Recipe";

Modal.setAppElement("#root");

class App extends Component {
  state = {
    recipes: [],
    isModalOpen: false,
    recipe: {}
  };
  onSubmitHandler = async e => {
    e.preventDefault();
    const api = `http://food2fork.com/api/search?key=${
      process.env.REACT_APP_API_KEY
    }&q=${e.target.recipe.value}`;
    const recipes = await axios.get(api);
    this.setState({
      recipes: recipes.data.recipes
    });
  };

  onClickHandler = recipe => {
    this.setState({
      isModalOpen: true,
      recipe: recipe
    });
  };
  renderRecipes = () => {
    return this.state.recipes.map(recipe => (
      <RecipeComponent
        key={recipe.recipe_id}
        title={recipe.title}
        image={recipe.image_url}
        publisher={recipe.publisher}
        click={this.onClickHandler.bind(this, recipe)}
      />
    ));
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      recipe: {}
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <FormComponent onsubmit={this.onSubmitHandler} />
        <div className="container">
          <div className="row">{this.renderRecipes()}</div>
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <div className="container">
            <div className="active-recipe">
              <img
                src={this.state.recipe.image_url}
                alt={this.state.recipe.title}
                className="active-recipe__img"
              />
              <h3 className="active-recipe__title">
                {this.state.recipe.title}
              </h3>
              <h4 className="active-recipe__publisher">
                Publisher: <span>{this.state.recipe.publisher}</span>
              </h4>
              <p className="active-recipe__website">
                Website:{" "}
                <a href="{this.state.recipe.source_url}" target="_blank">
                  {this.state.recipe.source_url}
                </a>
              </p>
              <button
                className="active-recipe__button"
                onClick={this.closeModal}
              >
                Close Modal
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
