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
