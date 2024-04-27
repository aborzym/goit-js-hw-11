import { getPhotos, makeSinglePhotoHTML, page, perPage } from './data';
import axios from 'axios';
import { error } from 'console';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('form.search-form');
const gallery = document.querySelector('div.gallery');
const loadBtn = document.querySelector('button.load-more');
loadBtn.classList.add('hidden');

let totalHits;
form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const searchQuery = form.elements.searchQuery.value;

  getPhotos(searchQuery)
    .then((data) => {
      totalHits = data.totalHits;
      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        gallery.innerHTML = '';
        for (let i = 0; i < perPage; i++) {
          const singlePhotoData = data.hits[i];
          gallery.insertAdjacentHTML(
            'beforeend',
            makeSinglePhotoHTML(singlePhotoData)
          );
        }
      }
    })
    .catch();
});
