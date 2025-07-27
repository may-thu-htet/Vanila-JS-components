// Don't worry about changing these regular expressions
const EMAIL_REGEX = /^\w+@\w+\.\w+$/;
const NAME_REGEX = /^\w{2,}$/; // Use for first and last name

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  handleAdd();
});

// DOM elements
const tbody = document.querySelector(".tbody");
const thead = document.querySelector(".thead");
const headerRow = thead.querySelector("tr");

/**
 * Event delegation pattern used for handling all button clicks within the table body.
 * Instead of attaching individual event listeners to each button, we listen for events
 * at the tbody level and then determine which button was clicked.
 *
 * Design Decision:
 * 1. Performance: Only one event listener is needed instead of many
 * 2. Dynamic content: Automatically works for buttons added later (like when new rows are
 *    added via the form)
 * 3. Memory efficiency: No need to manage event listeners when rows are added/removed
 * 4. Simplified initialization: Don't need to set up listeners when creating new rows
 */
tbody.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const moveUpBtn = e.target.closest(".move-up-btn");
  const moveDownBtn = e.target.closest(".move-down-btn");
  if (deleteBtn) {
    handleDelete(deleteBtn);
  }
  if (moveUpBtn) {
    handleMoveUp(moveUpBtn);
  }
  if (moveDownBtn) {
    handleMoveDown(moveDownBtn);
  }
});

/**
 * Handles deletion of a table row after user confirmation
 * @param {HTMLButtonElement} deleteBtn - The delete button that was clicked
 * @returns {void}
 */
function handleDelete(deleteBtn) {
  const tr = deleteBtn.closest("tr");

  if (confirm("Are you sure you want to delete this row?")) {
    tr.remove();
    updateBtnStates();
  }
}

/**
 * Handles adding a new row to the table after validating form inputs
 * @returns {boolean} Returns false if validation fails, otherwise undefined
 */
function handleAdd() {
  const form = document.forms[0];
  const email = form.email.value.trim();
  const first = form.first.value.trim();
  const last = form.last.value.trim();
  const errorSpan = document.querySelector(".error-message");

  errorSpan.innerHTML = "";

  if (email && !EMAIL_REGEX.test(email)) {
    errorSpan.innerHTML = "Invalid email.";
    return false; // do nothing for valid inputs
  }

  if (first && !NAME_REGEX.test(first)) {
    errorSpan.innerHTML = "Invalid first name.";
    return false; // do nothing for valid inputs
  }

  if (last && !NAME_REGEX.test(last)) {
    errorSpan.innerHTML = "Invalid last name.";
    return false; // do nothing for valid inputs
  }
  // Create row and cells
  const tr = document.createElement("tr");
  tr.className = "table-row";

  tr.innerHTML = `
    <td>${email}</td>
    <td>${first}</td>
    <td>${last}</td>
    <td>
      <button class="btn move-up-btn">Move Up</button>
      <button class="btn move-down-btn">Move Down</button>
      <button class="btn delete-btn">Delete</button>
    </td>
  `;

  tbody.appendChild(tr);
  updateBtnStates();

  form.reset(); // Clear form inputs
}

/**
 * Moves a table row up one position if possible
 * @param {HTMLButtonElement} button - The move up button that was clicked
 * @returns {void}
 */
function handleMoveUp(button) {
  if (button.disabled) return;
  const row = button.closest("tr");
  const prevRow = row.previousElementSibling;

  if (prevRow) {
    row.parentNode.insertBefore(row, prevRow);
    updateBtnStates();
  }
}

/**
 * Moves a table row down one position if possible
 * @param {HTMLButtonElement} button - The move down button that was clicked
 * @returns {void}
 */
function handleMoveDown(button) {
  if (button.disabled) return;

  const row = button.closest("tr");
  const nextRow = row.nextElementSibling;

  if (nextRow) {
    row.parentNode.insertBefore(nextRow, row);
    updateBtnStates();
  }
}

/**
 * Updates the disabled state of all move up/down buttons based on row position
 * @returns {void}
 */
function updateBtnStates() {
  const rows = document.querySelector(".tbody").querySelectorAll("tr");
  console.log({ rows });

  rows.forEach((row, index) => {
    const upBtn = row.querySelector(".move-up-btn");
    const downBtn = row.querySelector(".move-down-btn");
    console.log({ upBtn });

    upBtn.disabled = index === 0;
    downBtn.disabled = index === rows.length - 1;
  });
}
