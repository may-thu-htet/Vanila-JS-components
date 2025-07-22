import { users, getData } from "./usersFromApi.js";
import { devices, getDeviceData } from "./objectsFromApi.js";
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
let activeDataSet = "users";

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
  await getDeviceData();

  // Choose which dataset to render depending on current HTML/page
  // You can do this based on a class name, body ID, or a hidden field
  if (document.body.classList.contains("user-page")) {
    activeDataSet = "users";
    renderTableHeader(thead, users);
  } else {
    activeDataSet = "devices";
    renderTableHeader(thead, devices);
  }
  handlePageNumbers();
  updateButtonStates();
}

export function handlePageNumbers() {
  const dataSource = activeDataSet == "users" ? users : devices;
  totalPages = Math.ceil(dataSource.length / noOfRows);
  renderTableBody(tbody, dataSource, currentPage, noOfRows);
  paginationDes.textContent = `Page ${currentPage} of ${totalPages}`;
}
