import { getPhotos, makeSinglePhotoHTML, perPage } from './data';
import axios from 'axios';
import { error } from 'console';
import { Notify } from 'notiflix';
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

const generatePhotos = (searchQuery, page) => {
  getPhotos(searchQuery, page)
    .then((data) => {
      console.log(searchQuery, page);
      totalHits = data.totalHits;
      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        counter =
          page * perPage > totalHits ? totalHits - (page - 1) * perPage : 40;
        if (page === 1 && totalHits <= 40) {
          foundNotify.innerText = `We found only ${totalHits} images.`;
        } else if (page === 1 && totalHits > 40) {
          foundNotify.innerText = `Hooray! We found ${totalHits} images.`;
          nextBtn.classList.remove('hidden');
        } else if (page * perPage > totalHits) {
          foundNotify.innerText = `Displaying ${
            (page - 1) * perPage + 1
          } - ${totalHits} of ${totalHits} images.`;
          //TODO - funkcja sprawdzająca za każdym razem counter
          endNotify.innerText =
            "We're sorry, but you've reached the end of search results.";
          nextBtn.classList.add('hidden');
        } else {
          foundNotify.innerText = `Displaying ${(page - 1) * perPage + 1} - ${
            page * perPage
          } of ${totalHits} images.`;
        }
        gallery.innerHTML = '';
        console.log(counter);
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
    .catch();
};
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  page = 1;
  previousBtn.classList.add('hidden');

  searchQuery = form.elements.searchQuery.value;
  generatePhotos(searchQuery, page);
});

nextBtn.addEventListener('click', () => {
  console.log(totalHits);
  console.log('COUNTER: ' + counter);
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
});
