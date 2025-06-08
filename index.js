window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  setTimeout(() => {
    preloader.style.transition = "opacity 1s ease";
    preloader.style.opacity = 0;

    setTimeout(() => {
      preloader.style.pointerEvents = "none";
      preloader.style.zIndex = "-1";
      preloader.style.display = "none";
      content.style.display = "block";
    }, 100);
  }, 1000);
});

document.addEventListener('mousemove', function (e) {
  const hero = document.querySelector('.hero-section');
  const bg = document.querySelector('.hero-bg-3d');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  bg.style.transform = `scale(1.1) rotateX(${y}deg) rotateY(${x}deg)`;
});

