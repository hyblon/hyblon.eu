document.addEventListener("DOMContentLoaded", function() {

  const theme = localStorage.getItem("theme");
  console.log(theme);
  if (theme === "dark" || theme === "light") {
    document.documentElement.dataset.theme = theme;
  }
const button = document.getElementById("theme-toggle");

function updateButton(theme) {
  button.textContent = theme === "dark" ? "[light]" : "[dark]";
}

let currentTheme =
  document.documentElement.dataset.theme || "light";

updateButton(currentTheme);

button.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = currentTheme;
  localStorage.setItem("theme", currentTheme);

  updateButton(currentTheme);
});


});