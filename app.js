const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

let currentIndex = 0;

const lightboxImage = document.querySelector('.lightbox__image');
const lightBoxRef = document.querySelector('.lightbox');

const closeLightboxButtonRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const lightBoxOverlayRef = document.querySelector('div.lightbox__overlay');

const galleryContainer = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryItems(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryItems(gallery) {
  return gallery
    .map(({ preview, original, description }, i) => {
      return `<li class="gallery__item">
<a
  class="gallery__link"
  href="${original}"
>
  <img
    class="gallery__image"
    data-index=${i}
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />
</a>
</li>`;
    })
    .join('');
}

galleryContainer.addEventListener('click', onGalleryContainerClick);

closeLightboxButtonRef.addEventListener('click', lightboxImageClose);

lightBoxOverlayRef.addEventListener('click', lightboxImageClose);

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  lightBoxRef.classList.add('is-open');

  setLightboxImage(evt.target.dataset.source, evt.target.alt);

  currentIndex = Number(evt.target.dataset.index);

  window.addEventListener('keydown', onKeyDown);
}

function lightboxImageClose() {
  lightBoxRef.classList.remove('is-open');
  setLightboxImage();

  window.removeEventListener('keydown', onKeyDown);
}

function onKeyDown(evt) {
  if (evt.key === 'Escape') {
    lightboxImageClose(evt);
    return;
  }

  if (evt.key === 'ArrowRight') {
    showNextImage();
    return;
  }

  if (evt.key === 'ArrowLeft') {
    showPreviousImage();
    return;
  }
}

function setLightboxImage(currentSource = '', currentAlt = '') {
  lightboxImage.src = currentSource;
  lightboxImage.alt = currentAlt;
}

function showNextImage() {
  if (currentIndex === galleryItems.length - 1) {
    currentIndex = 0;
  }
  currentIndex += 1;

  setLightboxImage(
    galleryItems[currentIndex].original,
    galleryItems[currentIndex].description,
  );
}

function showPreviousImage() {
  if (currentIndex === 0) {
    currentIndex = galleryItems.length - 1;
  }
  currentIndex -= 1;

  setLightboxImage(
    galleryItems[currentIndex].original,
    galleryItems[currentIndex].description,
  );
}