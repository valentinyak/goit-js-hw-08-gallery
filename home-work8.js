import images from './gallery-items.js';

const gallaryListEl = document.querySelector('ul.js-gallery');
const modalEl = document.querySelector('div.js-lightbox');
const imgEl = document.querySelector('img.lightbox__image');
const closeBtnEl = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const overlayEl = document.querySelector('div.lightbox__overlay');
let tagsString = '';

images.forEach(createTagsString);
gallaryListEl.insertAdjacentHTML('afterbegin', tagsString);

gallaryListEl.addEventListener('click', onGallaryClick);

function createTagsString({ preview, original, description }) {
  tagsString += `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
</li>`;
}

function onGallaryClick(event) {
  event.preventDefault();

  closeBtnEl.addEventListener('click', closeModal);
  overlayEl.addEventListener('click', closeModal);
  window.addEventListener('keydown', keyboardNavigation);

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  modalEl.classList.add('is-open');
  imgEl.src = `${event.target.dataset.source}`;
}

function closeModal() {
  closeBtnEl.removeEventListener('click', closeModal);
  overlayEl.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', keyboardNavigation);

  modalEl.classList.remove('is-open');
  imgEl.src = '';
}

function onArrowLeftPress() {
  if (
    imgEl.src ===
    gallaryListEl.firstElementChild.firstElementChild.firstElementChild.dataset
      .source
  ) {
    imgEl.src = `${gallaryListEl.lastElementChild.firstElementChild.firstElementChild.dataset.source}`;
  } else {
    const thisEl = document.querySelector(`[data-source="${imgEl.src}"]`);
    imgEl.src = `${thisEl.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.dataset.source}`;
  }
}

function onArrowRightPress() {
  if (
    imgEl.src ===
    gallaryListEl.lastElementChild.firstElementChild.firstElementChild.dataset
      .source
  ) {
    imgEl.src = `${gallaryListEl.firstElementChild.firstElementChild.firstElementChild.dataset.source}`;
  } else {
    const thisEl = document.querySelector(`[data-source="${imgEl.src}"]`);
    imgEl.src = `${thisEl.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.dataset.source}`;
  }
}

function keyboardNavigation(event) {
  if (event.code === 'Escape') {
    closeModal();
  } else if (event.code === 'ArrowRight') {
    onArrowRightPress();
  } else if (event.code === 'ArrowLeft') {
    onArrowLeftPress();
  } else return;
}
