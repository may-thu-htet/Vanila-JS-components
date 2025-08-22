// functions
/*
 - fetch the images
 - display the images
 */

//  base url
const BASE_URL = "https://dog.ceo/api/breeds/image/random";

//  DOM element
const carouselContainer = document.querySelector(".carousel-img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const carouselDiv = document.querySelector(".carousel");

let images = [];
let index = 0;

// function to fetch the images
async function fetchImages(count = 5) {
  const promises = [];
  for (let i = 0; i < count; i++) {
    promises.push(
      fetch(`${BASE_URL}`)
        .then((res) => res.json())
        .then((data) => data.message)
    );
  }
  try {
    images = await Promise.all(promises);
    console.log(images);
    // to show the initial image
    showImages(0);
  } catch (error) {
    console.log("Error fetching images", error.message);
  }
}

// function to display the images
function showImages(index) {
  //empty the carousel container
  carouselContainer.innerHTML = "";
  const img = document.createElement("img");
  img.alt = "carousel-image";
  img.src = images[index];
  carouselContainer.appendChild(img);
}

// event listener using event delegation
carouselDiv.addEventListener("click", (e) => {
  const prev = e.target.closest(".prev-btn");
  const next = e.target.closest(".next-btn");

  if (!images.length) return;

  if (prev) {
    index = (index - 1 + images.length) % images.length;
    showImages(index);
  } else if (next) {
    index = (index + 1) % images.length;
    showImages(index);
  }
});

// initialize the carousel on page load
fetchImages();
