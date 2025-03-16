class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput(); // Here we will clear the input field
    return query; // and get the query out of it
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // This handler is the controlSearchResults function.
    });
    // we have called the method on entire form and not on the button because no matter the user clicks on the search button or hit enter after writing query.
  }
  // this addHandlerSearch is the publisher.

  // ok the thing is done and what we will do is that we will clear search fields when user hits enter.
}

export default new SearchView();
// we are not exporting searchView class but we are exporting the instance, the object created by this class.
// so this small piece of code we can write in the controller but this thing is not the care of the care of controller which concerns with the application logic.
