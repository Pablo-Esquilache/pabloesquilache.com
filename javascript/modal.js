
export function modal() {

  const issobremiPage = window.location.pathname.includes("sobre_mi.html");

  if (issobremiPage) {
    
      const body = document.body;
      const modal_container = document.getElementById("modal-container");
      const sobremi_card1 = document.getElementById("sobremi-card1");
      const sobremi_card2 = document.getElementById("sobremi-card2");
      const sobremi_card3 = document.getElementById("sobremi-card3");
      const sobremi_h2_3 = document.getElementById("sobremi-h2-3");
      const sobremi_h2_2 = document.getElementById("sobremi-h2-2");
      const sobremi_h2_1 = document.getElementById("sobremi-h2-1");
  
      sobremi_h2_1.addEventListener("click", () => {
        modal_container.style.display = "flex";
        modal_container.style.pointerEvents = "auto";
        sobremi_card1.style.display = "flex";
        body.classList.add('modal-open');
      });
  
      sobremi_card1.addEventListener("click", () => {
        sobremi_card1.style.display = "none";
        modal_container.style.display = "none";
        body.classList.remove('modal-open');
      });
  
      sobremi_h2_2.addEventListener("click", () => {
        modal_container.style.display = "flex";
        modal_container.style.pointerEvents = "auto";
        sobremi_card2.style.display = "flex";
        body.classList.add('modal-open');
      });
  
      sobremi_card2.addEventListener("click", () => {
        sobremi_card2.style.display = "none";
        modal_container.style.display = "none";
        body.classList.remove('modal-open');
      });
  
      sobremi_h2_3.addEventListener("click", () => {
        modal_container.style.display = "flex";
        modal_container.style.pointerEvents = "auto";
        sobremi_card3.style.display = "flex";
        body.classList.add('modal-open');
      });
  
      sobremi_card3.addEventListener("click", () => {
        sobremi_card3.style.display = "none";
        modal_container.style.display = "none";
        body.classList.remove('modal-open');
      });
    }
  }
  