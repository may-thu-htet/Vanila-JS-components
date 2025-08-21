const EMAIL_REGEX = /^\w+@\w+\.\w+$/;
const NAME_REGEX = /^\w{2,}$/; // Use for first and last name

// DOM elements

const thead = document.querySelector(".thead");
const tbody = document.querySelector(".tbody");

// form event handler
document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  addRow();
});

// table body event listeners
tbody.addEventListener("click", (e) => {
  const moveUpBtn = e.target.closest(".move-up-btn");
  const moveDownBtn = e.target.closest(".move-down-btn");
  const deleteBtn = e.target.closest(".delete-btn");

  if (moveUpBtn) {
    handleMoveUp(moveUpBtn);
  } else if (moveDownBtn) {
    handleMoveDown(moveDownBtn);
  } else {
    handleDelete(deleteBtn);
  }
});

/**
 * Handles adding new row after validating the form inputs
 * @returns {boolean} return false if validation fails, undefined otherwise
 */

function addRow() {
  // DOM element
  const form = document.forms[0];
  const email = form?.email?.value.trim() ?? "";
  const first = form?.first?.value.trim() ?? "";
  const last = form?.last?.value.trim() ?? "";
  const errorMessage = document.querySelector(".error-message");

  // clearing the existing error
  errorMessage.innerHTML = "";

  // input validation
  if (email && !EMAIL_REGEX.test(email)) {
    errorMessage.innerHTML = "Invalid Email!";
    return false;
  }
  if (first && !NAME_REGEX.test(first)) {
    errorMessage.innerHTML = "Invalid First Name!";
    return false;
  }
  if (last && !NAME_REGEX.test(last)) {
    errorMessage.innerHTML = "Invalid Last Name!";
    return false;
  }

  //   add new row to the table
  const tr = document.createElement("tr");
  tr.className = "table-row";
  tr.innerHTML = `
    <td>${email}</td>
    <td>${first}</td>
    <td>${last}</td>
    <td>
    <button class="btn move-up-btn">Move up</button>
    <button class="btn move-down-btn">Move down</button>
    <button class="btn delete-btn">Delete</button>
    </td>
    `;

  tbody.appendChild(tr);
  updateStates();
  form.reset();
}

// update the state of move up/down buttons
function updateStates() {
  // takes all rows from the table body
  const rows = document.querySelector(".tbody").querySelectorAll("tr");

  // for each row, update the button state depending on row index
  rows.forEach((row, index) => {
    const upBtn = row.querySelector(".move-up-btn");
    const downBtn = row.querySelector(".move-down-btn");

    upBtn.disabled = index === 0;
    downBtn.disabled = index === rows.length - 1;
  });
}

// function to handle move up button
function handleMoveUp(moveUpBtn) {
  if (moveUpBtn.disabled) return;
  const row = moveUpBtn.closest("tr");
  const prevRow = row.previousElementSibling;
  if (prevRow) {
    row.parentNode.insertBefore(row, prevRow);
    updateStates();
  }
}

// function to handle move down button
function handleMoveDown(moveDownBtn) {
  if (moveDownBtn.disabled) return;
  const row = moveDownBtn.closest("tr");
  const nextRow = row.nextElementSibling;
  if (nextRow) {
    row.parentNode.insertBefore(nextRow, row);
    updateStates();
  }
}

// function to handle delete
function handleDelete(deleteBtn) {
  const rowToDelete = deleteBtn.closest("tr");
  if (confirm("Are you sure you want to delete this row?")) {
    rowToDelete.remove();
    updateStates();
  }
}
