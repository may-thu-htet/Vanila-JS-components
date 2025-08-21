// DoM element
const dropDownBtn = document.querySelector(".drop-down-btn");
const dropDownContent = document.querySelector(".drop-down-content");

// event listener for button
dropDownBtn.addEventListener("click", handleMenu);

// function for handling toggle drop down
function handleMenu() {
  dropDownContent.classList.toggle("show");
}
