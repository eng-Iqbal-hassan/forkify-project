import View from './view';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe is successfully uploaded.';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // This is the browser API by which we can have all the data from all the fields of the form instead getting all one by one.
      const data = Object.fromEntries(dataArr);
      handler(data); // This is the data which we want to add in the API, and where this thing will be done is that in model, so its control will be created in controller
    });
  } // This handler is the controlAddRecipe function

  // Here when the upload button is clicked then data has come up and the data is in the format of array which contains array for each entry
  // Data should be in the format of object, so this thing will be done by ES19 method which will convert this data from array to object.
  // This fromEntries method have successfully converted parent array into object, in parent array there was child array and in each array there were two entries first entry now the property and second entry is the value in this object.

  _generateMarkup() {}
}

export default new addRecipeView();
