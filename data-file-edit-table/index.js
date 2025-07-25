import users from "./data.js";
// DOM elements
const thead = document.querySelector(".thead");
const tbody = document.querySelector(".tbody");
const tableContainer = document.querySelector(".table-container");
const keys = Object.keys(users[0]);

// displaying table
createRow(thead);
createRow(tbody);

// event listeners for all buttons
tableContainer.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-btn");
  const deleteBtn = e.target.closest(".delete-btn");
  const saveBtn = e.target.closest(".save-btn");
  const cancelBtn = e.target.closest(".cancel-btn");

  if (editBtn) {
    handleEdit(editBtn);
  }
  if (deleteBtn) {
    handleDelete(deleteBtn);
  }
  if (saveBtn) {
    handleSave(saveBtn);
  }
  if (cancelBtn) {
    handleCancel(cancelBtn);
  }
});

// function to create row
function createRow(headOrBody) {
  // create tr and td or th element

  if (headOrBody === thead) {
    const tr = document.createElement("tr");
    keys.forEach((key) => {
      const th = document.createElement("th");
      th.textContent = key[0].toUpperCase() + key.slice(1);
      th.setAttribute("data-table-title", key);
      tr.appendChild(th);
    });
    headOrBody.appendChild(tr);
    // for creating action title
    createActionTitle(tr, "Action");
  } else if (headOrBody === tbody) {
    users.forEach((user) => {
      const tr = document.createElement("tr");

      Object.entries(user).forEach(([key, value]) => {
        const td = document.createElement("td");
        td.textContent = value;
        td.setAttribute("data-key", key);
        tr.appendChild(td);
      });
      // for creating action cell
      createActionCell(tr, keys);
      headOrBody.appendChild(tr);
    });
  }
}

// function for action title
function createActionTitle(tr, title) {
  const th = document.createElement("th");
  th.textContent = title;
  th.setAttribute("data-table-title", title);
  tr.appendChild(th);
}

// function to create action row
function createActionCell(tr, keys) {
  const td = document.createElement("td");
  td.setAttribute("data-key", keys.length + 1);

  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "buttons";

  buttonWrapper.appendChild(createButton("edit"));
  buttonWrapper.appendChild(createButton("delete"));

  td.appendChild(buttonWrapper);
  tr.appendChild(td);
}

// function for creating buttons
function createButton(btnName) {
  const button = document.createElement("button");
  button.textContent = btnName[0].toUpperCase() + btnName.slice(1);
  button.className = `btn ${btnName}-btn`;
  return button;
}

// functions for handling clicked events
function handleEdit(editBtn) {
  // for showing original text inside the td
  tdToInput(editBtn);

  // switch buttons
  switchButtons(editBtn);
}

// for displying original data but td is changed to input
function tdToInput(editBtn) {
  const tr = editBtn.closest("tr");
  const tds = tr.querySelectorAll("td");

  // for showing original text inside the td
  for (let i = 0; i < tds.length - 1; i++) {
    const input = document.createElement("input");
    const td = tds[i];
    const originalValue = td.textContent;
    td.setAttribute("data-original", originalValue);
    input.value = originalValue;
    td.textContent = "";
    td.appendChild(input);
  }
}

// for changing edit button to save/cancel button
function switchButtons(editBtn) {
  const buttonWrapper = editBtn.closest(".buttons");
  if (!buttonWrapper) return;

  const deleteBtn = buttonWrapper.querySelector(".delete-btn");
  editBtn.style.display = "none";

  if (!deleteBtn) {
    buttonWrapper.appendChild(createButton("save"));
    buttonWrapper.appendChild(createButton("cancel"));
  } else {
    buttonWrapper.insertBefore(createButton("save"), deleteBtn);
    buttonWrapper.insertBefore(createButton("cancel"), deleteBtn);
  }
}

// to handle the save click event
function handleSave(saveBtn) {
  saveInput(saveBtn);
  showEditButton(saveBtn);
}

// function to save input data and display it in the table
function saveInput(saveBtn) {
  const tr = saveBtn.closest("tr");
  const tds = tr.querySelectorAll("td");

  for (let i = 0; i < tds.length - 1; i++) {
    const td = tds[i];
    const input = td.querySelector("input");
    td.textContent = input.value;
    td.removeAttribute("data-original");
  }
}

function showEditButton(btn) {
  const buttonWrapper = btn.closest(".buttons");
  const cancelBtn = buttonWrapper.querySelector(".cancel-btn");
  const editBtn = buttonWrapper.querySelector(".edit-btn");
  const saveBtn = buttonWrapper.querySelector(".save-btn");
  editBtn.style.display = "";
  saveBtn.remove();
  cancelBtn.remove();
}

// handle cancel => show original value in td and change save/cancel button to edit button
function handleCancel(cancelBtn) {
  const tr = cancelBtn.closest("tr");
  const tds = tr.querySelectorAll("td");

  for (let i = 0; i < tds.length - 1; i++) {
    const td = tds[i];
    const originalVal = td.dataset.original;
    td.textContent = originalVal;
  }
  showEditButton(cancelBtn);
}

function handleDelete(deleteBtn) {
  const tr = deleteBtn.closest("tr");
  if (confirm("Are you sure you want to remove the row?")) tr.remove();
}
