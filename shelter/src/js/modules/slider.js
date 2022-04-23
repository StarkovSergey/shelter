import { renderModalElement } from './modal.js';

const sliderListElement = document.querySelector('.slider__list');

sliderListElement?.addEventListener('click', (evt) => {
  if (evt.target.closest('li')) {
    renderModalElement(evt.target.closest('li').querySelector('.item__name').textContent);
  }
});
