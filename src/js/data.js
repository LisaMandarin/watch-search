import ShowDetail from "./card.js";

// ----------api information----------

const baseURL = "https://streaming-availability.p.rapidapi.com/";
const apiKEY = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKEY,
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};
// ----------end of api information----------

// ----------execute search----------

async function performSearch() {
  // Clear existing results before fetching new ones
  clearResult();

  //set loading preview
  const loading = document.createElement("div");
  loading.textContent = "Loading, please wait...";
  loading.classList.add("loading");
  const mainElem = document.querySelector("main");
  mainElem.appendChild(loading);

  const title = document.querySelector("#search-bar").value;
  const country = document.querySelector("#select-country").value;
  const show_type = document.querySelector("#select-show_type").value;
  const output_language = "en";
  const fullURL = `${baseURL}search/title?title=${encodeURIComponent(title)}&country=${country}&show_type=${show_type}&output_language=${output_language}`;

  try {
    const response = await fetch(fullURL, options);
    if (!response.ok) throw new Error("Network response was not ok.");
    const results = await response.json();

    loading.remove();
    if (results.result.length === 0) {
      const errorMsg = "No result!";
      const errorMsgElem = document.createElement("div");
      errorMsgElem.textContent = errorMsg;
      errorMsgElem.classList.add("cardContainer");
      mainElem.appendChild(errorMsgElem);
    } else if (Array.isArray(results.result)) {
      results.result.forEach((result) => {
        new ShowDetail(result).init();
      });
    } else {
      console.error("Expected results.result to be an array.");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

document
  .querySelector(".search-button")
  .addEventListener("click", performSearch);

document
  .querySelector("#search-bar")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

// ----------end of execute search----------

// ----------clear result----------

function clearResult() {
  const mainElem = document.querySelector("main");
  mainElem.innerHTML = "";
}

// ----------end of clear result----------

// ----------search button animation----------
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", () => {
  // Remove the class if it's already applied to ensure the animation can restart
  searchButton.classList.remove("rubberBand");

  // Force a reflow to ensure the class removal is processed
  void searchButton.offsetWidth;

  //Re-apply the class to trigger the animation
  searchButton.classList.add("rubberBand");
});

searchButton.addEventListener("animationend", () => {
  searchButton.classList.remove("rubberBand");
});

// ----------end of search button animation----------
