const ThemeController = (() => {
  const STORAGE_KEY = "theme";

  function applyTheme(isDarkMode) {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }

  function init() {
    const savedTheme = localStorage.getItem(STORAGE_KEY) === "dark";
    applyTheme(savedTheme);

    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const nextTheme = !document.body.classList.contains("dark-mode");
        applyTheme(nextTheme);
        localStorage.setItem(STORAGE_KEY, nextTheme ? "dark" : "light");
      });
    }
  }

  return { init, applyTheme };
})();

document.addEventListener("DOMContentLoaded", () => {
  ThemeController.init();
});