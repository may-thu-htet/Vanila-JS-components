import users from "./data.js";
// DOM elements
const thead = document.querySelector(".thead");
const tbody = document.querySelector(".tbody");

// function to create row
function createRow(headOrBody) {
  // create tr and td or th element
  const keys = Object.keys(users[0]);

  if (headOrBody === thead) {
    const tr = document.createElement("tr");
    keys.forEach((key) => {
      const th = document.createElement("th");
      th.textContent = key[0].toUpperCase() + key.slice(1);
      th.setAttribute("data-table-title", key);
      tr.appendChild(th);
      headOrBody.appendChild(tr);
    });
    // for creating action title
    createActionTitle(tr, "Action");
  } else if (headOrBody === tbody) {
    users.forEach((user) => {
      const tr = document.createElement("tr");
      console.log({ user });
      Object.entries(user).forEach(([key, value]) => {
        const td = document.createElement("td");
        td.textContent = value;
        td.setAttribute("data-key", key);
        tr.appendChild(td);
        headOrBody.appendChild(tr);
      });
      // for creating action cell
      createActionCell(tr, keys, false);
    });
  }
  //   headOrBody.appendChild(tr);
}

// function for action title
function createActionTitle(tr, title) {
  const th = document.createElement("th");
  th.textContent = title;
  th.setAttribute("data-table-title", title);
  tr.appendChild(th);
}

// function to create action row
function createActionCell(tr, keys, isNewRow = false) {
  const td = document.createElement("td");
  td.setAttribute("data-key", keys.length + 1);
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "buttons";

  if (isNewRow === true) {
    buttonWrapper.appendChild(createButton("save"));
    buttonWrapper.appendChild(createButton("cancel"));
  } else {
    buttonWrapper.appendChild(createButton("edit"));
  }
  buttonWrapper.appendChild(createButton("delete"));
  td.appendChild(buttonWrapper);
  tr.appendChild(td);
}

// function for creating buttons
function createButton(btnName) {
  const button = document.createElement("button");
  button.textContent = btnName[0].toUpperCase() + btnName.slice(1);
  button.className = `btn ${btnName}-btn`;
  return button;
}

// displaying table
createRow(thead);
createRow(tbody);

// const editBtn = document.createElement("button");
//   const deleteBtn = document.createElement("button");
//   const saveBtn = document.createElement("button");
//   const cancelBtn = document.createElement("button");
