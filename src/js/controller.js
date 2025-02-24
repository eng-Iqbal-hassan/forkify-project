// Lecture 3: Overview and planning
// planning of a project starts with user story.
// user story is the description of application's functionality from user's perspective.

// As a user i want to search for recipes so that i could get different ideas for meal
// As a user, i want to update the number of serving so that i can cook a meal for different number of users
// As a user i want to bookmark recipes so that i can see them later
// As a user i want to add my recipe, so that i could get all the recipes in single platform.
// As a user i want to see my bookmark and recipe even after I leave the app and come back, so that i can close the app safely after cooking the food.

// From this user story, we will get our features of application
// Search functionality -> input field to send request to the API's with searched keywords. Display the result with pagination. Display recipe with cooking time, serving and ingredients.
// Change serving functionality: Update all ingredients according to number of servings.
// Bookmark functionality: display list of all book marks
// User upload his own recipe. User recipe will automatically be book-marked. User can see his own recipes and recipes from other users.
// store bookmark data in the browser using local storage. On page load, read saved bookmarks from local storage and display.

///////////////////////////////////////

// Lecture 5:
// npm is initialized and it has give package.json file
// start with writing custom script with start which is parcel index.html
// other custom script is build which is given the script parcel build index.html
// after that parcel is installed by the command npm i parcel@next -D
//

// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../img/icons.svg'; // Parcel 2
// import 'core-js/stable'; // this thing is for poly-filling everything else.
import 'regenerator-runtime/runtime'; //This thing is for poly-filling async await

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// For this time we are directly using the https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886 to get this specific id as the result in our interface

console.log('test');
// our parcel is working and what we are writing in the script is achieving in the project

const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  const id = window.location.hash.slice(1);
  console.log(id);
  // the code at the bottom which is hashchange(for lecture 6) gives us the id whose recipe should be shown. so we get the id from page url and then the respective id is used to show the page.
  if (!id) return; // guard clause
  // the code at the bottom which is hashchange(for lecture 6) gives us the id whose recipe should be shown. so we get the id from page url and then the respective id is used to show the page.

  try {
    // 1: Loading the recipe:
    renderSpinner(recipeContainer);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new error(`${data.message} ${res.status}`);
    // when this error does occur, this will move down in the catch block and it will shown in the alert window.
    console.log(res, data);
    // ok the object we get in data is not in the nicer format and we will make a new object which will take some value from this data object and into our nicer format.
    // so the thing of work is data.data.recipe, we will get it through destructuring
    let { recipe } = data.data;
    console.log('recipe is', recipe);
    // in  recipe it is showing me the nice object which contains all the data regarding recipe.
    // now we will create new recipe object by the following way:
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // 2: Rendering recipe
    const markup = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map(ing => {
                return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ing.quantity}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                    ${ing.description}
                  </div>
                </li>
              `;
              })
              .join(' ')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};
showRecipe();
// This fetch request will return a promise and this promise is awaited.

///////////////////////////////////////

// Lecture 6: Rendering the Data
// We have get the data from the fetch class, all the thing which we required is to get the UI which contains the data coming from fetch request.
// in html, there is div(container) of class recipe in html which is the container for complete UI of a recipe coming in the screen.
// point 2 and 3 in the showRecipe is from lecture 6
// till this point, there are three problems (1): Message -> start by searching is still showing (2): Icons are missing and (3): the last one is that it is still to show the ingredients coming from API.

///////////////////////////////////////

// Lecture 6: Listening for load and hashchange events
// we have already done load recipe and render it. Now we need to perform these two steps when user select the specific recipe and on the page load with specific recipe id.
// in URL, everything that comes after the hash is called hash.
// for each recipe this hash does change and an other recipe shows on the screen.

// Window.addEventListener('hashchange', showRecipe);
// if we copy the url and paste on another browser then it does not show the recipe. This thing is resolved by using load event right after that
// Window.addEventListener('load', showRecipe);
// This is a kind od repeative code so this thing is resolved using this thing
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
// so at first ev will be changed and on the second it will be loaded
// if there is no id then the spinner will keep loading and error will be thrown.
// The problem is that we do not have any id
// the error because we are trying to find the recipe with empty array id

///////////////////////////////////////

// Lecture 8: The MVC Architecture
// Why worry about architecture?
// (1): Architecture provides us the structure.
// Software needs a structure, they way we organize our code.
// It basically means that how we organize, divide the code into different modules, classes and functions.
// (2): Maintainability: A project is never done. We need to be able to easily change it in the future
// (3): We need to add the new feature easily.
// The perfect architecture allows us all these three aspects.
// we can build our own architecture, but this thing is possible for only small projects but if the project grows then it is hard to maintain our own architecture.
// So, we will use the architecture which developers are using in the decades. like model view controller, model view presenter, flux and many other architectures.
// We can use framework like react, vue etc and then there is no need to take care of architecture on your own.

// Components of any architecture:
// There are 5 major components of an architecture.
// (1): Business Logics: Code that solves the actual business problem. Directly related toi what business does and what it needs. example, sending messages (whatsapp), storing transactions (Bank application) etc.
// (2): STATE: Essentially store all the data of the application. should be the 'single source of truth'. UI should be kept in sync with the state.
// (3): HTTP Library: Responsible for making and receiving AJAX calls. Optional but most always necessary in real world application
// (4): Application Logic (Router) : Code that is concerned about the implementation of application itself. Handle navigation and UI events.
// (5): Presentation Logic (UI Layer) : Code that is concerned about the visible part of the application.Essentially displays application state.
// Any of architecture model is good which covers all these 5 components.

// In this project we are going to use Model-view-controller architecture:

// It consists of three parts model, controller and view
// view is the user side and it contains Presentation logic
// model is the web side and it will contain Business Logic, STATE and HTTP Library.
// controller is the bridge between model and view and it contains the Application Logic.
// Model and view will kept in complete separate that they know nothing about each other which is the major goal of this model.
// Let say a click is made into the UI, this click is gone for controller because this thing is handled in the controller and from here model and view will face some changes.
//

///////////////////////////////////////

// Lecture 9: Refactoring for MVC Architecture:

///////////////////////////////////////
