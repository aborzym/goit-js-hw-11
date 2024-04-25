import { getPhotos, makeSinglePhotoHTML } from './data';
import axios from 'axios';
import { error } from 'console';

import { Notify } from 'notiflix';

const form = document.querySelector('form.search-form');
const gallery = document.querySelector('div.gallery');
const loadBtn = document.querySelector('button.load-more');
loadBtn.classList.add('hidden');

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const searchQuery = form.elements.searchQuery.value;

  getPhotos(searchQuery)
    .then((data) => {
      if (data.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        for (let i = 0; i < 40; i++) {
          const singlePhotoData = ({
            largeImageURL, //link do dużego obrazka
            webformatURL, //link do małego obrazka.
            tags, //wiersz z opisem obrazka. Będzie pasować do atrybutu alt.
            likes, //liczba “lajków”.
            views, //liczba wyświetleń.
            comments, //liczba komentarzy
            downloads, //liczba pobrań.
          } = data[i]);
          console.log(largeImageURL);
          gallery.insertAdjacentHTML(
            'beforeend',
            makeSinglePhotoHTML(singlePhotoData)
          );
        }
      }
    })
    .catch();
});

//SZABLON ELEMENTU GALERII
//   <div class="photo-card">
//     <img src="" alt="" loading="lazy" />
//     <div class="info">
//       <p class="info-item">
//         <b>Likes</b>
//       </p>
//       <p class="info-item">
//         <b>Views</b>
//       </p>
//       <p class="info-item">
//         <b>Comments</b>
//       </p>
//       <p class="info-item">
//         <b>Downloads</b>
//       </p>
//     </div>
//   </div>;
