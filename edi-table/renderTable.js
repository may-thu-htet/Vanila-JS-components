import { updateDevice, deleteDevice } from "./apiCRUD.js";
import { handlePageNumbers } from "./main.js";

export function renderTableHeader(thead, data) {
  thead.innerHTML = "";
  let tr = document.createElement("tr");

  // Use the first item's keys, limited to 4
  if (data.length > 0) {
    Object.keys(data[0])
      .slice(0, 2)
      .forEach((key) => {
        let th = document.createElement("th");
        th.textContent = key[0].toUpperCase() + key.slice(1);
        tr.appendChild(th);
      });
  }

  const editDelete = document.createElement("th");
  editDelete.textContent = "Edit/Delete";
  tr.appendChild(editDelete);
  thead.appendChild(tr);
}

export function renderTableBody(tbody, data, currentPage, noOfRows) {
  tbody.innerHTML = "";

  const startIndex = (currentPage - 1) * noOfRows;
  const endIndex = startIndex + noOfRows;
  const dataSlice = data.slice(startIndex, endIndex);

  dataSlice.forEach((rowData, i) => {
    let tr = document.createElement("tr");
    const rowIndex = startIndex + i;

    const isEditing = rowData._editing === true;

    // Render only first 4 keys for each row
    Object.entries(rowData)
      .slice(0, 2)
      .forEach(([key, value]) => {
        if (key === "_editing") return;
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

    // Action buttons (Edit/Delete)
    const actionTd = document.createElement("td");
    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "buttons";

    if (isEditing) {
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.onclick = () => saveRow(rowIndex, tr, data, handlePageNumbers);
      buttonWrapper.appendChild(saveBtn);

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.onclick = () => cancelEdit(rowIndex, data, handlePageNumbers);
      buttonWrapper.appendChild(cancelBtn);
    } else {
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        data.forEach((d) => delete d._editing);
        data[rowIndex]._editing = true;
        renderTableBody(tbody, data, currentPage, noOfRows);
      };
      buttonWrapper.appendChild(editBtn);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-button";
    deleteBtn.onclick = async () => {
      if (!confirm("Are you sure you want to delete this row?")) return;

      const id = data[rowIndex].id;
      const success = await deleteDevice(id);
      if (success) {
        data.splice(rowIndex, 1);
        handlePageNumbers();
      } else {
        alert("Failed to delete row from API.");
      }
    };
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
