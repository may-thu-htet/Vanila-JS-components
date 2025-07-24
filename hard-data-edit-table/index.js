// when you clicked the edit button,

// save and cancel button appeared

// DOM elements
const editBtn = document.querySelector(".edit-btn");
editBtn.addEventListener("click", (e) => handleEdit(e.target));

// function to create save and cancel button and change all tds into input

function handleEdit(editBtn) {
  // create save and cancel buttons
  const btnWrapper = editBtn.closest(".buttons");
  if (!btnWrapper) return;

  editBtn.style.display = "none";
  const deleteBtn = btnWrapper.querySelector(".delete-btn");
  const saveBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");

  saveBtn.textContent = "Save";
  saveBtn.className = "btn save-btn";

  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "btn cancel-btn";

  btnWrapper.insertBefore(saveBtn, deleteBtn);
  btnWrapper.insertBefore(cancelBtn, deleteBtn);

  //   change all tds into inputs
  const tr = editBtn.closest("tr");
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
