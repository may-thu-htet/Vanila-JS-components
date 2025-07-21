import users from "./users.js";

// DOM element
const theadRow = document.querySelector(".thead-row");
const tbody = document.querySelector(".tbody");
const userSelection = document.getElementById("pages");
const nextBtn = document.getElementById("next");
const preBtn = document.getElementById("pre");
const paginationDes = document.getElementById("pagination-description");

// State variables
let currentPage = 1;
let noOfRows = 5;
let totalPages = Math.ceil(users.length / noOfRows);

// displaying table header
function showHeader(users) {
  theadRow.innerHTML = "";
  Object.keys(users[0]).forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key;
    theadRow.appendChild(th);
  });
}

// calling function
showHeader(users);

// displaying table body
function showBody(users, currentPage, noOfRows) {
  tbody.innerHTML = "";
  // calculate the total pages
  totalPages = Math.ceil(users.length / noOfRows);

  paginationDes.textContent = `Page ${currentPage} of ${totalPages}`;

  // indices for finding user-selected option
  const startIndex = (currentPage - 1) * noOfRows;
  const endIndex = startIndex + noOfRows;

  // users depending on drop-down menu that has been selected
  let paginatedUsers = users.slice(startIndex, endIndex);
  // create element for paginatedUsers
  paginatedUsers.forEach((user) => {
    const tr = document.createElement("tr");

    Object.values(user).forEach((val) => {
      const td = document.createElement("td");
      td.textContent = val;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    // displaying the current no of page
  });
  paginationDes.textContent = `Page ${currentPage} of ${totalPages}`;
}

// function call
showBody(users, currentPage, noOfRows);

// when user select different option from dropdown menu
userSelection.addEventListener("change", (e) => {
  currentPage = 1;
  noOfRows = parseInt(e.target.value.split("-")[0]);
  showBody(users, currentPage, noOfRows);
  paginationDes.textContent = `Page ${currentPage} of ${totalPages}`;
});

// when user clicked next button
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    preBtn.removeAttribute("disabled");
    showBody(users, currentPage, noOfRows);
  }
  if (currentPage === totalPages) {
    nextBtn.setAttribute("disabled", true);
  }
  paginationDes.textContent = `Page ${currentPage} of ${totalPages}`;
});

// when user clicked prev button
preBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    nextBtn.removeAttribute("disabled");
    showBody(users, currentPage, noOfRows);
  }
  if (currentPage === 1) {
    preBtn.setAttribute("disabled", true);
  }
  paginationDes.textContent = `Page ${currentPage} of ${totalPages}`;
});
