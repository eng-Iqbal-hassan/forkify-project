// Lecture 10:
// here we add all the variables that should be constants and will be reused in our project.
// we will not add all the variables but only that variables which are responsible for some kind of data manipulation. Like the API URL. As the API_URL is used at many places like getting the data and for uploading our own recipe. so let say this URL is changed in the future. So instead of changing the URL in all the places, we will change in this variable only.
// we have used the upper-case and the reason is that this variable will not change in the future.

export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;
export const KEY = 'd7cb61d0-2c90-4e9e-b5c5-28f5f21852b3';
export const MODAL_CLOSE_SEC = 2;
