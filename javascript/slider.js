
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

  document.getElementById("btn-next").addEventListener("click", nextSlide);
  document.getElementById("btn-prev").addEventListener("click", prevSlide);

  setInterval(nextSlide, 4000);
}
