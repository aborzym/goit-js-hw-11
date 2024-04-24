import { getPhotos } from './data';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  '43544421-ff44ea561dacf5e24c1a430ca';

import { Notify } from 'notiflix';

const form = document.querySelector('form.search-form');
const gallery = document.querySelector('div.gallery');
const loadBtn = document.querySelector('button.load-more');
loadBtn.classList.add('hidden');
getPhotos('asshole')
  .then((info) => {
    console.log(info);
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
