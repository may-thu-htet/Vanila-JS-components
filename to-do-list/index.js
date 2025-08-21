// element from DOM
let submitButton = document.getElementById("submit-button");
let inputTask = document.getElementById("input-task");
let ul = document.getElementById("list");

// adding event listener to the submit button
submitButton.addEventListener("click", doSubmit);

//to do function when you clicked the submit button
function doSubmit() {
  // create li element
  let li = document.createElement("li");
  // create button element
  let deleteButton = document.createElement("button");

  li.textContent = inputTask.value;
  deleteButton.textContent = "Delete";
  ul.appendChild(li);
  li.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => {
    ul.removeChild(li);
  });
  inputTask.value = "";
}
