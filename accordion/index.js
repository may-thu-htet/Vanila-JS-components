let headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    let content = header.nextElementSibling;
    content.hidden = !content.hidden;
    let icon = header.children[0];
    icon.classList.toggle("accordion-icon--rotated", !content.hidden);
  });
});
