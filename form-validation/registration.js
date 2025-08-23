/*
Form validation
- Retrieve all the input elements 
1. Full name should be two or more characters
2. Email should use regex and test
3. Password must be more than 6 characters
4. Confirm password must match the prev password you typed
5. Register button to be enabled only if all validation condition passed
6. Add all error message to the above validations
*/

// DOM elements
const form = document.querySelector("#registerForm");
const inputs = form.querySelectorAll("input");
const submitBtn = form.querySelector("#submitBtn");

// validations
// 1. validator map

const validators = {
  name: (value) => value.trim().length > 2 || "Invalid Full Name.",
  email: (value) => /\S+@\S+.\S+/.test(value) || "Invalid Email Format",
  password: (value) =>
    value.length > 6 || "Password must be longer than 6 characters.",
  confirmPassword: (value) =>
    value == document.getElementById("password").value ||
    "Passwords do not match.",
};

// blue print function to validate
function validateField(input) {
  const { id, value } = input;
  const validation = validators[id](value);
  const errorDiv = document.getElementById(id + "Error");

  if (validation !== true) {
    input.classList.add("error");
    console.log(errorDiv);
    console.log("validation is " + validation);
    errorDiv.textContent = validation;

    console.log(errorDiv.textContent);
    return false;
  } else {
    input.classList.remove("error");
    errorDiv.textContent = "";
    return true;
  }
}

// validate for each input
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    validateField(input);
    checkFormValidity();
  });
});

// check if all the form inputs are valid and change the state of the register button

function checkFormValidity() {
  const allValid = [...inputs].every((input) => validateField(input));
  submitBtn.disabled = !allValid;
}

// form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if ([...inputs].every((input) => validateField(input))) {
    alert("Form was successfully registered.");
    form.reset();
    submitBtn.disabled = true;
  }
});
