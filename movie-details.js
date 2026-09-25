
const movieDetail = document.querySelector("#movie-detail");
const params = new URLSearchParams(location.search);
const imdbID = params.get("id");


if (imdbID) {
  searchMovie(imdbID.trim());
}

async function searchMovie(imdbID) {
  let response = await fetch(
    `http://www.omdbapi.com/?apikey=12c3237a&i=${imdbID}&plot=full`,
  );
  let data = await response.json();

  console.log(data);

  if (data.Response === "True") {
    displayMovie(data);
  } else {
    movieDetail.innerHTML = `
            <p class="text-center text-red-400 text-xl">
                ${data.Error}
            </p>
        `;
  }
}

function displayMovie(data) {
  movieDetail.innerHTML = `

        <div
            class="grid
            grid-cols-1
            md:grid-cols-[300px_1fr]
            gap-10
            items-start"
        >


            <!-- Poster -->

            <div>

                <img
                    src="${data.Poster}"
                    alt="${data.Title}"
                    class="w-full
                    max-w-[320px]
                    mx-auto
                    rounded-xl
                    shadow-2xl
                    shadow-red-950
                    border
                    border-red-900"
                >

            </div>


            <!-- Information -->

            <div>

                <h2
                    class="text-4xl
                    md:text-6xl
                    font-black
                    leading-tight"
                >
                    ${data.Title}
                </h2>


                <!-- Movie information -->

                <div class="flex flex-wrap gap-3 mt-6">

                    <span class="px-4 py-2 rounded-full border border-green-400/50 text-green-400">
                        ${data.Released}
                    </span>

                    <span class="px-4 py-2 rounded-full border border-green-400/50 text-green-400">
                        ${data.Rated}
                    </span>

                    <span class="px-4 py-2 rounded-full border border-green-400/50 text-green-400">
                        ${data.Runtime}
                    </span>

                    <span class="px-4 py-2 rounded-full border border-green-400/50 text-green-400">
                        ${data.Genre}
                    </span>

                    <span class="px-4 py-2 rounded-full bg-yellow-400 text-black font-bold">
                        IMDb ${data.imdbRating}/10
                    </span>

                </div>


                <!-- Plot -->

                <div class="mt-8">

                    <h3
                        class="text-red-500
                        font-bold
                        text-sm
                        tracking-[3px]
                        uppercase"
                    >
                        Plot Overview
                    </h3>

                    <p
                        class="mt-3
                        text-gray-300
                        leading-8
                        max-w-3xl"
                    >
                        ${data.Plot}
                    </p>

                </div>


                <!-- Director / Writer -->

                <div
                    class="grid
                    sm:grid-cols-2
                    gap-6
                    mt-8"
                >

                    <div>

                        <p class="text-red-500 text-xs tracking-[2px] uppercase font-bold">
                            Director
                        </p>

                        <p class="mt-2">
                            ${data.Director}
                        </p>

                    </div>


                    <div>

                        <p class="text-red-500 text-xs tracking-[2px] uppercase font-bold">
                            Writer
                        </p>

                        <p class="mt-2">
                            ${data.Writer}
                        </p>

                    </div>

                </div>


                <!-- Actors -->

                <div class="mt-7">

                    <p class="text-red-500 text-xs tracking-[2px] uppercase font-bold">
                        Actors
                    </p>

                    <p class="mt-2 text-gray-300">
                        ${data.Actors}
                    </p>

                </div>


                <!-- Language / Country -->

                <div
                    class="grid
                    sm:grid-cols-2
                    gap-6
                    mt-7"
                >

                    <div>

                        <p class="text-red-500 text-xs tracking-[2px] uppercase font-bold">
                            Language
                        </p>

                        <p class="mt-2">
                            ${data.Language}
                        </p>

                    </div>


                    <div>

                        <p class="text-red-500 text-xs tracking-[2px] uppercase font-bold">
                            Country
                        </p>

                        <p class="mt-2">
                            ${data.Country}
                        </p>

                    </div>

                </div>


                <!-- IMDb Button -->

                <a
                    href="https://www.imdb.com/title/${data.imdbID}"
                    target="_blank"
                    class="inline-block
                    mt-10
                    px-7
                    py-4
                    rounded-lg
                    bg-yellow-400
                    text-black
                    font-bold
                    hover:bg-yellow-300
                    hover:-translate-y-1
                    transition"
                >
                    View on IMDb
                </a>

            </div>

        </div>

    `
}
