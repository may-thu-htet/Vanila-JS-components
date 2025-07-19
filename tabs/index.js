import "./styles.css";

// get the elements from DOM
let htmlButton = document.querySelector(".html");
let cssButton = document.querySelector(".css");
let jsButton = document.querySelector(".js");
let buttons = document.querySelectorAll(".tab-button");

// function to show the relevant content
function showContent(e) {
  // to hide all the content, resetting the button color
  buttons.forEach((button) => {
    button.style.backgroundColor = "";
  });
  document.querySelector(".html-text").hidden = true;
  document.querySelector(".css-text").hidden = true;
  document.querySelector(".js-text").hidden = true;

  // change bgcolor to blue
  e.target.style.backgroundColor = "blue";
  if (e.target === htmlButton) {
    document.querySelector(".html-text").hidden = false;
  } else if (e.target === cssButton) {
    document.querySelector(".css-text").hidden = false;
  } else if (e.target === jsButton) {
    let content = (document.querySelector(".js-text").hidden = false);
  }
}
// onclick event
buttons.forEach((button) => {
  button.addEventListener("click", showContent);
});
