export const preventScroll = (evt) => {
  evt.preventDefault();
};

export const makeRandomInteger = (min, max) => Math.round(Math.random() * (max - min) + min);

export const closeMenuEsc = (evt) => {
  if (evt.key === 'Escape') {
    document.querySelector('.modal').remove();
    document.removeEventListener('wheel', preventScroll);
  }
};
