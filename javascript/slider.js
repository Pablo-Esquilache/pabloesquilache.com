export function slider() {
  const slider = document.querySelector(".slider");
  const totalSlides = document.querySelectorAll(".slider img").length;
  let currentIndex = 0;

  function showSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    const translateValue = -currentIndex * 100 + "%";
    slider.style.transform = "translateX(" + translateValue + ")";
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prev");

  // Verificar si los botones existen antes de agregar los event listeners
  if (btnNext && btnPrev) {
    btnNext.addEventListener("click", nextSlide);
    btnPrev.addEventListener("click", prevSlide);
  }

  setInterval(nextSlide, 10000);
}
