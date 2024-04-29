import {
  getPhotos,
  makeSinglePhotoHTML,
  perPage,
  generateFoundNotify,
} from './data';
import axios from 'axios';
import { error } from 'console';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('form.search-form');
const gallery = document.querySelector('div.gallery');
const nextBtn = document.querySelector('button.load-more');
const previousBtn = document.querySelector('button.load-previous');
const foundNotify = document.querySelector('p.found-notify');
const endNotify = document.querySelector('p.end-notify');
let page = 1;
let searchQuery;
let totalHits;
let counter;

nextBtn.classList.add('hidden');
previousBtn.classList.add('hidden');

Notiflix.Notify.init({
  width: '450px',
  position: 'center-top',
  fontSize: '30px',
  useIcon: false,
  failure: {
    textColor: '#000',
  },
  success: {
    textColor: '#000',
  },
});
//funkcja generująca zdjęcia odwołująca się do funkcji zapytania do API
const generatePhotos = (searchQuery, page) => {
  getPhotos(searchQuery, page)
    .then((data) => {
      totalHits = data.totalHits;
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        counter =
          page * perPage > totalHits ? totalHits - (page - 1) * perPage : 40;
        if (page === 1 && totalHits <= 40) {
          Notiflix.Notify.success(`We found only ${totalHits} images.`);
          foundNotify.innerText = `Displaying 1 - ${totalHits} of ${totalHits} images.`;
        } else if (page === 1 && totalHits > 40) {
          Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
          // foundNotify.innerText = `Hooray! We found ${totalHits} images.`;
          foundNotify.innerText = `Displaying 1 - 40 of ${totalHits} images.`;

          nextBtn.classList.remove('hidden');
          previousBtn.classList.add('hidden');
        } else if (page * perPage > totalHits) {
          foundNotify.innerText = `Displaying ${
            (page - 1) * perPage + 1
          } - ${totalHits} of ${totalHits} images.`;
          endNotify.innerText =
            "We're sorry, but you've reached the end of search results.";
          nextBtn.classList.add('hidden');
        } else {
          foundNotify.innerText = `Displaying ${(page - 1) * perPage + 1} - ${
            page * perPage
          } of ${totalHits} images.`;
        }
        gallery.innerHTML = '';
        for (let i = 0; i < counter; i++) {
          const singlePhotoData = data.hits[i];
          gallery.insertAdjacentHTML(
            'beforeend',
            makeSinglePhotoHTML(singlePhotoData)
          );
        }
        let gallerySL = new SimpleLightbox('.gallery a');
      }
    })
    .catch((err) => {
      console.log(err.message);
      Notiflix.Notify.failure(
        'There was an error downloading data. Try again.'
      );
    });
};
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  page = 1;
  previousBtn.classList.add('hidden');

  searchQuery = form.elements.searchQuery.value;
  generatePhotos(searchQuery, page);
});

nextBtn.addEventListener('click', () => {
  page++;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  generatePhotos(searchQuery, page);
  previousBtn.classList.remove('hidden');
});

previousBtn.addEventListener('click', () => {
  page--;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  generatePhotos(searchQuery, page);
  endNotify.innerText = '';
  if (page === 1) {
  }
});
