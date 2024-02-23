const btnEl = document.getElementById("get-btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");

async function getVideos() {
  const inputValue = document.getElementById("input").value;

  const videos = [];

  try {
    const apiKey = "vXOkxXWRK9pfBCu62ce6sZLXHBv0GVO8DMVmzvDPKGRcIvm9i7nTAZRv"; // Replace with your Pexels API key
    const apiUrl = `https://api.pexels.com/videos/search?query=nature&per_page=${inputValue}&page=${Math.round(
      Math.random() * 1000
    )}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: apiKey,
      },
    });

    const data = await response.json();

    console.log("Data from Pexels API:", data);

    if (data && data.videos) {
      if (Array.isArray(data.videos)) {
        data.videos.map((video) => {
          console.log("Video URL:", video.video_files[0].link);
          videos.push(
            `<video width="400" height="250"><source src="${video.video_files[0].link}" type="video/mp4"></video>`
          );
        });

        galleryEl.style.display = "block";
        galleryEl.innerHTML = videos.join("");
        errorMessageEl.style.display = "none";
      } else {
        throw new Error(
          "Invalid response format from Pexels API - videos is not an array"
        );
      }
    } else {
      throw new Error(
        "Invalid response format from Pexels API - videos property is missing"
      );
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    errorMessageEl.style.display = "block";
    errorMessageEl.innerHTML = "An error happened";
    galleryEl.style.display = "none";
  }
}

btnEl.addEventListener("click", getVideos);
