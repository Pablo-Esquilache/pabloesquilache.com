// export function slider() {
//   const slider = document.querySelector(".slider");
//   const totalSlides = document.querySelectorAll(".slider img").length;
//   let currentIndex = 0;

//   function showSlide(index) {
//     currentIndex = (index + totalSlides) % totalSlides;
//     const translateValue = -currentIndex * 100 + "%";
//     slider.style.transform = "translateX(" + translateValue + ")";
//   }

//   function nextSlide() {
//     showSlide(currentIndex + 1);
//   }

//   function prevSlide() {
//     showSlide(currentIndex - 1);
//   }

//   const btnNext = document.getElementById("btn-next");
//   const btnPrev = document.getElementById("btn-prev");

//   // Verificar si los botones existen antes de agregar los event listeners
//   if (btnNext && btnPrev) {
//     btnNext.addEventListener("click", nextSlide);
//     btnPrev.addEventListener("click", prevSlide);
//   }

//   setInterval(nextSlide, 10000);
// }

export function initializeSlider() {
  const slides = document.querySelectorAll('.slider img');
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

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  setInterval(nextSlide, 5000);
}
