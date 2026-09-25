
const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");

movieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let query = movieInput.value.trim();

  if (!query) {
    return;
  }

  console.log(query);
  searchMovies(query);
});

async function searchMovies(movieName) {
  movieHub.innerHTML = `<p class="col-span-full text-center text-green-400 text-xl">
    Searching movie....
    </p>`;

  let response = await fetch(
    `https://www.omdbapi.com/?apikey=12c3237a&s=${encodeURIComponent(movieName)}`,
  );

  let data = await response.json();
  console.log(data);

  if (data.Response === "True") {
    displayMovie(data.Search);
  } else {
    movieHub.innerHTML = `<p class="col-span-full text-center text-red-500 text-xl">
        Movie not found!
        </p>`;
  }
}

function displayMovie(data) {
  movieHub.innerHTML = "";

  data.forEach((movie) => {
    const div = document.createElement("div");

    div.dataset.imdbID = movie.imdbID;

    div.className = `
            movie-card
            group
            overflow-hidden
            rounded-xl
            bg-zinc-900/90
            border
            border-red-900/60
            cursor-pointer
            transition
            duration-300
            hover:-translate-y-2
            hover:border-green-400
            hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)]
        `

    div.innerHTML = 
           `<div class="overflow-hidden">

                <img
                    src="${movie.Poster}"
                    alt="${movie.Title}"
                    class="w-full
                    h-64
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105"
                >

            </div>


            <div class="p-4">

                <h2
                    class="text-lg
                    font-bold
                    text-white
                    truncate"
                >
                    ${movie.Title}
                </h2>

                <p
                    class="mt-2
                    text-sm
                    text-green-400"
                >
                    ${movie.Year}
                </p>

            </div>

        `;

    movieHub.append(div);
  });
}

movieHub.addEventListener("click", (e) => {
  e.stopPropagation();

  const movieCard = e.target.closest(".movie-card");

  const imdbID = movieCard.dataset.imdbID;
  location.href = `movie-details.html?id=${imdbID}`;
});
