import { getPhotos } from './data';
import axios from 'axios';

import { Notify } from 'notiflix';

const form = document.querySelector('form.search-form');
const gallery = document.querySelector('div.gallery');
const loadBtn = document.querySelector('button.load-more');
loadBtn.classList.add('hidden');

getPhotos('maserati')
  .then((data) => {
    console.log(data[0]);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => console.log('all done'));

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
