// DOM element

const checkboxForm = document.querySelector(".checkboxes-form");
const checkBoxText = document.querySelector(".checkbox-text");

checkboxForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const checkboxInputs = Array.from(document.querySelectorAll(".checkbox"))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  checkBoxText.textContent = `I checked ${checkboxInputs.join(",")} boxes.`;
});

const radioForm = document.querySelector(".radio-form");
const radioText = document.querySelector(".radio-text");

radioForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedRadio = Array.from(document.querySelectorAll(".radio"))
    .filter((radio) => radio.checked)
    .map((radio) => radio.value);
  radioText.textContent = `I selected ${selectedRadio}.`;
});
