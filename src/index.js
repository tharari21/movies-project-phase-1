const API_KEY = "b2f757bb5ced3f141bd05de9a71b3ca8";
const BASE_URL = "https://api.themoviedb.org/3";
const baseImageUrl = "https://image.tmdb.org/t/p/w500";
const movieContainer = document.getElementById("container");
const searchInput = document.getElementById("search-bar");
const nextPageBtn = document.getElementById("next-page");
const prevPageBtn = document.getElementById("prev-page");

const fetchMovie = async (movieId) => {
  // Returns a movie with id of movieId
  const req = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const res = await req.json();
  return res;
};

const searchMovies = async (queryString, pageNum) => {
  // searches movies using queryString and gets page number pageNum
  const req = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURI(
      queryString
    )}&page=${pageNum}`
  );
  const res = await req.json();
  return res;
};

const renderPage = async (queryString, pageNum) => {
  // Gets list of movies from searchMovies and renders that result
  const res = await searchMovies(queryString, pageNum);
  renderMovies(res.results);
};

const renderMovie = (movie) => {
  // creates movie card and appends elements to the DOM
  const movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  const title = document.createElement("h3");
  title.id = "movie-title";
  title.textContent = movie.title;
  const overview = document.createElement("p");
  overview.id = "movie-overview";
  overview.textContent = movie.overview;
  const img = document.createElement("img");
  img.id = "movie-poster";
  if (movie.poster_path) {
    img.src = `${baseImageUrl}${movie.poster_path}`;
  } else {
    const placeholderImg =
      "https://cdn.shopify.com/s/files/1/0079/3287/0756/articles/sad-dog-spot-the-signs-and-cheer-them-up_1200x1200.jpg?v=1620757126";
    img.src = placeholderImg;
  }
  movieCard.append(img, title);

  movieContainer.append(movieCard);
};

const renderMovies = (movies) => {
  // re-renders movies array and sends an error msg if no movies are listed by search
  if (movies.length) {
    movieContainer.innerHTML = "";
    movies.forEach((movie) => {
      renderMovie(movie);
    });
  } else {
    movieContainer.innerHTML = "No movies by that name";
  }
};

const searchHandler = async (e) => {
  // Takes input from user and renders first page
  if (e.target.value) {
    await renderPage(e.target.value, 1);

    //   renderMovies(res.results);
  } else {
    movieContainer.innerHTML = "";
  }
};

searchInput.addEventListener("input", searchHandler);
