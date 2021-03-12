const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://itunes.apple.com/search?term=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get initial movies
getMovies(SEARCH_API + "top-world");

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { artworkUrl100, artistName, previewUrl } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
    <img
    src="${pictureClarity(artworkUrl100)}"
    alt="Pic"
  />
  <div class="movie-info">
    <h3>Artist</h3>
    <h3>${artistName}</h3>
  </div>
  <div class="Overview">
    <audio controls>
      <source
        src=${previewUrl}
        type="audio/ogg"
      />
    </audio>
  </div>
        `;
    main.appendChild(movieEl);
  });
}

function pictureClarity(link) {
  var index = link.replace("100x100bb", "500x500bb");
  return index;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
