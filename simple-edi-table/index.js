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
    th.textContent = key;
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
    Object.values(product).forEach((val) => {
      const td = document.createElement("td");
      td.textContent = val;
      tr.appendChild(td);
    });
    // create edit/delete button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "button-wrapper";

    buttonWrapper.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    buttonWrapper.appendChild(deleteButton);

    tr.appendChild(buttonWrapper);
    tbody.appendChild(tr);
  });
}
// -----------------------------------------------------------------------------------------

// main function to fetch and render
async function initTable() {
  const products = await getProductData();
  displayTableHead(products);
  displayTableBody(products);
}

initTable();

// ---------------------------------------------------------------------------------------------
