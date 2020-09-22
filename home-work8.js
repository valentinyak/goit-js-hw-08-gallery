import images from './gallery-items.js';

const gallaryListEl = document.querySelector('ul.js-gallery');
const modalEl = document.querySelector('div.js-lightbox');
const imgEl = document.querySelector('img.lightbox__image');
const closeBtnEl = document.querySelector(
  'button[data-action="close-lightbox"]',
);
let tagsString = '';

images.forEach(makeTagsString);
gallaryListEl.insertAdjacentHTML('afterbegin', tagsString);
gallaryListEl.addEventListener('click', onGallaryClick);
closeBtnEl.addEventListener('click', onBtnCloseClick);

function makeTagsString({ preview, original, description }) {
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
  //
}

function onGallaryClick(event) {
  if (event.target.nodeName === 'IMG') {
    modalEl.classList.add('is-open');
    imgEl.src = `${event.target.dataset.source}`;
    console.log(event.target.dataset.source);
    console.log(imgEl.src);
  }
}

function onBtnCloseClick() {
  modalEl.classList.remove('is-open');
  imgEl.src = '';
}
