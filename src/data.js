import axios from 'axios';

const apiKey = '43544421-ff44ea561dacf5e24c1a430ca';

export const getPhotos = async (searchQuery) => {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
  return await axios
    .get(`${url}`)
    .then((info) => {
      return info.data.hits;
    })
    .catch((err) => {
      console.log(err.message);
      console.log('no i dupa');
    });
};

export const makeSinglePhotoHTML = (photo) => {
  return `<div class="photo-card">
    <img class="image" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${photo.likes}
      </p>
      <p class="info-item">
        <b>Views</b>${photo.views}
      </p>
      <p class="info-item">
        <b>Comments</b>${photo.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${photo.downloads}
      </p>
    </div>
  </div>`;
};
