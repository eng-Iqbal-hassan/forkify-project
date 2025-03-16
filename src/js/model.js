import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
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
  }
};
// loadRecipe is a function which is bringing the data of recipe from forkify APIs.
// this function will not return anything but it will change our state object
// This state is imported in the controller. As this state is changed over there. It will also be reflected in controller.js

// lecture 10 part -> this error is the consequence of the error which error occurs in the helper function
// The thing is that wwe do not want this error but we want the error which is in the helper function. So, this thing is set by rethrowing the error in the helper function
// So when we rethrow the error this error will come down the track in the console.error which is mentioned over there.
