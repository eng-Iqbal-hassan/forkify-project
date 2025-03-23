import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookMarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    // Not all the time recipe does have the key, like the case of loadRecipe data with get request. But in post request the recipe key is important thing. so we have conditionally get the key by short-circuiting(if first value is true then the second value is returned and now the object is returned which using the spread operator will be the same as that of key value pair)
    // This is nice trick sometime to set the property conditionally on an object.
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // here getJSON function is called by the loadRecipe function. As this function call is the async call and the data over there is the resolved value of the promise so this value is again stored here to be used below.
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json();
    // if (!res.ok) throw new error(`${data.message} ${res.status}`);

    // console.log(res, data);
    // const { recipe } = data.data;
    console.log('recipe is', recipe);
    // state.recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };
    state.recipe = createRecipeObject(data);

    // Here the recipe is loaded from the API and not from any of the data which is already in bookmarked. Ok so we have bookmarked one of the recipe and then move into the next recipe when comes back to the previous recipe then the icon which indicates it to be bookmarked has reset back to un-bookmarked.

    // this thing is resolved by another array method, which is some method and according to this method -> it loop over the array and return true if any of the value is true otherwise it returns false

    if (state.bookMarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookMarked = true;
    } else {
      state.recipe.bookMarked = false;
    }
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
        // bookMarked: false,
      }; // This thing will return new array with new object and we will store this in our state and state should contain all the data about our application
    });
    // console.log(state.search.results); This console is put in the controller now.
    state.search.page = 1; // This thing will reset the page nack ton one when we made new search, so the new search data and pagination will start from page 1.
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

export const updateServings = function (newServings) {
  // This function will do is to reach into the state and in particular into the recipe ingredients and will change the quantity in each ingredients.
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    // We can calculate the new quantity by the formula
    // newQt = oldQt * newServings / oldServings
  });
  state.recipe.servings = newServings; // So we have update the array and this manipulated array will be shown in the UI.
  // There was small issue that I added the state.recipe.servings = newServings; inside forEach method which create the trouble that for only first ingredient the quantity was changing. now as per rule i have put it outside the whole servings start dynamically changing.
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
};

export const addBookMark = function (recipe) {
  // bookMarks is all about storing the data about the recipe which we want to have. so for bookmarks we have initially the empty array of bookmarks then this array will keep changing when user add or remove a specific recipe as a bookmarked recipe.

  // add the bookmark;
  state.bookMarks.push(recipe); // In this array, simply we will add the recipe object which will be received.

  // Mark current recipe as bookmarked recipe.
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Remove the bookmark
  const index = state.bookMarks.findIndex(el => el.id === id);
  state.bookMarks.splice(index, 1);

  // Mark current recipe as NOT  bookmarked recipe.
  if (id === state.recipe.id) state.recipe.bookMarked = false;
};

// This is the common pattern in the programming that when we add something then we need the completed data and when we have to remove something then we need only id.

// Ok the thing which we are going to fix next is that the data in the bookmark is gone when the page is loaded. So, the solution of this thing is that we will store the bookmark data in the local storage so even the page is loaded we will get our data of bookmark from local storage and our data will not lost

// storing data in local storage is all about data so we will implement this thing here in the model

// So when the user will bookmark or un-bookmark a recipe, thee array will be stored in the local storage.

// on page load i want this localstorage data to come into the page

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookMarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// clearBookmarks(); // at sometime of our project we might need to clear the whole bookmark so this function will work over there.

export const uploadRecipe = async function (newRecipe) {
  try {
    // This is the model which is responsible for sending data to forkify API.
    // The next thing which we need to make sure that our raw data should be in the same format as that of the data coming from API.
    console.log(Object.entries(newRecipe));
    // Here we are focused that we will get the ingredient in the format of data coming from API.
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format;)'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(ingredients); // here the ingredient format is same as that of ingredient from API (Array of object, each object is key value pair separated by commas)
    // Here the quantity is set like if quantity does exist then it is a number and if does not exist then it is null -> same as that in API.

    // Now we need to create the object which need to pass to the API.
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    }; // Now this object is opposite to the recipe object which we have up.
    // cooking time and servings are the numbers so we have converted them into numbers by + trick
    console.log(recipe); // Here the object is looking exactly same and ready to be send to the API.

    // post request
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    console.log(data);
    // Now we want to store this newly created data by the post request in the state
    state.recipe = createRecipeObject(data); // now by this thing the data will be in the state
    // also we need to bookmark this recipe, so this thing is done by calling the bookmark function over there
    addBookMark(state.recipe);
  } catch (err) {
    throw err;
  }
};
