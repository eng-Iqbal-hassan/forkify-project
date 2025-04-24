import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return; // This is the guard clause by which if we click outside then it returns the error. Now, this guard clause will handle this error.
      const goToPage = +btn.dataset.goto; // +sign has converted the string into button.
      console.log(goToPage);
      handler(goToPage); // The page number which we get on the click of the button, is passed to to the handler
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    // we get the number of pages by dividing total number of results by number of results per page.
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // Page 1 and there are some other pages
    if (curPage === 1 && numPages > 1) {
      //   return 'page 1, others';
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      //   return 'last page';
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
    `;
    }

    // Some other page.
    if (curPage < numPages) {
      //   return 'other page';
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
    }

    // Page 1 and there is no other page.
    // return 'only 1 page';
    return '';
  }
}

export default new PaginationView();
