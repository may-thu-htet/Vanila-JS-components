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
  form.reset();
}
