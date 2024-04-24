import axios from 'axios';
import { Notify } from 'notiflix';
axios.defaults.headers.common['x-api-key'] =
  '43544421-ff44ea561dacf5e24c1a430ca';

const getPhotos = async (searchQuery) => {
  await axios
    .get(
      `https://pixabay.com/api/?key=43544421-ff44ea561dacf5e24c1a430ca&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then((info) => {
      return info.data;
    })
    .catch((err) => {
      console.log(err.message);
      console.log('no i dupa');
    });
};

getPhotos('asshole')
  .then((info) => {
    console.log(info);
  })
  .finally(() => console.log('all done'));
