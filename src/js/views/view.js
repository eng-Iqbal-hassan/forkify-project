import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  render(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    // Here we generate the new markup and we will not render the complete markup but we will compare the new markup with the older one and will change the data and attribute only whose value is changing.
    // Now this new markup is the string only and it is difficult to compare this string to the DOM element which is already existing in the screen.
    // This thing is resolved by using the trick by which we will convert our string into DOM object.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // For this thing we have applied createRange method which has created a range and on this range we have applied another method createContextualFragment and in this method we have passed a string and this method has created the real DOM node. This DOM node is virtual DOM node which is a big object, the node which really not exist in the page but exists in our memory
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElement);
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElement);
    // Here we need to compare one by one each element in the array so we will loop over the complete newElement
    newElement.forEach((newEl, i) => {
      const curEl = curElement[i];
      // then how will we compare each element in the node. This thing is done by very healthy method which is isEqualNode
      // console.log(curEl, newEl.isEqualNode(curEl)); // This thing has given us the true for the newEl which are same as the curEl and false for the those newEl which are not same as that of curEl.

      // Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
        // But this thing has some problem which is that it has taken the complete element and change it with the new one. In this way UI is broken and now the thing which we want is that only the text should be changed.
        // This thing is achieved by yet another property which is available on al nodes. This property is nodeValue
      }
      // so here if newEl is not same as that of curEl then the text of current element will be changed with the text of new element. According to this property, the value of the most of the elements is null and if the element is text, then its value will content of the text node.
      // so the if condition has been improved a bit and in it we are comparing the text in actual by nodeValue method
      // Here newEl is the div like element and in front of it when i place firstChild then it reaches to the text inside of it and then we have applied nodeValue method to compare the text and then trim method is applied which will remove the empty spaces
      // And in comparison of it we have given not equal to empty because in case of element(div) level nodeValue method will give us the null and we will not include it and this time our div structure will not be finished.
      // till now we are getting 3 and 5 servings only, because till now we have changed the text only and we need to change the attribute also. and then the whole thing will be fixed.
      // we can not update the attribute in the same above if block because the condition after and is for comparing text only.

      // Update changed Attribute
      if (!newEl.isEqualNode(curEl)) {
        console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
        // By this thing wwe have taken the attribute from newEl and set it to the curEl.
        // so by this thing we are able to go as far as we want to get the servings of the any number of persons
      }

      // so here attributes method return us the object which contains all the attributes that have changed. Now we convert object into array and can loop over the array and copy attribute from one element into the other elements.
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  } // this is the public method which is called when we start fetching the data.

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `
          <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
