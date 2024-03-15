export function initializeSlider() {
  let slides;
  const slidesDesktop = document.querySelectorAll('.slider img');
  const slidesResponsive = document.querySelectorAll('.slider-respon img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;

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

  function setSlides() {
    slides = slidesResponsive.length > 0 ? slidesResponsive : slidesDesktop;
  }

  setSlides();
  showSlide(currentSlide);

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  setInterval(nextSlide, 5000);

  window.addEventListener('resize', () => {
    setSlides();
    showSlide(currentSlide);
  });
}
