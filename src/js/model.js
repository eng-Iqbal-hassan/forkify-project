import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // here getJSON function is called by the loadRecipe function. As this function call is the async call and the data over there is the resolved value of the promise so this value is again stored here to be used below.
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json();
    // if (!res.ok) throw new error(`${data.message} ${res.status}`);

    // console.log(res, data);
    const { recipe } = data.data;
    console.log('recipe is', recipe);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    // Temporary error
    console.error(`${err} 🔥🔥🔥🔥`);
    throw err;
  }
};
// By this way we instead of just console the error we are showing the error in the UI which is the actual error handling.
// loadRecipe is a function which is bringing the data of recipe from forkify APIs.
// this function will not return anything but it will change our state object
// This state is imported in the controller. As this state is changed over there. It will also be reflected in controller.js

// lecture 10 part -> this error is the consequence of the error which error occurs in the helper function
// The thing is that wwe do not want this error but we want the error which is in the helper function. So, this thing is set by rethrowing the error in the helper function
// So when we rethrow the error this error will come down the track in the console.error which is mentioned over there.

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    // we have made the new object which will contain the entries of our need.
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
      }; // This thing will return new array with new object and we will store this in our state and state should contain all the data about our application
    });
    // console.log(state.search.results); This console is put in the controller now.
  } catch (err) {
    console.error(`${err} 🔥🔥🔥🔥`);
    throw err;
  }
};

// This function is called by the controller so this is the controller who will tell which thing to search for.

// loadSearchResults('pizza');
// Here it is being observed that there is data object in which the property is data which again has object of recipes which contains so many recipes regarding pizza

// Ok after that we have commented out this function call and we will now make the function in the controller for search as well.

// Lecture 15, 16: All about pagination
// So, we will not render all the data but we will render the data which is in the page and we will create the new function which will give us the entries for specific page only.

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
