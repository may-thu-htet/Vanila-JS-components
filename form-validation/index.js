// get element from DOM
const submitBtn = document.querySelector(".submit-button");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const nameError = document.getElementById("name-errors");
const emailError = document.getElementById("email-errors");
const messageError = document.getElementById("message-errors");

// functions for error input
function validName(name) {
  return name.length > 0;
}

function validEmail(emailInput) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailInput);
}

function validMessage(message) {
  return message.length <= 200;
}

// function to do when submit button is clicked
function doSubmit(event) {
  event.preventDefault();
  nameError.innerHTML = "";
  emailError.innerHTML = "";
  messageError.innerHTML = "";
  let hasError = false;

  if (!validName(nameInput.value)) {
    let p = document.createElement("p");
    let errorText = "Name is Required!";
    p.textContent = errorText;
    p.style.color = "red";
    nameError.appendChild(p);
    hasError = true;
  }
  if (!validEmail(emailInput.value)) {
    let p = document.createElement("p");
    let errorText = "Please enter a valid email!";
    p.textContent = errorText;
    p.style.color = "red";
    emailError.appendChild(p);
    hasError = true;
  }

  if (!validMessage(message.value)) {
    let p = document.createElement("p");
    let errorText = "Message must be under 200 characters!";
    p.textContent = errorText;
    p.style.color = "red";
    messageError.appendChild(p);
    hasError = true;
  }

  if (!hasError) {
    alert("Your form is successfully submitted!!!");
    nameInput.value = "";
    emailInput.value = "";
    message.value = "";
  }
}

// function call when you clicked submit button
submitBtn.addEventListener("click", doSubmit);
