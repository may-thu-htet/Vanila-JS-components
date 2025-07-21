import { users, getData } from "./usersFromApi.js";
import { renderTableBody, renderTableHeader } from "./renderTable.js";

// DOM elements
const thead = document.querySelector(".tableHead");
const tbody = document.querySelector(".tableBody");
const paginationDes = document.getElementById("pagi-des");
const userSelection = document.getElementById("pages");
const prevBtn = document.querySelector(".pre");
const nextBtn = document.querySelector(".next");

// state variables
let currentPage = 1;
let noOfRows = 5;
let totalPages = 1;

// call function
init();

// event listeners
userSelection.addEventListener("change", (e) => {
  currentPage = 1;
  noOfRows = parseInt(e.target.value.split("-")[0]);
  handlePageNumbers();
  updateButtonStates();
});

// function to update button states
function updateButtonStates() {
  prevBtn.disabled = currentPage == 1;
  nextBtn.disabled = currentPage == totalPages;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    handlePageNumbers();
    updateButtonStates();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    handlePageNumbers();
    updateButtonStates();
  }
});

// init function
async function init() {
  await getData();
  renderTableHeader(thead, users);
  handlePageNumbers();
  updateButtonStates();
}

function handlePageNumbers() {
  totalPages = Math.ceil(users.length / noOfRows);
  renderTableBody(tbody, users, currentPage, noOfRows);
  paginationDes.textContent = `Page ${currentPage} of ${totalPages}`;
}
