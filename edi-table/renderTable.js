export function renderTableHeader(thead, users) {
  thead.innerHTML = "";
  let tr = document.createElement("tr");

  Object.keys(users[0]).forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key[0].toUpperCase() + key.slice(1);
    tr.appendChild(th);
  });
  const editDelete = document.createElement("th");
  editDelete.textContent = "Edit/Delete";
  tr.appendChild(editDelete);
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

    const actionTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit-button");
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute = ("class", "delete-button");

    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "buttons";
    buttonWrapper.appendChild(deleteBtn);
    buttonWrapper.appendChild(editBtn);

    actionTd.appendChild(buttonWrapper);
    tr.appendChild(actionTd);
    tbody.appendChild(tr);
  });
}
