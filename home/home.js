document.addEventListener('DOMContentLoaded', function() {

  const accessKey = "3z9gjKG25ngHtYfefPapI0E98TiIDvQ881RfuPt5cuQ";

const formElm = document.querySelector('form');
const inputElm = document.querySelector('#input-search');
const searchResults = document.querySelector('.search-results');


let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputElm.value;

  const perPage = 100; // Set the number of images per page
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&per_page=${perPage}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('img-box');

    const image = document.createElement('img');
    image.src = result.urls.small;

    imageWrapper.appendChild(image);
    searchResults.appendChild(imageWrapper);
  });

  page++;
}


formElm.addEventListener('submit',(event)=>{
  event.preventDefault();
  page = 1;
  searchImages();
});
});
