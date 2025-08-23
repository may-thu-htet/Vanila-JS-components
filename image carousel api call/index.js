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
let currentIndex = 0;
let autoSlidingInterval;

// Scalability
/*
JS file 1
Fetching images from api
 1. Fetch a single image
 2. Fetch multiple images (reuse no.1)
 
 Render images
 1. Render image at url
 2. Show image at(reuse no 1)
 3. Show next image(reuse no 2)
 4. Show prev image(reuse no 2)

 Auto slide
 1. startAutoSlide
 2. stopAutoSlide

 Initialize the carousel
 1. Fetch the data
 2. Show the first image
 3. Start auto slide

 JS file 2
 1. Use functions from JS file 1
 2. Initialize the init function
 3. Add event delegation

 */

// function to show the images
function showImage(currentIndex) {
  // clear the existing image
  carouselImages.innerHTML = "";
  // create a new image element
  const img = document.createElement("img");
  img.src = images[currentIndex];
  img.alt = `Dog-image-${currentIndex + 1}`;
  carouselImages.appendChild(img);
}

// function to fetch the images
async function fetchImages(count = 5) {
  try {
    for (let i = 0; i < count; i++) {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      images.push(data.message);
      if (i === 0) {
        showImage(0);
      }
      startAutoSlide();
    }
  } catch (error) {
    console.log("Error fetching images!", error.message);
  }
}

// functin to start showing images auto
function startAutoSlide(interval = 3000) {
  // stop the existing interval
  stopAutoSlide();
  autoSlidingInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, interval);
}

// function to stop auto image
function stopAutoSlide() {
  if (autoSlidingInterval) {
    clearInterval(autoSlidingInterval);
    autoSlidingInterval = null;
  }
}

// event listeners
carouselContainer.addEventListener("click", (e) => {
  const nextBtn = e.target.closest(".next-btn");
  const prevBtn = e.target.closest(".prev-btn");

  if (nextBtn) {
    currentIndex = (currentIndex + 1) % images.length;
  } else if (prevBtn) {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
  stopAutoSlide();
  showImage(currentIndex);
  startAutoSlide();
});

fetchImages();

/*
let images = [];
let index = 0;
let autoSlideInterval;

// function to fetch the images from api
async function fetchImages(count = 5) {
  try {
    for (let i = 0; i < count; i++) {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      images.push(data.message);
      if (i === 0) {
        showImage(0);
      }
      autoSlide(); // show auto sliding
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

//function to do auto slide
function autoSlide(interval = 3000) {
  stopAutoSlide(); // stop the auto sliding

  autoSlideInterval = setInterval(() => {
    if (!images.length) return;
    index = (index + 1) % images.length;
    showImage(index);
  }, interval);
}

//function to stop auto slide
function stopAutoSlide() {
  if (!autoSlideInterval) return;
  clearInterval(autoSlideInterval);
  autoSlideInterval = null;
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

  stopAutoSlide();
  showImage(index);
  autoSlide();
});

fetchImages();
*/

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
