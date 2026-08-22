document.addEventListener("DOMContentLoaded", function() {

  var currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark" || currentTheme === "light") {
    document.documentElement.dataset.theme = currentTheme;
  }
const button = document.getElementById("theme-toggle");

function updateButton(theme) {
  button.textContent = theme === "dark" ? "[light]" : "[dark]";
}

updateButton(currentTheme);

button.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = currentTheme;
  localStorage.setItem("theme", currentTheme);

  updateButton(currentTheme);
});


});