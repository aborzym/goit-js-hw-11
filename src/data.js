import axios from 'axios';

const apiKey = '43544421-ff44ea561dacf5e24c1a430ca';

export const getPhotos = async (searchQuery) => {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
  await axios
    .get(`${url}`)
    .then((info) => {
      console.log(info.data.hits);
      return info.data.hits;
    })
    .catch((err) => {
      console.log(err.message);
      console.log('no i dupa');
    });
};
