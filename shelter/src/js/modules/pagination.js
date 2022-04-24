import { pets } from '../data/pets.js';
import { renderModalElement } from './modal.js';
import { makeRandomInteger } from './util.js';
import { renderItemElement } from './slider.js';

const PAGES_COUNT = 6;
const PETS_PER_PAGE = 8;
const PAGE_NUMBER_ELEMENT = document.querySelector('.pagination__element--page');
const PAGINATION_LIST = document.querySelector('.pets__list');
const BUTTON_NEXT = document.querySelector('.pagination__element--next');
const BUTTON_PREV = document.querySelector('.pagination__element--prev');
const BUTTON_FIRST_PAGE = document.querySelector('.pagination__element--first');
const BUTTON_LAST_PAGE = document.querySelector('.pagination__element--last');

const pagination = {
  petsIndexes: [], // [[2, 4, 1, 4], [3, 4, 5, 2,], ...]
  generatePetsIndexes() {
    const generatedIndexes = [];
    for (let i = 0; i < PAGES_COUNT; i++) {
      const indexBox = [];
      for (let j = 0; j < PETS_PER_PAGE; j++) {
        let index = makeRandomInteger(0, 7);
        while (indexBox.includes(index)) {
          index = makeRandomInteger(0, 7);
        }
        indexBox.push(index);
      }
      generatedIndexes.push(indexBox);
    }
    this.petsIndexes = generatedIndexes;
  },
  currentPage: 0,
  renderPageNumber() {
    PAGE_NUMBER_ELEMENT.innerText = this.currentPage + 1;
  },
  renderPaginationList() {
    PAGINATION_LIST.innerHTML = '';
    for (let i = 0; i < PETS_PER_PAGE; i++) {
      const index = this.petsIndexes[this.currentPage][i];
      renderItemElement(pets[index], PAGINATION_LIST);
    }
  },
  renderButtons() {
    if (this.currentPage === 0) {
      BUTTON_FIRST_PAGE.disabled = true;
      BUTTON_PREV.disabled = true;
    } else {
      BUTTON_FIRST_PAGE.disabled = false;
      BUTTON_PREV.disabled = false;
    }

    if (this.currentPage === PAGES_COUNT - 1) {
      BUTTON_LAST_PAGE.disabled = true;
      BUTTON_NEXT.disabled = true;
    } else {
      BUTTON_LAST_PAGE.disabled = false;
      BUTTON_NEXT.disabled = false;
    }
  },
  renderPage() {
    this.renderPageNumber();
    this.renderPaginationList();
    this.renderButtons();
  },
  renderPagination() {
    this.generatePetsIndexes();
    this.renderPage();
    this.buttonNextHandler = this.buttonNextHandler.bind(this);
    this.buttonPrevHandler = this.buttonPrevHandler.bind(this);
    this.buttonFirstHandler = this.buttonFirstHandler.bind(this);
    this.buttonLastHandler = this.buttonLastHandler.bind(this);
    BUTTON_NEXT.addEventListener('click', this.buttonNextHandler);
    BUTTON_PREV.addEventListener('click', this.buttonPrevHandler);
    BUTTON_FIRST_PAGE.addEventListener('click', this.buttonFirstHandler);
    BUTTON_LAST_PAGE.addEventListener('click', this.buttonLastHandler);

    PAGINATION_LIST.addEventListener('click', (evt) => {
      if (evt.target.closest('li')) {
        renderModalElement(evt.target.closest('li').querySelector('.item__name').textContent);
      }
    });
  },
  buttonNextHandler() {
    this.currentPage += 1;
    this.renderPage();
  },
  buttonPrevHandler() {
    this.currentPage -= 1;
    this.renderPage();
  },
  buttonFirstHandler() {
    this.currentPage = 0;
    this.renderPage();
  },
  buttonLastHandler() {
    this.currentPage = PAGES_COUNT - 1;
    this.renderPage();
  },
};

if (document.querySelector('.pagination')) {
  pagination.renderPagination();
}
