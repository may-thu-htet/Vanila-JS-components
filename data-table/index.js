import users from "./users.js";

// get element from DOM
const theadRow = document.querySelector(".thead-row");
const tbody = document.querySelector(".tbody");
const userSelection = document.getElementById("pages");
const paginationDes = document.getElementById("pagination-description");
const preBtn = document.getElementById("pre");
const nextBtn = document.getElementById("next");

// initial rows per page
let currentPage = 1;
let rowsPerPage = 5;
let totalPages = Math.ceil(users.length / rowsPerPage);

// displaying table head from users data
function displayThead(users) {
  // clear anything if existed before
  theadRow.innerHTML = "";
  //   tbody.innerHTML = "";
  Object.keys(users[0]).forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key;
    theadRow.appendChild(th);
  });
}

// displaying table body from users data
function displayTbody(users, currentPage, rowsPerPage) {
  // clear anything if existed before
  tbody.innerHTML = "";

  //   update the total page depending on the user data
  totalPages = Math.ceil(users.length / rowsPerPage);

  // calculate start and end index
  let startIndex = (currentPage - 1) * rowsPerPage;
  let endIndex = startIndex + rowsPerPage;

  // slice the user array only to show the required rows
  const paginatedUsers = users.slice(startIndex, endIndex);

  paginatedUsers.forEach((user) => {
    let tr = document.createElement("tr");

    Object.values(user).forEach((value) => {
      let td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  paginationDes.textContent = `Page ${currentPage} of ${totalPages}`;
}

// function call
displayThead(users);
displayTbody(users, currentPage, rowsPerPage);

// get info from user
userSelection.addEventListener("change", (e) => {
  rowsPerPage = parseInt(e.target.value.split("-")[0]);
  currentPage = 1;
  displayTbody(users, currentPage, rowsPerPage);
});

// next button
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayTbody(users, currentPage, rowsPerPage);
    paginationDes.textContent = `Page ${currentPage} of ${totalPages}`;
  }
});

// prev button
preBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayTbody(users, currentPage, rowsPerPage);
    paginationDes.textContent = `Page ${currentPage} of ${totalPages}`;
  }
});
