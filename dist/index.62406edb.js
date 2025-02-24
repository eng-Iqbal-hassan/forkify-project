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
const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
}; // https://forkify-api.herokuapp.com/v2
 ///////////////////////////////////////

//# sourceMappingURL=index.62406edb.js.map
