import * as model from './model.js';
import RecipeView from './views/RecipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import PaginationView from './views/PaginationView.js';

if (module.hot) {
  module.hot.accept();
}
// now here in model the state and loadRecipe will be used as model.state and model.loadRecipe

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

// // import icons from '../img/icons.svg'; // Parcel 1
// import icons from 'url:../img/icons.svg'; // Parcel 2
// import 'core-js/stable'; // this thing is for poly-filling everything else.
import 'regenerator-runtime/runtime'; //This thing is for poly-filling async await

const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// This timeout function will move to the helper function

// https://forkify-api.herokuapp.com/v2
// For this time we are directly using the https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886 to get this specific id as the result in our interface

console.log('test');
// our parcel is working and what we are writing in the script is achieving in the project

/*
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
*/ // this code will also move in the view.

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    // the code at the bottom which is hashchange(for lecture 6) gives us the id whose recipe should be shown. so we get the id from page url and then the respective id is used to show the page.
    if (!id) return; // guard clause
    // the code at the bottom which is hashchange(for lecture 6) gives us the id whose recipe should be shown. so we get the id from page url and then the respective id is used to show the page.

    // 0: Update result view to mark selected search result

    resultsView.update(model.getSearchResultsPage());

    // resultsView.render(model.getSearchResultsPage());
    // we can do with render as well but it will re-render each time when we will click on any of the recipe so to avoid the multiple reload we have used update method.
    // The best thing is that we have made the update method in parent view element and before we are looking into the recipeView. That the data inside the recipeView is changing.
    // But as this method is in the parent element so each time when any of the recipe comes into the screen the only recipeView is updated and not re-render all the time. Great.
    // 1: Loading the recipe:
    RecipeView.renderSpinner();
    /*
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
    */ // Now the data over here is coming from model so we are going import each and everything of model in the controller
    // so the new thing will be like
    // model.loadRecipe (id);
    // as it is an async function so wwe should await it before next step
    await model.loadRecipe(id); // This loadRecipe is not a pure function and it is not returning anything and just manipulating the state object and data is coming from state object so we have not stored it any variable. But now we can take the data from state object which will be rendered in the step below by the following way. model.state.recipe so this thing contains the data and it will be get by the destructuring in the following way
    const { recipe } = model.state;
    // ok the code regarding data is about model and it is being placed over there
    // now rendering the data is the code for recipeView, so we have moved the code over there.
    // 2: Rendering recipe
    RecipeView.render(model.state.recipe); // this is rendering the data coming from model on the object in view
    /*
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
    */
  } catch (err) {
    // alert(err);
    RecipeView.renderError();
  }
};
// This fetch request will return a promise and this promise is awaited.

///////////////////////////////////////

// Lecture 6: Rendering the Data
// We have get the data from the fetch class, all the thing which we required is to get the UI which contains the data coming from fetch request.
// in html, there is div(container) of class recipe in html which is the container for complete UI of a recipe coming in the screen.
// point 2 and 3 in the showRecipe is from lecture 6
// till this point, there are three problems (1): Message -> start by searching is still showing (2): Icons are missing and (3): the last one is that it is still to show the ingredients coming from API.

///////////////////////////////////////

// Lecture 7: Listening for load and hashchange events
// we have already done load recipe and render it. Now we need to perform these two steps when user select the specific recipe and on the page load with specific recipe id.
// in URL, everything that comes after the hash is called hash.
// for each recipe this hash does change and an other recipe shows on the screen.

// Window.addEventListener('hashchange', showRecipe);
// if we copy the url and paste on another browser then it does not show the recipe. This thing is resolved by using load event right after that
// Window.addEventListener('load', showRecipe);
// This is a kind od repeative code so this thing is resolved using this thing
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipe)
// );  // This code has been moved to the view as it is a publisher code.
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
// (1): Business Logics: Code that solves the actual business problem. Directly related to what business does and what it needs. example, sending messages (whatsapp), storing transactions (Bank application) etc.
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
// ok here it is very clear that we have two major files. One is controller and other is model. controller is for navigation and model is for business logics, STATE and HTTP requests. And there is a folder for multiple views in which each file is for each view.
// in model there is one big object which contains the functionality of recipe, search and bookmarks. we export this object into controller and then this thing controls the UI in views.
// The reason for this lecture is to divide the whole code in multiple stuff. The code which is written already and the code which will come afterward will be in this pattern.

// summary: The thing is clear now how we breakdown our code into multiple files and then the chunks are performed in their respective files.
// Recipe view has his own code and data is nowhere in recipeView file. Also we have made the loadRecipe async function which makes the fetch request and get the data from API.
// Now this data is given to the recipe view in the controller( As both models and view are imported in the controller) and this data is given by the piece of code RecipeView.render(model.state.recipe) and here the data is replaced by the data coming from API. Happy😍

///////////////////////////////////////

// Lecture 11: Event Handler in MVC -> this thing is done by something called Publisher-subscriber pattern
// hashchange is in the controller but everything related to DOM should be in view.
// hashchange and load event together are not looking like they are in view but the event like click on the DOM appear that they are the part of view. same goes for hashchange and load event. They should appear in the view.
// But the problem is that we want this function in the view but the function inside it is controlView which is the method of the controller. So how can we resolve it.

// There are two important things to understand
// (1): Events should be handled in the controller (otherwise we would have application logic in the view)
// (2): Events should be listened for in the view (otherwise we would need DOM element in the controller)

// Otherwise we would have DOM element in the controller and application logic in the view which would be wrong and against our MVC architecture.

// we think that this thing is simple to handle that why should not call the controlRecipe function when the event occurs

// But the thing is difficult is that we should not import controller in the view, because we set up the architecture like that the view should know nothing about the controller and it will work the other way around which is complex. The solution is called publisher-subscriber pattern. And design pattern in the programming are the standard solutions of specific kind of problem.

// In this pattern, we have a publisher which have some code who knows when to react(like this is the event handler, a specific event occurs). And on the other hand there is subscriber which is the code which actually wants to react.(This is the code which will execute when the event fires)

// And publisher does not even know that the subscriber does exist. because subscriber is in the controller and view does not have access of it. But now finally comes to the solution of the problem.

// So, the solution is that we will now subscribe to the publisher by passing the subscribe. init function is in the controller. so the way is that as soon as the program loads init function is called which in turn immediately called the addHandlerRender function from the view. This thing is possible because the controller imports both view and the model. as we call the addHandleRender function in the init, we will pass the controlRecipe function as argument. So, essentially we will subscribe controlRecipes to addHandlerRender and in this way the two functions are really connected.

// const init = function () {
//   RecipeView.addHandlerRender(controlRecipe);
// };
// init(); // its placement is set to the last

// By these two chunks of code we have perform the publisher-subscriber pattern.

///////////////////////////////////////

// Lecture 12: Implementing Error and Success Message.
// When there is some error then it will be shown in the user interface.
// Handling the error means displaying the error message in the view.
// ok we have written the renderError code in the view and we are handling the error in the model but both these two things are connected in the controller so this thing is done in this controller.

///////////////////////////////////////

// Lecture 13,14: Implementing the Search Result:
// ok the thing like loadRecipe and renderRecipe is done. In this lecture and in the next lecture the thing which we will do is that user searches, Load search result(async function call) and render search result and then bind it with user select recipe, load recipe and render recipe flow.
// This thing is done by moving in the model and implement the search functionality where some API call is made.

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1: Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2: Load Search Result
    await model.loadSearchResults(query); // we are not storing it in the variable because it is not returning anything but it is manipulating the state.
    // after using this query there will be no data at the start and then we need to make the event which will listen on the click of search button and on the click of that button we will call the function and not at the beginning when the script loads. And for this thing, we will again use the publisher subscriber pattern

    // Render Search Result
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));

    // Render the initial pagination buttons.
    PaginationView.render(model.state.search);

    // Test
    // controlServings(); // Now we have removed this test thing and we really want to change the servings on the click of the button.
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render New Search Result
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render the New Pagination  pagination buttons.
  PaginationView.render(model.state.search);
};

// as this thing needs to happen in the search block by clicking the search button so we need to create its view, and this thing will be some other separate view which will not render anything but will provide us the set of input fields in the left side.
// In first part of implementing search result, we have get the data and onclick of search button or hit enter we get the result of query and now we will implement the view.

const controlServings = function (newServings) {
  // 1. Update the recipe servings (in state)
  model.updateServings(newServings);
  // 2. Update the recipe view
  // RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
  // Now, we want that instead of render the completed DOM, we will update the text and attribute whose data is changing in servings. Now this update method will also need all the data which render method does have.
};

// Ok once again I have observed that how this complete model is working.
// Here the model and view is building independently and both are coming in the controller. Here in the controller both are connected together to give the whole functionality.
// Like in model there is updateServing function which basically is the forEach method which change the ingredient quantity of each element of the array by the formula which we have given against the param newServing which will be given afterward.
// In RecipeView, we have added a method in which we have put the onclick method on buttons by event delegation both things have come up in the controller. Both function and method of model and controlRecipe respectively have added in the controlServings function in the controller.

// And finally method for updateServings which will get the servings argument which will be this controlServings function will be called in the init function. This is the little explanation of how MVC works.

// Important Note: In control Servings there is RecipeView.render by which all time onClick of the button complete UI is updated and this thing generates the flickering effect atleast visible on the image that appears that all the time when the serving updates it is reloaded for small instance. Now our next target that instead of re-render the complete view, we will update the markup when the servings will be updated.

const controlAddBookmark = function () {
  if (!model.state.recipe.bookMarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  console.log(model.state.recipe);
  RecipeView.update(model.state.recipe);
};

///////////////////////////////////////

const init = function () {
  RecipeView.addHandlerRender(controlRecipe);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  // controlServings(); // This will not give us no recipe because the recipe is coming from async function and no recipe is reached so how it can change the recipe.
  // so I am putting this recipe in the above load recipe function.
};
init();
