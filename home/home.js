document.addEventListener('DOMContentLoaded', function() {

  const accessKey = "vXOkxXWRK9pfBCu62ce6sZLXHBv0GVO8DMVmzvDPKGRcIvm9i7nTAZRv";

  const formElm = document.querySelector('form');
  const inputElm = document.querySelector('#input-search');
  const searchResults = document.querySelector('.search-results');


  let inputData = "";
  let page = 1;

  async function searchVideos() {
    inputData = inputElm.value;

    const perPage = 10; // Set the number of videos per page
    const url = `https://api.pexels.com/videos/search?query=${inputData}&per_page=${perPage}&page=${page}`;

    const response = await fetch(url, {
      headers: {
        Authorization: accessKey,
      },
    });
    const data = await response.json();

    const results = data.videos;

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    results.map((result) => {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-box');

      const video = document.createElement('video');
      video.src = result.video_files[0].link;
      video.setAttribute('loop',true)
      video.setAttribute('muted',true)

      // Add event listeners to play/pause video
      video.addEventListener('mouseenter', () => {
        video.play();
      });

      video.addEventListener('mouseleave', () => {
        video.pause();
      });

      videoWrapper.appendChild(video);
      searchResults.appendChild(videoWrapper);
    });

    page++;
  }


  formElm.addEventListener('submit',(event)=>{
    event.preventDefault();
    page = 1;
    searchVideos();
  });
});
