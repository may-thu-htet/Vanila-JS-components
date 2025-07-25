// DOM elements
const editBtn = document.querySelector(".edit-btn");
const deleteBtn = document.querySelector(".delete-btn");
const tableWrapper = document.querySelector(".table-container");
const tbody = document.querySelector(".tbody");

// event listeners (using event delegation)
document.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-btn");
  const deleteBtn = e.target.closest(".delete-btn");
  const saveBtn = e.target.closest(".save-btn");
  const cancelBtn = e.target.closest(".cancel-btn");
  const addBtn = e.target.closest(".add-btn");

  if (editBtn) {
    handleEdit(editBtn);
  } else if (cancelBtn) {
    handleCancel(cancelBtn);
  } else if (deleteBtn) {
    handleDelete(deleteBtn);
  } else if (saveBtn) {
    handleSave(saveBtn);
  } else if (addBtn) {
    handleAdd(addBtn);
  }
});

// function to create save and cancel button and change all tds into input

function handleEdit(editBtn) {
  // create save and cancel buttons
  const btnWrapper = editBtn.closest(".buttons");
  if (!btnWrapper) return;

  editBtn.style.display = "none";
  const deleteBtn = btnWrapper.querySelector(".delete-btn");

  btnWrapper.insertBefore(createButton("save"), deleteBtn);
  btnWrapper.insertBefore(createButton("cancel"), deleteBtn);

  //   change all tds into inputs
  const tr = editBtn.closest("tr");
  changeInput(tr);
}

// fuction to change td to inputs
function changeInput(tr) {
  const tds = tr.querySelectorAll("td");

  for (let i = 0; i < tds.length - 1; i++) {
    const input = document.createElement("input");
    const td = tds[i];
    const originalValue = td.textContent;
    td.setAttribute("original-data", originalValue);

    input.value = originalValue;
    td.textContent = "";
    td.appendChild(input);
  }
}

// function to create button
function createButton(btnName) {
  const button = document.createElement("button");
  button.textContent = btnName.charAt(0).toUpperCase() + btnName.slice(1);
  button.className = `btn ${btnName}-btn`;
  return button;
}

// fuctions for save, cancel and delete buttons event listener

function handleSave(saveBtn) {
  const tr = saveBtn.closest("tr");
  const tds = tr.querySelectorAll("td");

  for (let i = 0; i < tds.length - 1; i++) {
    const td = tds[i];
    console.log({ td });
    const input = td.querySelector("input");
    const newValue = input.value;
    console.log({ newValue });

    td.textContent = newValue;
    td.removeAttribute("original-data");
  }
  removeSaveCancelBtn(saveBtn);
}

function handleCancel(cancelBtn) {
  const tr = cancelBtn.closest("tr");
  const tds = tr.querySelectorAll("td");

  // Check if this is a new row with no "original-data"
  let isNewRow = true;
  for (let i = 0; i < tds.length - 1; i++) {
    if (tds[i].hasAttribute("original-data")) {
      isNewRow = false;
      break;
    }
  }

  if (isNewRow) {
    tr.remove(); // remove the entire new row
    return;
  }

  // Otherwise revert to original data
  for (let i = 0; i < tds.length - 1; i++) {
    const td = tds[i];
    const originalValue = td.getAttribute("original-data");
    td.textContent = originalValue;
  }
  removeSaveCancelBtn(cancelBtn);
}

// function to change back to edit-button
function removeSaveCancelBtn(btn) {
  // const saveOrCancel = btn.textContent == "Save" ? "save-btn" : "delete-btn";
  const btnWrapper = btn.closest(".buttons");
  const editBtn = btnWrapper.querySelector(".edit-btn");
  const saveBtn = btnWrapper.querySelector(".save-btn");
  const cancelBtn = btnWrapper.querySelector(".cancel-btn");
  editBtn.style.display = "";
  saveBtn.remove();
  cancelBtn.remove();
}

// function to handle delete event
function handleDelete(deleteBtn) {
  const tr = deleteBtn.closest("tr");
  if (confirm("Are you sure you want to delete the row?")) tr.remove();
}

// create a new button and add it to the tbody
tableWrapper.appendChild(createButton("add"));

// function to add a addNewRow button
function handleAdd() {
  const tr = document.createElement("tr");
  tr.className = "row";
  const noOfCol = document
    .querySelector(".thead")
    .querySelector("tr")
    .querySelectorAll("th").length;
  console.log(noOfCol);

  for (let i = 0; i < noOfCol - 1; i++) {
    const td = document.createElement("td");
    const input = document.createElement("input");
    if (i === 2) {
      td.className = "price";
    }

    input.placeholder = "Enter a value";
    td.appendChild(input);
    tr.appendChild(td);
  }
  const td = document.createElement("td");
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "buttons";

  const editBtn = createButton("edit");
  editBtn.style.display = "none";

  buttonWrapper.appendChild(editBtn);
  buttonWrapper.appendChild(createButton("save"));
  buttonWrapper.appendChild(createButton("cancel"));
  buttonWrapper.appendChild(createButton("delete"));
  td.appendChild(buttonWrapper);
  tr.appendChild(td);
  tbody.appendChild(tr);
}
