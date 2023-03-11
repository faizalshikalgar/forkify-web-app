import View from './View.js';
// import { RES_PER_PAGE } from '../config.js';
import icons from 'url:../../img/icons.svg'; //parcel 2;

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const previousPage = `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
     `;
    const nextPage = `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // 1) We are page 1 there are other pages
    if (curPage === 1 && numPages > 1) {
      return nextPage;
    }

    // 2) Last Page
    if (curPage === numPages && numPages > 1) {
      return previousPage;
    }

    // 3) Other pages
    if (curPage < numPages) {
      return `${previousPage}${nextPage}`;
    }

    // 4) We are page 1 there are NO other pages
    return '';
  }
}

export default new PaginationView();
