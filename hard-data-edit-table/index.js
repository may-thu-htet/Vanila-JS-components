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
  saveBtn.onclick = (e) => handleSave(e.target);

  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "btn cancel-btn";
  cancelBtn.onclick = (e) => handleCancel(e.target);

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

// fuctions for save, cancel and delete buttons event listener

function handleSave(saveBtn) {
  const tr = saveBtn.closest("tr");
  const tds = tr.querySelectorAll("td");

  for (let i = 0; i < tds.length - 1; i++) {
    const td = tds[i];
    const input = td.querySelector("input");
    const newValue = input.value;

    td.textContent = newValue;
    td.removeAttribute("original-data");
  }
  removeSaveCancelBtn(saveBtn);
}

function handleCancel(cancelBtn) {
  const tr = cancelBtn.closest("tr");
  const tds = tr.querySelectorAll("td");

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
