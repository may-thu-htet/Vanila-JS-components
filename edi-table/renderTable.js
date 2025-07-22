import { updateDevice, deleteDevice } from "./apiCRUD";

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

export function renderTableBody(tbody, data, currentPage, noOfRows) {
  tbody.innerHTML = "";

  //   let totalPages = Math.ceil(users.length/noOfRows);
  const startIndex = (currentPage - 1) * noOfRows;
  const endIndex = startIndex + noOfRows;
  const dataSlice = data.slice(startIndex, endIndex);

  dataSlice.forEach((rowData, i) => {
    let tr = document.createElement("tr");
    const rowIndex = startIndex + i; // to access the original array

    const isEditing = rowData._editing === true;

    // Render each cell
    Object.entries(rowData).forEach(([key, value]) => {
      if (key === "_editing") return; // skip internal flag
      let td = document.createElement("td");

      if (isEditing) {
        const input = document.createElement("input");
        input.value = value;
        input.name = key;
        td.appendChild(input);
      } else {
        td.textContent = value;
      }

      tr.appendChild(td);
    });

    // Actions (Edit/Save + Cancel)

    const actionTd = document.createElement("td");

    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "buttons";

    if (isEditing) {
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.onclick = () => saveRow(rowIndex, tr, data, handlePageNumbers);
      buttonWrapper.appendChild(saveBtn);
      actionTd.appendChild(buttonWrapper);

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.onclick = () => cancelEdit(rowIndex, data, handlePageNumbers);
      buttonWrapper.appendChild(cancelBtn);
    } else {
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        // Clear any previous editing
        data.forEach((d) => delete d._editing);
        data[rowIndex]._editing = true;
        renderTableBody(tbody, data, currentPage, noOfRows);
      };
      buttonWrapper.appendChild(editBtn);
    }
    // const editBtn = document.createElement("button");
    // editBtn.setAttribute("class", "edit-button");
    // editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.onclick = async () => {
      const confirmed = confirm("Are you sure you want to delete this row?");
      if (!confirmed) return;

      const id = data[rowIndex].id;

      const success = await deleteDevice(id);
      if (success) {
        data.splice(rowIndex, 1); // remove from local data
        handlePageNumbers();
      } else {
        alert("Failed to delete row from API.");
      }
    };

    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("class", "delete-button");

    buttonWrapper.appendChild(deleteBtn);

    actionTd.appendChild(buttonWrapper);
    tr.appendChild(actionTd);
    tbody.appendChild(tr);
  });
}

// helper functions
export async function saveRow(index, tr, data, handlePageNumbers) {
  const inputs = tr.querySelectorAll("input");
  inputs.forEach((input) => {
    data[index][input.name] = input.value;
  });

  const id = data[index].id;

  try {
    await updateDevice(id, {
      name: data[index].name,
      data: data[index].data,
    });
    delete data[index]._editing;
    handlePageNumbers();
  } catch (err) {
    alert("Failed to save changes.");
  }
}
export function cancelEdit(index, data, handlePageNumbers) {
  if (data[index]) {
    delete data[index]._editing;
  }
  if (typeof handlePageNumbers === "function") {
    handlePageNumbers(); // Refresh the table
  }
}
