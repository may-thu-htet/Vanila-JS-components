import users from "./users.js";

// get element from DOM
const theadRow = document.querySelector(".thead-row");
const tbody = document.querySelector(".tbody");
const userSelection = document.getElementById("pages");
const paginationDes = document.getElementById("pagination-description");
const preBtn = document.getElementById("pre");
const nextBtn = document.getElementById("next");

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

// function call
displayThead(users);

// displaying table body from users data
function displayTbody(users) {
  // clear anything if existed before
  tbody.innerHTML = "";
  users.forEach((user) => {
    let tr = document.createElement("tr");

    Object.values(user).forEach((value) => {
      let td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

displayTbody(users);
