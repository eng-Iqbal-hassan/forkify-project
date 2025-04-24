import View from './view.js';

// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2 // this import is also the part of view.js file
// import Fraction from 'fractional';
// Here fraction is the object inside of which fraction function does exist so we can do destructuring to get the function directly.
import { Fraction } from 'fractional';
console.log(Fraction);

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find this recipe. Please try another one.';
  _successMessage = '';

  // _data;
  // render(data) {
  //   this._data = data;
  //   const markup = this._generateMarkup();
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  // _clear() {
  //   this._parentElement.innerHTML = '';
  // }
  // renderSpinner() {
  //   const markup = `
  //     <div class="spinner">
  //       <svg>
  //         <use href="${icons}#icon-loader"></use>
  //       </svg>
  //     </div>
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // } // this is the public method which is called when we start fetching the data.

  // renderError(message = this._errorMessage) {
  //   const markup = `
  //       <div class="error">
  //           <div>
  //             <svg>
  //               <use href="${icons}#icon-alert-triangle"></use>
  //             </svg>
  //           </div>
  //           <p>${message}</p>
  //         </div>
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  // renderMessage(message = this._successMessage) {
  //   const markup = `
  //       <div class="message">
  //           <div>
  //             <svg>
  //               <use href="${icons}#icon-smile"></use>
  //             </svg>
  //           </div>
  //           <p>${message}</p>
  //         </div>
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // } // This code will be move in the parent class

  // Publisher code
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    // we will do our working by event delegation -> which is the applying event on parent element and then by it we do our functionality on child element.
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      console.log(btn);
      // There is the place where will connect our UI with the code by which we will change the servings dynamically by clicking the button.
      // The achievement is similar to the pagination button according to which we add the special data property to the servings button which in turn helps us to change the UI.
      // const updateTo = btn.dataset.updateTo;

      // Here the syntax is because when we have the dash notation for data in the HTML then it will change into the camel case notation.
      // To make the code even more cleaner we have change the above syntax into the destructuring
      const { updateTo } = btn.dataset; // and this updateTo value will keep changing on clicking the button.
      if (+updateTo > 0) handler(+updateTo); // This + sign has changed the string into the number
      // so the handler will take the value and will pass it down the track in the controller by which the UI will be updated for the ingredients
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  } // this method will always receive the handler function which in case is the controller(controlAddBookmark) which we have just created.

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.bookMarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(this._generateMarkupIngredient)
              .join(' ')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }
  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }
}

export default new RecipeView();
