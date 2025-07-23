// fetching data from api

const products = [];

async function getProductData() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const rawData = await response.json();

    const modifiedData = rawData.map((product) => {
      const keys = Object.keys(product).slice(0, 4);
      const dataObj = {};
      keys.forEach((key) => {
        dataObj[key] = product[key];
      });
      return dataObj;
    });
    products.push(...modifiedData);
    return products;
  } catch (error) {
    console.error("Failed to fetch!", error);
    return [];
  }
}

// ----------------------------------------------------------------------------------

// DOM elements
const thead = document.querySelector(".thead");
const tbody = document.querySelector(".tbody");

// ------------------------------------------------------------------------------------

// function for displaying table header data from API
async function displayTableHead(products) {
  if (!thead || !products.length) return;
  thead.innerHTML = "";
  // create tr element
  const tr = document.createElement("tr");

  // th for each product key
  Object.keys(products[0]).forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key[0].toUpperCase() + key.slice(1);
    tr.appendChild(th);
  });

  //   edit/delete header
  const editDelete = document.createElement("th");
  editDelete.textContent = "Edit/Delete";
  tr.appendChild(editDelete);
  thead.appendChild(tr);
}
// ----------------------------------------------------------------------------------------

// function for displaying table body
async function displayTableBody(products) {
  if (!tbody || !products.length) return;
  products.forEach((product) => {
    // creat tr element for each product
    const tr = document.createElement("tr");

    //   create td element for each table cell
    Object.entries(product).forEach(([key, val]) => {
      const td = document.createElement("td");
      td.textContent = val;
      if (key == "price") {
        td.className = "price";
      }
      tr.appendChild(td);
    });

    tr.appendChild(createEdiDelButton());
    tbody.appendChild(tr);
  });
}
// -----------------------------------------------------------------------------------------

// function for creating edit/delete button
function createEdiDelButton() {
  // create edit/delete button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "btn edit-btn";

  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "button-wrapper";

  buttonWrapper.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn delete-btn";

  buttonWrapper.appendChild(deleteButton);
  return buttonWrapper;
}

// main function to fetch and render
async function initTable() {
  const products = await getProductData();
  displayTableHead(products);
  displayTableBody(products);
}

initTable();

// ---------------------------------------------------------------------------------------------

// function for adding a new row to the table
const addRowBtn = document.querySelector(".add-row");

// function to create input  cell
function createInput(type = "text") {
  const td = document.createElement("td");
  const input = document.createElement("input");
  input.type = type;
  input.className = "input";
  td.appendChild(input);
  return td;
}

// event listener
addRowBtn.addEventListener("click", () => {
  const tr = document.createElement("tr");
  const keys = Object.keys(products).slice(0, 4);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const inputType = typeof products[0][key];
    tr.appendChild(createInput(inputType));
  }
  tr.appendChild(createEdiDelButton());
  tbody.appendChild(tr);
});

/**
 * Product Management Module
 *
 * Fetches product data from API, renders a responsive table, and provides
 * in-line editing with save functionality. Features include:
 * - Dynamic edit/save mode toggling
 * - Input validation
 * - Optimized API requests
 * - Real-time UI updates
 * - Comprehensive error handling
 */

// // Configuration constants
// // const CONFIG = {
// //   API_URL: "http://localhost:3000/api/products",
// //   SAFE_KEYS: ["id", "title", "slug", "price"], // Whitelisted properties
// //   TABLE_HEADERS: {
// //     actions: "Actions",
// //   },
// //   EDIT_BUTTON_TEXT: "Edit",
// //   SAVE_BUTTON_TEXT: "Save",
// //   INPUT_TYPES: {
// //     price: "number",
// //   },
// // };

// // DOM Elements
// const DOM = {
//   tableHead: document.querySelector(".thead"),
//   tableBody: document.querySelector(".tbody"),
//   errorContainer: document.getElementById("error-container"),
//   loadingIndicator: document.getElementById("loading-indicator"),
// };

// /**
//  * Fetches product data from API
//  * @returns {Promise<Array>} Array of raw product objects
//  */
// async function fetchProductData() {
//   showLoading(true);
//   try {
//     const response = await fetch(CONFIG.API_URL);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("API Request Failed:", error);
//     displayErrorMessage("Failed to load product data. Please try again later.");
//     throw error;
//   } finally {
//     showLoading(false);
//   }
// }

// /**
//  * Transforms raw product data
//  * @param {Array} rawData - Raw product data
//  * @returns {Array} Transformed product data
//  */
// function transformProductData(rawData) {
//   return rawData.map((product) => {
//     const transformed = {};
//     CONFIG.SAFE_KEYS.forEach((key) => {
//       transformed[key] = product[key] ?? "";
//     });
//     return transformed;
//   });
// }

// /**
//  * Creates table header row
//  * @param {Array} products - Product data array
//  */
// function renderTableHeader(products) {
//   if (!DOM.tableHead || !products.length) return;

//   DOM.tableHead.innerHTML = "";
//   const headerRow = document.createElement("tr");

//   // Create headers from safe keys
//   CONFIG.SAFE_KEYS.forEach((key) => {
//     const header = document.createElement("th");
//     header.textContent = key.charAt(0).toUpperCase() + key.slice(1);
//     header.setAttribute("scope", "col");
//     headerRow.appendChild(header);
//   });

//   // Add action column header
//   const actionHeader = document.createElement("th");
//   actionHeader.textContent = CONFIG.TABLE_HEADERS.actions;
//   actionHeader.setAttribute("scope", "col");
//   headerRow.appendChild(actionHeader);

//   DOM.tableHead.appendChild(headerRow);
// }

// /**
//  * Creates table body rows
//  * @param {Array} products - Product data array
//  */
// function renderTableBody(products) {
//   if (!DOM.tableBody || !products.length) return;

//   DOM.tableBody.innerHTML = "";
//   const fragment = document.createDocumentFragment();

//   products.forEach((product) => {
//     const row = document.createElement("tr");
//     row.dataset.productId = product.id;

//     // Add data cells
//     CONFIG.SAFE_KEYS.forEach((key) => {
//       const cell = document.createElement("td");
//       cell.textContent = product[key];
//       cell.dataset.column = key;
//       row.appendChild(cell);
//     });

//     // Add action buttons
//     const actionCell = document.createElement("td");
//     const buttonGroup = document.createElement("div");
//     buttonGroup.className = "button-group";

//     const editButton = createActionButton(
//       CONFIG.EDIT_BUTTON_TEXT,
//       "edit",
//       handleEditClick
//     );

//     const deleteButton = createActionButton(
//       "Delete",
//       "delete",
//       handleDeleteClick
//     );

//     buttonGroup.append(editButton, deleteButton);
//     actionCell.appendChild(buttonGroup);
//     row.appendChild(actionCell);

//     fragment.appendChild(row);
//   });

//   DOM.tableBody.appendChild(fragment);
// }

// /**
//  * Creates standardized action button
//  * @param {string} text - Button text
//  * @param {string} action - Action type
//  * @param {Function} handler - Click handler
//  * @returns {HTMLButtonElement} Button element
//  */
// function createActionButton(text, action, handler) {
//   const button = document.createElement("button");
//   button.textContent = text;
//   button.className = `btn ${action}-btn`;
//   button.setAttribute("type", "button");
//   button.setAttribute("aria-label", `${action} product`);
//   button.dataset.action = action;
//   button.addEventListener("click", handler);
//   return button;
// }

// /**
//  * Toggles row between view and edit modes
//  * @param {HTMLTableRowElement} row - Table row element
//  * @param {boolean} isEditMode - Whether to enter edit mode
//  */
// function toggleEditMode(row, isEditMode) {
//   const actionButton = row.querySelector(".edit-btn");

//   if (isEditMode) {
//     // Switch to edit mode
//     actionButton.textContent = CONFIG.SAVE_BUTTON_TEXT;
//     actionButton.dataset.action = "save";

//     // Convert cells to inputs
//     CONFIG.SAFE_KEYS.forEach((key) => {
//       if (key === "id") return; // Skip ID field

//       const cell = row.querySelector(`td[data-column="${key}"]`);
//       const value = cell.textContent;

//       const input = document.createElement("input");
//       input.type = CONFIG.INPUT_TYPES[key] || "text";
//       input.value = value;
//       input.dataset.column = key;

//       // Add validation for number fields
//       if (input.type === "number") {
//         input.min = "0";
//         input.step = "0.01";
//       }

//       cell.textContent = "";
//       cell.appendChild(input);
//     });
//   } else {
//     // Switch to view mode
//     actionButton.textContent = CONFIG.EDIT_BUTTON_TEXT;
//     actionButton.dataset.action = "edit";

//     // Revert inputs to text
//     CONFIG.SAFE_KEYS.forEach((key) => {
//       if (key === "id") return;

//       const cell = row.querySelector(`td[data-column="${key}"]`);
//       const input = cell.querySelector("input");
//       cell.textContent = input ? input.value : cell.textContent;
//     });
//   }
// }

// /**
//  * Validates edit form inputs
//  * @param {HTMLTableRowElement} row - Table row in edit mode
//  * @returns {boolean} True if validation passes
//  */
// function validateEditForm(row) {
//   let isValid = true;

//   // Validate number fields
//   const numberInputs = row.querySelectorAll('input[type="number"]');
//   numberInputs.forEach((input) => {
//     if (input.value === "" || Number(input.value) < 0) {
//       input.classList.add("error");
//       isValid = false;
//     } else {
//       input.classList.remove("error");
//     }
//   });

//   if (!isValid) {
//     displayErrorMessage("Please enter valid values in all fields");
//   }

//   return isValid;
// }

// /**
//  * Collects edited data from a row
//  * @param {HTMLTableRowElement} row - Table row in edit mode
//  * @returns {Object} Edited product data
//  */
// function getEditedData(row) {
//   const editedData = { id: row.dataset.productId };

//   CONFIG.SAFE_KEYS.forEach((key) => {
//     if (key === "id") return;

//     const input = row.querySelector(`input[data-column="${key}"]`);
//     if (input) {
//       editedData[key] =
//         input.type === "number" ? parseFloat(input.value) : input.value;
//     }
//   });

//   return editedData;
// }

// /**
//  * Updates product via API
//  * @param {Object} productData - Product data to update
//  * @returns {Promise<Object>} Updated product data
//  */
// async function updateProduct(productData) {
//   showLoading(true);
//   try {
//     const response = await fetch(`${CONFIG.API_URL}/${productData.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(productData),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Update failed:", error);
//     displayErrorMessage("Failed to update product. Please try again.");
//     throw error;
//   } finally {
//     showLoading(false);
//   }
// }

// /**
//  * Handles edit/save button click
//  * @param {MouseEvent} event - Click event
//  */
// function handleEditClick(event) {
//   const button = event.target;
//   const row = button.closest("tr");
//   const isEditMode = button.dataset.action === "edit";

//   if (isEditMode) {
//     // Enter edit mode
//     toggleEditMode(row, true);
//   } else {
//     // Validate before saving
//     if (!validateEditForm(row)) return;

//     const editedData = getEditedData(row);

//     // Exit edit mode immediately for better UX
//     toggleEditMode(row, false);

//     // Update via API
//     updateProduct(editedData)
//       .then((updatedProduct) => {
//         // Update UI with new data
//         CONFIG.SAFE_KEYS.forEach((key) => {
//           const cell = row.querySelector(`td[data-column="${key}"]`);
//           if (cell) cell.textContent = updatedProduct[key];
//         });
//       })
//       .catch(() => {
//         // Revert to original values on failure
//         displayErrorMessage("Update failed. Reverting changes...");
//         initializeProductTable();
//       });
//   }
// }

// /**
//  * Handles delete button click
//  * @param {MouseEvent} event - Click event
//  */
// function handleDeleteClick(event) {
//   const row = event.target.closest("tr");
//   const productId = row.dataset.productId;

//   if (confirm("Are you sure you want to delete this product?")) {
//     showLoading(true);
//     fetch(`${CONFIG.API_URL}/${productId}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Delete failed");
//         row.remove();
//       })
//       .catch((error) => {
//         console.error("Delete failed:", error);
//         displayErrorMessage("Failed to delete product. Please try again.");
//       })
//       .finally(() => showLoading(false));
//   }
// }

// /**
//  * Displays error message
//  * @param {string} message - Error message
//  */
// function displayErrorMessage(message) {
//   if (!DOM.errorContainer) return;

//   DOM.errorContainer.innerHTML = `
//     <div class="alert error">
//       <p>${message}</p>
//     </div>
//   `;

//   // Auto-clear after 5 seconds
//   setTimeout(() => {
//     if (DOM.errorContainer) DOM.errorContainer.innerHTML = "";
//   }, 5000);
// }

// /**
//  * Shows/hides loading indicator
//  * @param {boolean} show - Whether to show loading indicator
//  */
// function showLoading(show) {
//   if (DOM.loadingIndicator) {
//     DOM.loadingIndicator.style.display = show ? "block" : "none";
//   }
// }

// /**
//  * Main initialization function
//  */
// async function initializeProductTable() {
//   try {
//     const rawData = await fetchProductData();
//     const products = transformProductData(rawData);

//     renderTableHeader(products);
//     renderTableBody(products);
//   } catch (error) {
//     // Errors already handled in fetch
//   }
// }

// // Initialize when DOM is fully loaded
// document.addEventListener("DOMContentLoaded", initializeProductTable);
