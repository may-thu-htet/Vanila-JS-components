export function renderTableHeader(thead, users) {
  thead.innerHTML = "";
  let tr = document.createElement("tr");

  Object.keys(users[0]).forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key[0].toUpperCase() + key.slice(1);
    tr.appendChild(th);
  });
  thead.appendChild(tr);
}

export function renderTableBody(tbody, users, currentPage, noOfRows) {
  tbody.innerHTML = "";

  //   let totalPages = Math.ceil(users.length/noOfRows);
  const startIndex = (currentPage - 1) * noOfRows;
  const endIndex = startIndex + noOfRows;
  const usersBySelectedMenu = users.slice(startIndex, endIndex);

  usersBySelectedMenu.forEach((user) => {
    let tr = document.createElement("tr");

    Object.values(user).forEach((value) => {
      let td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}
