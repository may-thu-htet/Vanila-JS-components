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
  const addBtn = e.target.closest(".add-btn");

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
  if (addBtn) {
    handleAdd();
  }
});

/**
 * create table head and table body row
 * @param {HTMLElement} headOrBody - The table head (`thead`) or body (`tbody`) element.
 */
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

/**
 * creates table column called "Action"
 * @param {HTMLTableRowElement} tr - Table row element to append the title to.
 * @param {string} title  - The column name.
 */
function createActionTitle(tr, title) {
  const th = document.createElement("th");
  th.textContent = title;
  th.setAttribute("data-table-title", title);
  tr.appendChild(th);
}

// function to create action row
/**
 * creates cell for table column "Action"
 * @param {HTMLTableRowElement} tr - The row to append the action cell to.
 * @param {string[]} keys - The array of table column keys.
 */
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

/**
 * creates a button
 * @param {string} btnName - The name/type of the button (e.g., "edit", "delete").
 * @returns {HTMLButtonElement} The created button.
 */
function createButton(btnName) {
  const button = document.createElement("button");
  button.textContent = btnName[0].toUpperCase() + btnName.slice(1);
  button.className = `btn ${btnName}-btn`;
  return button;
}

// functions for handling clicked events
/**
 * handles edit button click
 * @param {HTMLButtonElement} editBtn - The clicked edit button.
 */
function handleEdit(editBtn) {
  // for showing original text inside the td
  tdToInput(editBtn);

  // switch buttons
  switchButtons(editBtn);
}

// for displying original data but td is changed to input
/**
 *changes all table cell to input fields
 * @param {HTMLButtonElement} editBtn - The clicked edit button.
 */
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
/**
 * switches buttons from edit to save and cancel buttons
 * @param {HTMLButtonElement} editBtn - The clicked edit button.
 */

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
/**
 * handles save button click event
 * @param {HTMLButtonElement} saveBtn - The clicked save button
 */
function handleSave(saveBtn) {
  saveInput(saveBtn);
  showEditButton(saveBtn);
}

// function to save input data and display it in the table
/**
 * saves input data and dislays table cells with new data
 *  @param {HTMLButtonElement} saveBtn - The clicked save button
 */
function saveInput(saveBtn) {
  const tr = saveBtn.closest("tr");
  const tds = tr.querySelectorAll("td");

  for (let i = 0; i < tds.length - 1; i++) {
    const td = tds[i];
    const input = td.querySelector("input");
    if (!input || input.value.trim() === "") {
      alert("Please fill in all the fields before saving!");
      return;
    }
  }

  // If all inputs are valid, update the table cells
  for (let i = 0; i < tds.length - 1; i++) {
    const td = tds[i];
    const input = td.querySelector("input");
    td.textContent = input.value.trim();
    td.removeAttribute("data-original");
  }
}

/**
 * shows edit button back
 * @param {HTMLButtonElement} btn - The clicked button
 */
function showEditButton(btn) {
  const buttonWrapper = btn.closest(".buttons");
  let cancelBtn = buttonWrapper.querySelector(".cancel-btn");
  let editBtn = buttonWrapper.querySelector(".edit-btn");
  let saveBtn = buttonWrapper.querySelector(".save-btn");
  let deleteBtn = buttonWrapper.querySelector(".delete-btn");

  if (!editBtn) {
    editBtn = createButton("edit");
    buttonWrapper.insertBefore(editBtn, saveBtn || cancelBtn);
  } else {
    editBtn.style.display = "";
  }
  if (!deleteBtn) {
    deleteBtn = createButton("delete");
    buttonWrapper.appendChild(deleteBtn);
  }

  saveBtn.remove();
  cancelBtn.remove();
}

// handle cancel => show original value in td and change save/cancel button to edit button
/**
 * handles cancel button click event
 * @param {HTMLButtonElement} cancelBtn - The clicked cancel button
 */
function handleCancel(cancelBtn) {
  const tr = cancelBtn.closest("tr");
  const tds = tr.querySelectorAll("td");

  let isNewRow = true;
  for (let i = 0; i < tds.length - 1; i++) {
    if (tds[i].hasAttribute("data-original")) {
      isNewRow = false;
      break;
    }
  }

  if (isNewRow) {
    tr.remove();
    return;
  }

  for (let i = 0; i < tds.length - 1; i++) {
    const td = tds[i];
    const originalVal = td.dataset.original;
    td.textContent = originalVal;
  }

  showEditButton(cancelBtn);
}

/**
 * deletes row
 * @param {HTMLButtonElement} deleteBtn - The clicked delete button
 */
function handleDelete(deleteBtn) {
  const tr = deleteBtn.closest("tr");
  if (confirm("Are you sure you want to remove the row?")) tr.remove();
}

/**
 * Handles adding a new row to the table with input fields.
 */
function handleAdd() {
  const tr = document.createElement("tr");

  keys.forEach(() => {
    const td = document.createElement("td");
    const input = document.createElement("input");

    input.placeholder = "Enter a value";
    td.appendChild(input);
    tr.appendChild(td);
  });

  // Add action buttons (save & cancel)
  const td = document.createElement("td");
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "buttons";

  buttonWrapper.appendChild(createButton("save"));
  buttonWrapper.appendChild(createButton("cancel"));

  td.appendChild(buttonWrapper);
  tr.appendChild(td);

  // Add row to tbody
  tbody.appendChild(tr);
}
