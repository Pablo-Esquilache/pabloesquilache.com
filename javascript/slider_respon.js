export function initializeSliderRespon() {
  const slides = document.querySelectorAll('.slider-respon img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;

  // Verificar si los elementos existen antes de agregar event listeners
  if (prevBtn && nextBtn) {
      function showSlide(index) {
          slides.forEach((slide, i) => {
              if (i === index) {
                  slide.style.display = 'block';
              } else {
                  slide.style.display = 'none';
              }
          });
      }

      function nextSlide() {
          currentSlide = (currentSlide + 1) % slides.length;
          showSlide(currentSlide);
      }

      function prevSlide() {
          currentSlide = (currentSlide - 1 + slides.length) % slides.length;
          showSlide(currentSlide);
      }

      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);

      setInterval(nextSlide, 5000);
  }
}
