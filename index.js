window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  setTimeout(() => {
    preloader.style.transition = "opacity 1s ease";
    preloader.style.opacity = 0;

    setTimeout(() => {
      preloader.style.pointerEvents = "none";
      preloader.style.zIndex = "-3";
      preloader.style.display = "none";
      content.style.display = "block";
    }, 100);
  }, 1000);
});

