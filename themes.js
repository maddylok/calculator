//script for themes

const root = document.documentElement;
const themes = document.querySelectorAll(".theme-container > div");

themes.forEach((theme) => {
   theme.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!target.classList.contains("active")) {
         themes.forEach((el) => el.classList.remove("active"));
         target.classList.add("active");
         const style = getComputedStyle(target);
         root.style.setProperty("--bg-gradient", style.background);
         root.style.setProperty("--bg-solid", target.dataset.solid);
         root.style.setProperty(
            "--bg-secondary",
            target.hasAttribute("data-secondary")
               ? target.dataset.secondary
               : target.dataset.solid
         );
      }
   });
});