const toggleButton = document.querySelector('.navigation__toggle');
const navigationElement = document.querySelector('.navigation');

toggleButton.addEventListener('click', () => {
  navigationElement.classList.toggle('navigation--open');
});
