// functions
/*
 - fetch the images
 - display the images
 */

//  base url
const BASE_URL = "https://dog.ceo/api/breeds/image/random";

// DOM element
const carouselContainer = document.querySelector(".carousel");
const carouselImages = document.querySelector(".carousel-img");

let images = [];
let index = 0;

// function to fetch the images from api
async function fetchImages(count = 5) {
  try {
    for (let i = 0; i < count; i++) {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      images.push(data.message);
      console.log(images);
      if (i === 0) {
        showImage(0);
      }
    }
  } catch (error) {
    console.log("Error fetching the images", error.message);
  }
}

// function to show image
function showImage(index) {
  carouselImages.innerHTML = "";
  const img = document.createElement("img");
  img.src = images[index];
  img.alt = `Dog-image-${index}`;
  carouselImages.appendChild(img);
}

// event listener using event delegation
carouselContainer.addEventListener("click", (e) => {
  const prevBtn = e.target.closest(".prev-btn");
  const nextBtn = e.target.closest(".next-btn");

  if (prevBtn) {
    index = (index - 1 + images.length) % images.length;
  } else if (nextBtn) {
    index = (index + 1) % images.length;
  }
  showImage(index);
});

fetchImages();

// //  DOM element
// const carouselContainer = document.querySelector(".carousel-img");
// const carouselDiv = document.querySelector(".carousel");

// let images = [];
// let index = 0;

// // function to fetch the images
// async function fetchImages(count = 5) {
//   try {
//     for (let i = 0; i < count; i++) {
//       const res = await fetch(`${BASE_URL}`);
//       const data = await res.json();
//       images.push(data.message);
//       if (i === 0) {
//         showImages(0);
//       }
//     }
//   } catch (error) {
//     console.log("Error fetching images", error.message);
//   }
// }

// // function to display the images
// function showImages(index) {
//   //empty the carousel container
//   carouselContainer.innerHTML = "";
//   const img = document.createElement("img");
//   img.alt = "carousel-image";
//   img.src = images[index];
//   carouselContainer.appendChild(img);
// }

// // event listener using event delegation
// carouselDiv.addEventListener("click", (e) => {
//   const prev = e.target.closest(".prev-btn");
//   const next = e.target.closest(".next-btn");

//   if (!images.length) return;

//   if (prev) {
//     index = (index - 1 + images.length) % images.length;
//   } else if (next) {
//     index = (index + 1) % images.length;
//   }
//   showImages(index);
// });

// // initialize the carousel on page load
// fetchImages(10);
